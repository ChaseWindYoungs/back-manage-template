<template>
  <div class="w100% h100% root-no-bg">
    <div
      class="top-card card-box mb-15"
      v-motion
      :initial="{ opacity: 0, y: 60 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
    >
      <div class="flex flex-items-center">
        <div class="logo-box">
          <SvgIcon className="icon" iconClass="logo" />
        </div>
        <div class="desc ml10">
          <p>
            尊敬的用户，{{ time }}好, 感谢您选择 <b style="color: var(--primary)">Tobe-vue-admin</b>， 本项目采用
            <b>Vue3、 Vite、 Elemen-Plus、 Pinia、 Echarts</b> 等技术，搭建了一个较为完善的后台管理系统模板，开箱即用！
          </p>
        </div>
      </div>
    </div>
    <el-row :gutter="15" class="count-row mb-15">
      <el-col
        :span="6"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 1 } }"
      >
        <div class="card-box overflow-hidden">
          <div class="count-box">
            <StatisticNum title="图标数量" :value="iconCount"/>
            <div class="icon-box">
              <SvgIcon className="icon" iconClass="smile" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 2 } }"
      >
        <div class="card-box overflow-hidden">
          <div class="count-box">
            <StatisticNum title="路由数量" :value="routeCount"/>
            <div class="icon-box">
              <SvgIcon className="icon" iconClass="read" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 3 } }"
      >
        <div class="card-box overflow-hidden">
          <div class="count-box">
            <StatisticNum title="依赖数量" :value="dependencyCount"/>
            <div class="icon-box">
              <SvgIcon className="icon" iconClass="wrench" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 4 } }"
      >
        <div class="card-box overflow-hidden">
          <div class="count-box">
            <StatisticNum title="文件数量" :value="fileCount"/>
            <div class="icon-box">
              <SvgIcon className="icon" iconClass="file-text" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="count-row mb-15">
      <el-col
        :span="18"
        class="h45vh"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 2 } }"
      >
        <div class="card-box w100% h100%">
          <Chart
            class="w100% h100%"
            :chartOption="lineOption"
            :dataLen="lineOption.series[0].data.length"
            ref="pieChartRef"
            id="pie"
            :loop="true"
            :mouseTrigger="true"
          />
        </div>
      </el-col>
      <el-col
        :span="6"
        class="h45vh"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 3 } }"
      >
        <div class="card-box w100% h100%">
          <Chart
            class="w100% h100%"
            :chartOption="pieOption"
            :dataLen="pieOption.series[0].data.length"
            ref="pieChartRef"
            id="pie"
            :loop="true"
            :mouseTrigger="true"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="count-row">
      <el-col
        :span="18"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 4 } }"
      >
        <div class="card-box progress-box w100% h100%">
          <Table ref="tableRef" :columns="columns" :data="tableData">
            <template #actions>
              <el-button type="primary" plain> 创建用户 </el-button>
            </template>
          </Table>
        </div>
      </el-col>
      <el-col
        :span="6"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + 80 * 5 } }"
      >
        <div class="card-box progress-box w100% h100%">
          <p class="font-size-18 mb-20">完成率</p>
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="76"
            striped
            striped-flow
            :duration="30"
            const
            color="rgb(255 179 86)"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="70"
            striped
            striped-flow
            :duration="30"
            const
            color="#41b6ff"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="82"
            striped
            striped-flow
            :duration="30"
            const
            color="rgb(255 130 0)"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="60"
            striped
            striped-flow
            :duration="30"
            const
            color="rgb(1 152 255)"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="74"
            striped
            striped-flow
            :duration="30"
            const
            color="#e86033"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="85"
            striped
            striped-flow
            :duration="30"
            const
            color="rgb(0 131 255)"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup name="dashboard" lang="tsx">
/**
 * dashboard
 */
import { ref, onMounted, computed, nextTick } from "vue";
import { useTransition } from "@vueuse/core";
import * as echarts from "echarts";

const time = computed(() => {
  let str = "";
  let _time = new Date();
  if (_time.getHours() >= 18 || _time.getHours() < 6) {
    str = "晚上";
  } else if (_time.getHours() >= 6 && _time.getHours() < 11) {
    str = "上午";
  } else if (_time.getHours() >= 11 && _time.getHours() < 13) {
    str = "中午";
  } else if (_time.getHours() >= 13 && _time.getHours() < 18) {
    str = "下午";
  }
  return str;
});
const iconCount = ref(598);
const routeCount = ref(14);
const dependencyCount = ref(38);
const fileCount = ref(121);

const formatArrayStr = (row, column, cellValue, index) => {
  if (["", null, undefined].includes(cellValue)) return "--";
  return cellValue.map((i) => (
    <el-tag round key={i.id}>
      {i.name}
    </el-tag>
  ));
};
const columns = [
  { prop: "index", label: "序号", type: "index", width: "80", fixed: "left" },
  { prop: "username", label: "账号", fixed: "left" },
  { prop: "nickname", label: "姓名", width: "200" },
  {
    prop: "gender",
    label: "性别",
    width: "60",
    align: "center",
    render: (scoped) => {
      return scoped.row.gender === 0 ? "女" : "男";
    },
  },
  { prop: "email", label: "邮箱" },
  {
    prop: "roleList",
    label: "角色",
    width: "180",
    align: "center",
    format: formatArrayStr,
  },
  { prop: "phone", label: "联系方式", width: "150", align: "center" },
  {
    prop: "status",
    label: "状态",
    width: "100",
    align: "center",
    render: (scoped) => {
      return <el-tag type={scoped.row.status ? "success" : "danger"}>{scoped.row.status ? "启用" : "禁用"}</el-tag>;
    },
  },
  { prop: "createTime", label: "创建时间",   width: "180", },
  {
    prop: "action",
    label: "操作",
    fixed: "right",
    width: "200",
    render: (scoped) => {
      return (
        <div class="action">
          <el-button text type="primary">
            编辑
          </el-button>
          <el-button text type="danger">
            删除
          </el-button>
        </div>
      );
    },
  },
];

const tableData = [
  {
    username: "admin",
    nickname: "超级管理员",
    isOnline: false,
    status: true,
    sort: 0,
    roleList: [
      {
        name: "超级管理员",
      },
    ],
  },
  {
    username: "hahaha",
    nickname: "超级管理员",
    isOnline: false,
    status: true,
    sort: 0,
    updateTime: "2023-11-16 14:20:39",
    roleList: [
      {
        name: "超级管理员",
      },
    ],
    appList: [],
  },
  {
    id: "1725036440523378688",
    username: "xmf",
    nickname: "小蜜蜂",
    isOnline: false,
    status: true,
    gender: 1,
    phone: "18111111111",
    remark: "11",
    sort: 0,
    createTime: "2023-11-16 14:21:51",
    updateTime: "2023-11-17 09:49:06",
    email: "111111111",
    roleList: [
      {
        name: "超级管理员",
      },
    ],
  },
  {
    id: "1727504203946921984",
    username: "ttt",
    nickname: "text111",
    isOnline: false,
    status: true,
    profilePhoto: null,
    gender: 1,
    phone: "13345678998",
    createTime: "2023-11-23 09:47:52",
    updateTime: "2024-01-10 16:06:14",
    email: "12345dddd6@qq.com",
    roleList: [
      {
        name: "超级管理员",
      },
    ],
  },
];

const pieOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: "5%",

    left: "center",
    data: ["周一", "周二", "周三", "周四", "周五"],
  },
  color: ["rgb(232, 96, 51)", "rgb(9,187,247)", "rgb(184,254,165)", "rgb(253,218,23)", "rgb(252,152,12)"],
  series: [
    {
      name: "工作量",
      type: "pie",
      radius: ["45%", "70%"],
      center: ["50%", "40%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: "bold",
        },
      },
      data: [
        { value: 1048, name: "周一" },
        { value: 735, name: "周二" },
        { value: 580, name: "周三" },
        { value: 484, name: "周四" },
        { value: 300, name: "周五" },
      ],
    },
  ],
};

var lineOption = {
  tooltip: {
    //提示框组件
    trigger: "axis",
    formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
    axisPointer: {
      type: "shadow",
      label: {
        backgroundColor: "#6a7985",
      },
    },
    textStyle: {
      color: "#333",
      fontStyle: "normal",
      fontFamily: "微软雅黑",
      fontSize: 14,
    },
  },
  grid: {
    left: "1%",
    right: "4%",
    bottom: "6%",
    top: 30,
    padding: "0 0 10 0",
    containLabel: true,
  },
  legend: {
    //图例组件，颜色和名字
    right: 10,
    top: 0,
    itemGap: 16,
    itemWidth: 18,
    itemHeight: 10,
    data: [
      {
        name: "已解决",
        //icon:'image://../wwwroot/js/url2.png', //路径
      },
      {
        name: "未解决",
      },
    ],
    textStyle: {
      color: "#a8aab0",
      fontStyle: "normal",
      fontFamily: "微软雅黑",
      fontSize: 12,
    },
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true, //坐标轴两边留白
      data: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        margin: 15,
        textStyle: {
          color: "#078ceb",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 12,
        },
      },
      axisTick: {
        //坐标轴刻度相关设置。
        show: true,
      },
      axisLine: {
        //坐标轴轴线相关设置
        lineStyle: {
          color: "#333",
          opacity: 0.2,
        },
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      splitNumber: 5,
      axisLabel: {
        textStyle: {
          color: "#a8aab0",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 12,
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#333",
          opacity: 0.2,
        },
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#333"],
          opacity: 0.06,
        },
      },
    },
  ],
  series: [
    {
      name: "已解决",
      type: "bar",
      data: [4.9, 7.3, 9.2, 5.6, 7.7, 5.6, 4.2, 3.6, 6, 6.4],
      barWidth: 10,
      barGap: 0, //柱间距离
      label: {
        //图形上的文本标签
        normal: {
          show: true,
          position: "top",
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
          },
        },
      },
      itemStyle: {
        //图形样式
        normal: {
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 1,
                color: "rgba(104, 253, 255 , 0.7)",
              },
              {
                offset: 0,
                color: "rgba(9,187,247, 0.7)",
              },
            ],
            false
          ),
        },
      },
    },
    {
      name: "未解决",
      type: "bar",
      data: [2.9, 5, 4.4, 2.7, 5.7, 4.6, 1.2, 2.7, 4.8, 6.0],
      barWidth: 10,
      barGap: 0.2, //柱间距离
      label: {
        //图形上的文本标签
        normal: {
          show: true,
          position: "top",
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
          },
        },
      },
      itemStyle: {
        //图形样式
        normal: {
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 1,
                color: "rgba(253, 200, 106, 0.7)",
              },
              {
                offset: 0,
                color: "rgba(232, 96, 51, 0.7)",
              },
            ],
            false
          ),
        },
      },
    },
  ],
};
</script>
<style lang="scss" scoped>
.top-card {
  background-color: rgba(87, 151, 255, 0.1);
  background-image: linear-gradient(90deg, rgba(167, 201, 255, 0.1) 0%, #fff 100%);

  .logo-box {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary;
    // background-color: var(--el-color-primary-light-9);

    svg {
      width: 60px;
      height: 60px;
    }
  }
  .desc {
    font-size: 16px;
  }
}
.card-box {
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}
.count-box {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  &::before {
    content: "";
    top: 20px;
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 45px 45px rgba(0, 70, 182, 0.09);
    z-index: 99;
  }
  :deep(.el-statistic__head) {
    font-size: 16px;
    margin-bottom: 15px;
  }
  :deep(.el-statistic__content) {
    font-size: 26px;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  .icon-box {
    padding: 6px;
    border-radius: 6px;
  }
}
.count-row {
  .el-col {
    &:nth-child(1) {
      .icon-box {
        background-color: rgba(232, 96, 51, 0.1);
        svg {
          color: rgba(232, 96, 51);
        }
      }
    }
    &:nth-child(2) {
      .icon-box {
        background-color: rgba(65, 182, 255, 0.1);
        svg {
          color: rgb(65, 182, 255);
        }
      }
    }
    &:nth-child(3) {
      .icon-box {
        background-color: rgba(38, 206, 131, 0.1);
        svg {
          color: rgba(38, 206, 131);
        }
      }
    }
    &:nth-child(4) {
      .icon-box {
        background-color: rgba(120, 70, 229, 0.1);
        svg {
          color: rgba(120, 70, 229);
        }
      }
    }
  }
}
.progress-box {
  .el-progress {
    &:not(:first-child) {
      margin-top: 15px;
    }
  }
}
</style>
