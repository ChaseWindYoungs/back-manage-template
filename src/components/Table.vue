<template>
  <div class="table-box">
    <div class="top-content">
      <div class="top-actions" v-if="slots?.actions && typeChange">
        <div class="left">
          <slot name="actions" />
        </div>
        <div class="right" v-show="typeChange">
          <div class="type-change">
            <SvgIcon
              :className="isList ? 'active' : ''"
              iconClass="unorderedlist"
              @click="changeShowType"
            />
            <SvgIcon
              :className="!isList ? 'active' : ''"
              iconClass="appstore"
              @click.stop="changeShowType"
            />
          </div>
        </div>
      </div>
      <el-table
        v-if="isList"
        v-loading="loading"
        ref="tableRef"
        border
        :data="tableData"
        v-bind="$attrs"
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentSelectionChange"
      >
        <template v-for="(column, index) in copyColumns" :key="column">
          <el-table-column
            v-if="column.render"
            v-bind="column"
            header-align="center"
            :min-width="column.minWidth ? column.minWidth : column.width ? null : 160"
          >
            <template #default="scope">
              <component :is="column.render" v-bind="scope" />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            v-bind="column"
            header-align="center"
            :key="`${column}-${index}`"
            :formatter="column.format || formatCell"
            :min-width="column.minWidth ? column.minWidth : column.width ? null : 160"
          />
        </template>
      </el-table>
      <template v-else>
        <template v-if="tableData.length > 0">
        
        <template v-if="slots?.card">
          <div ref="cardList" v-loading="loading">
            <div v-for="(item, index) in tableData" :key="item">
              <slot name="card" v-bind="{ item: item, index: index + 1 }" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="card-list" ref="cardList" v-loading="loading">
            <div
              class="card-item"
              v-for="(item, idx) in tableData"
              :key="item"
              :class="isCollapse ? 'lager' : 'small'"
            >
              <div class="info-bg-box" :class="statusColor(item)"></div>
              <div class="info-box">
                <div class="info-item" v-for="(_i, index) in cardColumn" :key="_i">
                  <p class="label">{{ cardColumn[index].label }}：</p>
                  <div class="cont">
                    <template v-if="cardColumn[index].render">
                      <component :is="cardColumn[index].render" v-bind="{ row: item }" />
                    </template>
                    <template v-else>
                      {{
                        cardColumn[index].format
                          ? cardColumn[index].format(item[cardColumn[index].prop])
                          : formatCell({}, {}, item[cardColumn[index].prop], null)
                      }}
                    </template>
                  </div>
                </div>
              </div>
              <div class="action-box" v-if="columns[columns.length - 1]['prop'] === 'action'">
                <component :is="columns[columns.length - 1]['render']" v-bind="{ row: item }" />
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <slot name="cardEmpty"  />
      </template>
      </template>
    </div>
    <div class="pagination-box" v-if="!onlyList && page.total > 0">
      <el-pagination
        v-model:current-page="page.page"
        v-model:page-size="page.pageSize"
        :page-sizes="pageSizeArr"
        :layout="pageLayout"
        :total="page.total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="Tabel">
/**
 * Tabel
 */
import { ref, onBeforeMount, watch, watchEffect, computed, useSlots } from "vue"
import { debounce } from "@/utils"
import { formatCell } from "@/utils"
import { isEmpty, isNullOrUnDefOrVct } from "@/utils/is"
import { cloneDeep } from "lodash-es"
import { getArrValue } from "@/utils"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"

const appStore = useAppStore()
const { isCollapse } = storeToRefs(appStore)
const slots = useSlots()
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  fetchMethod: Function,
  searchParams: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: true,
  },
  cleanEmpty: {
    type: Boolean,
    default: true,
  },
  onlyList: {
    type: Boolean,
    default: false,
  },
  typeChange: {
    type: Boolean,
    default: true,
  },
  cardFirst: {
    type: Boolean,
    default: false,
  },
  shwoStatusColor: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(["update:selections", "update:select"])

const tableData = ref([])
const tableRef = ref()
const copyColumns = ref([])
const loading = ref(false)
const pageSizeArr = [5, 10, 20, 50, 100]
const pageLayout = "total, sizes, prev, pager, next, jumper"
const page = ref({
  total: 0,
  pageSize: 20,
  page: 1,
})
const debounceFetchMethod = debounce(getList)

function getList(
  params = {
    ...props.searchParams,
    ...{ page: page.value.page, pageSize: page.value.pageSize },
  }
) {
  loading.value = props.loading
  if (props.cleanEmpty) {
    for (let item in params) {
      if (isNullOrUnDefOrVct(params[item])) {
        delete params[item]
      }
    }
  }
  if (props.onlyList) {
    delete params.page
    delete params.pageSize
  }
  props.fetchMethod &&
    props
      .fetchMethod(params)
      .then((res: any) => {
        if (!props.onlyList) {
          page.value.page = res?.currPage ?? 1
          page.value.total = res?.totalCount ?? 0
          page.value.pageSize = res?.pageSize ?? 20
          tableData.value = res?.list ?? []
        } else {
          tableData.value = res ?? []
        }
      })
      .catch((e: any) => {
        console.log(e)
      })
      .finally(() => {
        loading.value = false
        if (!isList.value) {
          cardList.value.scrollTop = 0
        }
      })
}

function fetchData() {
  if (!props.fetchMethod) {
    tableData.value = props.data
  } else {
    debounceFetchMethod()
  }
}

watch(
  () => props.searchParams,
  () => {
    page.value.page = 1
    fetchData()
  },
  { deep: true }
)
// watchEffect(() => {
//   // 三处数据的变化都将重新请求数据
//   const { page: _page, pageSize} = page.value
//   const { data } = props
//   fetchData()
// })
watch(
  () => page.value.page,
  () => fetchData(),
  { deep: true }
)
watch(
  () => page.value.pageSize,
  () => fetchData(),
  { deep: true }
)
watch(
  () => props.data,
  () => fetchData(),
  { deep: true }
)
watchEffect(() => {
  copyColumns.value = setColumnFilter(props.columns, tableData.value)
})

function handleSizeChange(val: number) {
  if (val !== page.value.pageSize) {
    page.value.pageSize = val
    tableData.value = []
    getList()
  }
}

function handleCurrentChange(val: number) {
  if (val !== page.value.page) {
    page.value.page = val
    tableData.value = []
    getList()
  }
}
// 传递多选
function handleSelectionChange(val) {
  emit("update:selections", val)
}

// 传递单选
function handleCurrentSelectionChange(val) {
  emit("update:select", val)
}

// 清除单选
function clearCurrentSelection() {
  tableRef.value!.setCurrentRow()
  emit("update:selections")
  emit("update:select")
}

// 配置筛选字段的数据
function setColumnFilter(columns, data) {
  let _columns = cloneDeep(columns) ?? []
  if (_columns.length > 0) {
    _columns.forEach(col => {
      if (col._filter) {
        let array = []
        data.forEach(item => {
          if (!array.find(val => val.value === item[col.prop])) {
            let obj = { value: item[col.prop] }
            obj["text"] =
              col.filterLabelArr && col.filterLabelArr.length > 0
                ? getArrValue(col.filterLabelArr, item[col.prop])
                : item[col.prop]
            array.push(obj)
          }
        })
        col["filters"] = array
        col["filterMethod"] = filterHandler
      }
    })
  }
  return _columns
}

//筛选方法
function filterHandler(value: string, row: Object, column: Object) {
  const property = column["property"]
  return row[property] === value
}

function clearSelection() {
  tableRef.value.clearSelection()
}

const isList = ref(true)
const cardList = ref()
const cardColumn = computed(() => {
  let lastItem = props.columns[props.columns.length - 1]
  let arr = []
  if (lastItem.prop === "action") {
    arr = props.columns.slice(1, props.columns.length - 1)
  } else {
    arr = props.columns.slice(1)
  }
  return arr
})
function changeShowType() {
  isList.value = !isList.value
}

function statusColor(item) {
  let clsName = ""
  if (props.shwoStatusColor) {
    let keys = Object.keys(props.shwoStatusColor)
    if (item[keys[0]] === props.shwoStatusColor[keys[0]]) {
      clsName = "success"
    } else {
      clsName = "error"
    }
  }
  return clsName
}

onBeforeMount(() => {
  if (props.cardFirst) {
    changeShowType()
  }
  fetchData()
})

defineExpose({
  fetchData,
  clearCurrentSelection,
  clearSelection,
})
</script>
<style lang="scss" scoped>
.table-box {
  width: 100%;
  background-color: #fff;
}
.pagination-box {
  margin-top: 10px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-right: 10px;
}

.top-actions {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 10px;
}
.type-change {
  .svg-icon {
    width: 38px;
    height: 30px;
    padding: 4px 6px;
    border: 1px solid #f0f2f5;
    color: #aaaaaa;
    &.active {
      color: $primary;
      border-color: $primary;
    }
  }
}
.card-list {
  color: var(--el-text-color-regular);
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  overflow: auto;
  padding: 10px 10px 10px 0;
  min-height: 40px;
  .card-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 5px 10px 5px;
    // margin-bottom: 10px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    // padding: 10px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s;

    .idx-box {
      position: absolute;
      left: 6px;
      top: 3px;
      font-size: 12px;
    }
    .info-box {
      position: relative;
      overflow: hidden;
      padding: 10px;
    }
    .info-bg-box {
      position: absolute;
      overflow: hidden;
      left: 0;
      top: 0;
      width: 100%;
      height: calc(100% - 50px);
      &::before {
        content: "";
        position: absolute;
        right: -5%;
        height: 100%;
        width: 44.65%;
        top: 0;
        transform: skew(-15deg);
        z-index: 0;
        background: linear-gradient(
          188.4deg,
          rgba(102, 102, 102, 0.03) 30%,
          rgba(102, 102, 102, 0) 80%
        );
      }
      &::after {
        content: "";
        position: absolute;
        right: -5%;
        height: 100%;
        width: calc(44.65% + 34px);
        top: 0;
        transform: skew(-15deg);
        z-index: 0;
        background: linear-gradient(
          188.4deg,
          rgba(102, 102, 102, 0.03) 30%,
          rgba(102, 102, 102, 0) 80%
        );
      }
      &.success {
        &::before {
          background: linear-gradient(
            188.4deg,
            rgba(19, 229, 0, 0.03) 30%,
            rgba(19, 229, 0, 0) 80%
          );
        }
        &::after {
          background: linear-gradient(
            188.4deg,
            rgba(19, 229, 0, 0.03) 30%,
            rgba(19, 229, 0, 0) 80%
          );
        }
      }
      &.error {
        &::before {
          background: linear-gradient(
            188.4deg,
            rgba(229, 0, 18, 0.03) 30%,
            rgba(229, 0, 18, 0) 80%
          );
        }
        &::after {
          background: linear-gradient(
            188.4deg,
            rgba(229, 0, 18, 0.03) 30%,
            rgba(229, 0, 18, 0) 80%
          );
        }
      }
    }

    &:hover {
      box-shadow: 0 0 10px 3px #e9e9e9;
      background: #fcfcfc;
    }
    // &:nth-child(3n ) {
    //   margin-right: 0;
    // }
    .main {
      margin-top: 4px;
      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .info-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 6px;
      .label {
        margin-right: 4px;
        text-align: right;
        width: 120px;
        flex-shrink: 0;
      }
      .cont {
        word-break: break-all;
      }
      &:first-child {
        margin-top: 4px;
        .label {
          text-align: left;
          width: unset;
        }
        .cont {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .action-box {
      // padding-top: 10px;
      padding: 5px 10px;
      border-top: 1px solid #d6d6d6;
      display: flex;
      justify-content: flex-end;
    }
  }
  .lager {
    width: calc((100% / 3) - 10px);
  }
  .small {
    width: calc((100% / 4) - 10px);
  }
}
</style>
