<template>
  <div>
    <div class="w300 h300">
      <Chart :chartOption="waveOption" id="wave" ref="waveChartRef" />
    </div>
    <div class="w300 h300">
      <Chart
        :chartOption="barOption"
        :dataLen="barOption.series[0].data.length"
        :loop="true"
        :mouseTrigger="true"
        id="bar"
        ref="barChartRef"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="index">
/**
 * index
 * 1、非必要，不需要把option设置为响应式变量，因为层级深，而且动态的修改会影响性能，
 */
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
// 水位图
const waveChartRef = ref(null);
const waveOption = {
  title: {
    text: "水位图",
    x: "center",
    y: "bottom",
      color: "#333",
      fontWeight: "normal",
      fontSize: "14px",

  },
  series: [
    {
      name: "水位图",
      type: "liquidFill",
      radius: "70%",
      data: [],
      // 水球图中的水位，0-1之间，若想要多个波纹，可写多条数据[0.6, 0.5, 0.8]，
      // 如果想要不显示，可以设置label中的textStyle.fontSize为 0
      label: {
          color: "#fff",
          insideColor: "#fff",
            fontSize: "040px", // 此处设置为0时文字消失
            fontWeight: "bold",

      },
      color: [
        {
          type: "linear",
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 1,
              color: ["#6a7feb"], // 0% 处的颜色
            },
            {
              offset: 0,
              color: ["#557aa9"], // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      ],
      outline: {
        show: true,
        borderDistance: 2,
        itemStyle: {
          borderColor: "#557aa9", // 水球图外边框的颜色
          borderWidth: 3, // 水球图外边框的宽度
        },
      },
      backgroundStyle: {
        color: "#212140", // 水球背景色
        borderWidth: 3, // 水球内部圆形的边框宽度， 默认是没有的
      },
    },
  ],
};

// 柱状图
const barOption = {
  backgroundColor: "#323a5e",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow", // 坐标轴指示器，坐标轴触发有效， 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "14%",
    top: "16%",
    containLabel: true,
  },
  legend: {
    data: ["1", "2", "3"],
    right: 10,
    top: 12,
    color: "#fff" ,
    itemWidth: 12,
    itemHeight: 10,
  },
  xAxis: {
    type: "category",
    data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
    axisLine: {
      lineStyle: { color: "white" },
    },
    axisLabel: {
       fontFamily: "Microsoft YaHei" ,
    },
  },

  yAxis: {
    type: "value",
    max: "2000",
    axisLine: {
      show: false,
      lineStyle: {
        color: "white",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255,255,255,0.3)",
      },
    },
    axisLabel: {},
  },
  // dataZoom: [
  //   {
  //     show: true,
  //     height: 12,
  //     xAxisIndex: [0],
  //     bottom: "8%",
  //     start: 10,
  //     end: 90,
  //     handleIcon:
  //       "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
  //     handleSize: "110%",
  //     handleStyle: {
  //       color: "#d3dee5",
  //     },
  //     textStyle: {
  //       color: "#fff",
  //     },
  //     borderColor: "#90979c",
  //   },
  //   {
  //     type: "inside",
  //     show: true,
  //     height: 15,
  //     start: 1,
  //     end: 35,
  //   },
  // ],
  series: [
    {
      name: "1",
      type: "bar",
      barWidth: "15%",
      stack: 'Bar',
      itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#fccb05",
            },
            {
              offset: 1,
              color: "#f5804d",
            },
          ]),
          borderRadius: 12,
      },
      data: [400, 400, 300, 300, 300, 400, 400, 400, 300],
    },
    {
      name: "2",
      type: "bar",
      barWidth: "15%",
      stack: 'Bar',
      itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#8bd46e",
            },
            {
              offset: 1,
              color: "#09bcb7",
            },
          ]),
          borderRadius: 11,
      },
      data: [400, 500, 500, 500, 500, 400, 400, 500, 500],
    },
    {
      name: "3",
      type: "bar",
      barWidth: "15%",
      stack: 'Bar',
      itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#248ff7",
            },
            {
              offset: 1,
              color: "#6851f1",
            },
          ]),
          borderRadius: 11,
      },
      data: [400, 600, 700, 700, 1000, 400, 400, 600, 700],
    },
  ],
};

const barChartRef = ref();

onMounted(() => {
  setTimeout(() => {
    let proportion = 0.6;
    let arr = [];
    for (let index = proportion * 10; index > 0; index--) {
      arr.push(index / 10);
    }
    waveOption.series[0].data = arr;
    waveChartRef.value.myChart.setOption(waveOption);
  }, 50);
});
</script>
<style lang="scss" scoped></style>
