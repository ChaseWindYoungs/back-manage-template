<template>
  <div class="video-content" :id="id">
    <div style="position: absolute; z-index: 1; width: 100%; height: 100%"></div>
    <div class="video-top">
      <p class="video-info single-text">
        <span v-if="isLive">{{ compkBps }} KB/s</span>
        <span v-if="!showAudio">{{ compFps }} FPS</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup name="LiveVideo">
/**
 * LiveVideo
 *  streamcanvasx 文档地址 https://www.yuque.com/luoxuan-nir7u/mdzc63/yaz8wr76n2e1lbpt
 */
import { ref, onUnmounted, computed, nextTick, watch } from "vue"
import { getAssetsFile } from "@/utils"
import { createPlayerServiceInstance, createPlayerServicePromise } from "streamcanvasx/esm/index"

const props = defineProps({
  // 挂载ID
  id: {
    type: String,
    default: "VideoBox",
  },
  url: {
    type: String,
    default: "",
  },
  isPlay: {
    type: Boolean,
    default: true,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  showAudio: {
    type: Boolean,
    default: false,
  },
  hasAudio: {
    type: Boolean,
    default: false,
  },
  hasVideo: {
    type: Boolean,
    default: true,
  },
  // 流类型
  streamType: {
    type: String,
    default: "FLV",
  },
  // 是否是直播
  isLive: {
    type: Boolean,
    default: true,
  },
  // 需要手动触发
  needHandle: {
    type: Boolean,
    default: false,
  },
})

const playError = getAssetsFile("images/playError.png")
const streamcanvasxRef = ref(null)
const fps = ref(0)
const kBps = ref(0)
const compkBps = computed(() => kBps.value)
const compFps = computed(() => fps.value)

watch(
  () => props.url,
  val => {
    destroy()
    if (val && !props.needHandle) {
      creatMedia(val)
    }
  },
  { immediate: true }
)

function handleCreatMedia() {
  creatMedia(props.url)
}

async function creatMedia(options = {}) {
  if (!props.url) return
  await nextTick()
  let { showAudio = false, hasAudio = false, hasVideo = true, url = "" } = props
  // let player = createPlayerServiceInstance({
  let player = await createPlayerServicePromise({
    url: props.url,
    contentEl: document.getElementById(props.id),
    showAudio: showAudio,
    hasAudio,
    hasVideo,
    errorUrl: playError,
    streamType: props.streamType,
    isLive: props.isLive,
  })

  streamcanvasxRef.value = player
  player.createFlvPlayer({})
  player.on("otherInfo", data => {
    let { speed } = data
    speed = parseFloat(speed).toFixed(2)
    kBps.value = speed
  })

  player.on("performaceInfo", data => {
    if (data.fps === "Infinity") {
      data.fps = 0
    }
    let fps1 = data.fps * 1
    fps1 = fps1.toFixed(0)
    fps.value = fps1
  })
  player.canvasVideoService.setCover(true)
}

function mute() {
  if (props.hasAudio) {
    streamcanvasxRef.value.audioProcessingService.mute(!props.muted)
  }
}

//镜面反转
function drawTrasform(degree) {
  const obj = {
    0: "transformReset", // 原始画面
    90: "drawHorizontalMirror", // 水平镜像
    180: "drawVerticalMirror", // 垂直镜像
  }
  streamcanvasxRef.value.canvasVideoService[obj[degree]]()
}

//角度旋转
function drawRotate(degree) {
  if (degree === "0") return streamcanvasxRef.value.canvasVideoService.rotateReset() // 重置角度
  streamcanvasxRef.value.canvasVideoService.drawRotate(degree)
}

// 画面比例切换
function setCover(bool) {
  streamcanvasxRef.value.canvasVideoService.setCover(bool)
}

function destroy() {
  if (streamcanvasxRef.value && streamcanvasxRef.value) {
    streamcanvasxRef.value.destroy()
    streamcanvasxRef.value = null
  }
}

defineExpose({
  destroy,
  mute,
  drawTrasform,
  drawRotate,
  setCover,
  handleCreatMedia,
})

onUnmounted(() => {
  destroy()
})
</script>
<style lang="scss" scoped>
.video-content {
  position: relative;
  width: 100%;
  height: 100px;

  .video-top {
    position: absolute;
    display: flex;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: 0;
    z-index: 9;
    padding: 0 13px;
    height: 38px;
    background: rgba(20, 33, 51, 0.397);
    color: $white;
    min-width: 100px;

    span {
      flex: 1;
    }

    p {
      flex: 1;
      text-align: right;

      span {
        width: 50px;
        padding-left: 12px;
      }
    }
  }

  .media {
    width: 100%;
    height: calc(100% - 38px);
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      position: absolute;
      width: 50%;
      height: 50%;
      object-fit: scale-down;
    }
  }

  :deep(.jessibuca-container) {
    .jessibuca-loading {
      z-index: -1;
    }
  }
}
</style>
