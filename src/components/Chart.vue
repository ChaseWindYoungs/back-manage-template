<template>
  <div :id="id" ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts" name="chartItem">
import { nextTick, onMounted, ref, watch, onBeforeUnmount, shallowRef } from "vue";
import * as echarts from "echarts";
import { ECharts, ECElementEvent } from "echarts";
import "echarts-liquidfill"; // https://ecomfe.github.io/echarts-liquidfill/example/

interface LoopConfig {
  currentIndex: number;
  timer: undefined | number;
}

interface Props {
  id: string;
  dataLen?: number;
  loop?: boolean; // 循环播放tooltip
  mouseTrigger?: boolean; // 鼠标触发暂停和重启
  chartOption: any;
}

const props = withDefaults(defineProps<Props>(), {
  id: "chart",
  dataLen: 0,
  loop: false,
  mouseTrigger: false,
  chartOption: {},
});

let myChart = shallowRef<ECharts>();

watch(
  () => props.chartOption,
  () => initChart(),
  { deep: true }
);

const chartRef = ref();
function initChart() {
  const chartDom = chartRef.value;
  if (!myChart.value) {
    myChart.value = echarts.init(chartDom);
  }
  myChart.value.setOption(props.chartOption);
  props.loop && barChartLoop();
  props.mouseTrigger && addMouseTrigger();
}

const barConfig: LoopConfig = {
  currentIndex: -1,
  timer: undefined,
};

const onmousemove = (e: ECElementEvent) => {
  console.log(e);
  clearInterval(barConfig.timer);
  barConfig.currentIndex = e.dataIndex;
};
const onmouseout = (e: ECElementEvent) => {
  barConfig.currentIndex = e.dataIndex % props.dataLen;
  barChartLoop();
};

function addMouseTrigger() {
  myChart.value && myChart.value.on("mousemove", onmousemove);
  myChart.value && myChart.value.on("mouseout", onmouseout);
}

// 开启循环
function barChartLoop() {
  clearInterval(barConfig.timer);
  barConfig.timer = window.setInterval(() => {
    chartAction();
  }, 1500);
}

function chartAction() {
  if (!myChart.value) return;
  myChart.value.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: barConfig.currentIndex,
  });
  barConfig.currentIndex = (barConfig.currentIndex + 1) % props.dataLen;
  // 高亮当前图形
  myChart.value.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: barConfig.currentIndex,
  });
  // 显示 tooltip
  myChart.value.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: barConfig.currentIndex,
  });
}

function destroyedChart() {
  if (!myChart.value) return;
  if (props.mouseTrigger) {
    clearInterval(barConfig.timer);
    myChart.value.off("mousemove", onmousemove);
    myChart.value.off("mouseout", onmouseout);
  }
  myChart.value && myChart.value.clear();
  myChart.value = undefined;
}

onMounted(() => nextTick(() => initChart()));
onBeforeUnmount(() => destroyedChart());
defineExpose({
  destroyedChart,
  myChart,
});
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
