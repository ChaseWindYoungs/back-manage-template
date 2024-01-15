<template>
  <div class="terminal-box">
    <div class="info-box">
      <p class="title">
        MQTT Status:<span id="status" :class="MQTTStatus ? 'success' : 'danger'">{{ MQTTStatusTitle }}</span>
      </p>
      <p>mqtt_user: {{ info?.clientId }}</p>
      <p>mqttUrl: {{ info?.url }}</p>
    </div>
    <div class="terminal-content">
      <div id="terminal"></div>
    </div>
  </div>
</template>
<script setup name="index">
/**
 * index
 * https://github.com/lewangdev/MQTT-Web-Terminal/blob
 * 该功能依赖了 mqtt、xterm，以及xterm的生态
 */

import { onMounted, ref } from "vue";
import * as mqtt from "mqtt";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";
import { computed } from "vue";

const MQTTStatus = ref(null);
const info = ref(null);
const MQTTStatusTitle = computed(() => {
  return MQTTStatus.value === null ? "连接中..." : MQTTStatus.value ? "连接成功" : "连接失败";
});

function parseHashQueryString() {
  const hash = window.location.hash;
  const queryString = decodeURIComponent(hash?.split("?")[1]);
  if (queryString) {
    const queryParamsArray = queryString.split("&");
    const queryParams = {};
    queryParamsArray.forEach((param) => {
      const [key, value] = param.split("=");
      queryParams[key] = value;
    });
    return queryParams;
  } else return null;
}

function initTerminal() {
  const params = parseHashQueryString();
  info.value = params;
  if (params == null) {
    alert("请传递参数");
    return;
  }

  const mqtt_user = params.userName;
  const mqtt_passwd = params.password;
  const deviceId = params.clientId;
  const mqttUrl = params.url;

  const webMqttSub = `zbgd/v3/terminal/dev/${deviceId}`;
  const webMqttPub = `zbgd/v3/terminal/web/${deviceId}`;

  const term = new Terminal({
    cursorBlink: true,
    macOptionIsMeta: true,
    scrollback: 10000,
  });
  term.attachCustomKeyEventHandler(customKeyEventHandler);
  const fit = new FitAddon();

  term.loadAddon(fit);
  term.loadAddon(new WebLinksAddon());
  term.loadAddon(new SearchAddon());

  term.open(document.getElementById("terminal"));
  fit.fit();
  term.resize(15, 50);
  console.log(`size: ${term.cols} columns, ${term.rows} rows`);
  fit.fit();
  term.writeln("You can copy with ctrl+shift+x");
  term.writeln("You can paste with ctrl+shift+v");
  term.writeln("Press Enter key to activate the terminal");
  term.onData((data) => {
    console.log("browser terminal received new data:", data);
    var dataObj = {
      method: "control",
      uuid: uuid(),
      timestamp: Date.now(),
      device_id: deviceId,
      source: "web",
      data: {
        input: data, //web端输入的数据
      },
    };
    mqttc.publish(webMqttPub, JSON.stringify(dataObj));
  });

  const mqttc = mqtt.default.connect(mqttUrl, {
    username: mqtt_user,
    password: mqtt_passwd,
    clientId: mqtt_user,
  });

  mqttc.subscribe(webMqttSub);
  const status = document.getElementById("status");

  mqttc.on("message", function (topic, payload) {
    console.log(topic);
    console.log(payload);
    if (topic == webMqttSub) {
      let data = JSON.parse(payload);
      console.log("new output received from server:", data.data.output);
      term.write(data.data.output);
    }
  });

  mqttc.on("connect", () => {
    fitToscreen();
    MQTTStatus.value = true;
    // status.innerHTML = '<span style="background-color: lightgreen;">connected</span>'
  });

  mqttc.on("disconnect", () => {
    MQTTStatus.value = false;
    // status.innerHTML = '<span style="background-color: #ff8383;">disconnected</span>'
  });

  function fitToscreen() {
    fit.fit();
    const dims = { cols: term.cols, rows: term.rows };
    console.log("sending new dimensions to server's pty", dims);
    var dataObj = {
      method: "resize",
      uuid: uuid(),
      timestamp: Date.now(),
      device_id: deviceId,
      source: "web",
      data: {
        input: dims, //web端输入的数据
      },
    };
    mqttc.publish(webMqttPub, JSON.stringify(dataObj));
  }

  function debounce(func, wait_ms) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait_ms);
    };
  }

  /**
   * Handle copy and paste events
   */
  function customKeyEventHandler(e) {
    if (e.type !== "keydown") {
      return true;
    }
    if (e.ctrlKey && e.shiftKey) {
      const key = e.key.toLowerCase();
      if (key === "v") {
        // ctrl+shift+v: paste whatever is in the clipboard
        navigator.clipboard.readText().then((toPaste) => {
          term.writeText(toPaste);
        });
        return false;
      } else if (key === "c" || key === "x") {
        // ctrl+shift+x: copy whatever is highlighted to clipboard

        // 'x' is used as an alternate to 'c' because ctrl+c is taken
        // by the terminal (SIGINT) and ctrl+shift+c is taken by the browser
        // (open devtools).
        // I'm not aware of ctrl+shift+x being used by anything in the terminal
        // or browser
        const toCopy = term.getSelection();
        navigator.clipboard.writeText(toCopy);
        term.focus();
        return false;
      }
    }
    return true;
  }

  function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }

  const wait_ms = 50;
  window.onresize = debounce(fitToscreen, wait_ms);
}

onMounted(() => {
  initTerminal();
});
</script>
<style lang="scss" scoped>
.terminal-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #3b4b5d;
  width: 100%;
  height: 100%;
}
.info-box {
  margin-top: 4vh;
  margin-left: 4vw;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .success {
    color: var(--el-color-success);
  }
  .danger {
    color: var(--el-color-danger);
  }
}

.terminal-content {
  width: calc(100% - 8vw);
  height: 80%;
  margin: 0 4vw;
  margin-top: 10px;
  #terminal {
    width: 100%;
    height: 100%;
  }
}
</style>
