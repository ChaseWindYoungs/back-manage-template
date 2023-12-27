<template>
  <div class="filter-content">
    <el-row @keyup.enter.native="search">
      <el-col
        v-for="(item, index) in filters"
        :key="item.key"
        :span="item.span ?? colSpan"
        :class="{ 'item-none': !showItem(index) }"
      >
        <template v-if="showItem(index)">
          <label>{{ item.label }}</label>
          <component
            v-if="item.childComponent"
            :is="item.component"
            v-model="params[item.key]"
            v-on="{ ...item.events }"
            v-bind="{ clearable: true, ...item.props }"
          >
            <component
              :is="item.childComponent"
              v-for="option in item.options"
              :value="item?.childProps ? option[item?.childProps.value] : option.value"
              :label="item?.childProps ? option[item?.childProps.label] : option.label"
              :key="option.key || option.id"
            >
              {{
                option.text
                  ? option.text
                  : item?.childProps
                  ? option[item?.childProps.label]
                  : option.label
              }}
            </component>
          </component>
          <component
            v-else
            :is="item.component"
            v-model="params[item.key]"
            v-on="{ ...item.events }"
            v-bind="{ clearable: true, ...item.props }"
          />
        </template>
      </el-col>
      <el-col :span="surplusSpan">
        <div class="more-option">
          <div class="btn-list">
            <el-button
              v-show="searchConfig?.show && filters.length > 0"
              type="primary"
              
              @click="dbseach"
              >{{ searchConfig?.text ?? "查询" }}</el-button
            >
            <el-button
              v-show="resetConfig?.show && filters.length > 0"
              type="warning"
              plain
              @click="dbreset"
              >{{ resetConfig?.text ?? "重置" }}</el-button
            >
            <slot name="btns"></slot>
          </div>
          <span class="away-out" @click="moreClick(more)" v-if="moreKey && currentAllSpans >= 24">
            {{ more ? "收起" : "更多" }}
            <svg-icon :iconClass="more ? 'away_out' : 'more_out'" class="wh20" />
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount, onBeforeUnmount } from "vue"
import { debounce } from "@/utils"
const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
  params: {
    type: Object,
    default: () => {},
    required: true,
  },
  labelWidth: {
    type: String,
    default: "90px",
  },
  optSpan: {
    type: Number,
    default: 4,
  },
  moreKey: {
    type: Boolean,
    default: false,
  },
  searchConfig: {
    type: Object,
    default: () => {
      return {
        show: true,
        text: "查询",
      }
    },
  },
  resetConfig: {
    type: Object,
    default: () => {
      return {
        show: true,
        text: "重置",
      }
    },
  },
})
const emit = defineEmits(["search", "reset", "moreClick"])

const search = () => {
  emit("search")
}
const reset = () => {
  emit("reset")
}
const dbseach = debounce(search)
const dbreset = debounce(reset)
const more = ref(false)
const currentAllSpans = ref(0)
const moreClick = bool => {
  more.value = !bool
}


function resetCurrentAllSpans() {
  currentAllSpans.value = 0
}

const showItem = computed(() => {
  return index => {
    let flag = true
    if (more.value) {
      flag = true
    } else {
      flag = props.moreKey ? index < 3 : true
    }
    return flag
  }
})
const surplusSpan = computed(() => {
  let span = 0
  resetCurrentAllSpans()
  props.filters.forEach(i => {
    currentAllSpans.value += i.span ?? colSpan.value
  })
  let limit = ((24 / colSpan.value) - 1)
  if (props.filters.length < limit || (props.filters.length > limit && more.value)) {
    span = 24 - (currentAllSpans.value % 24)
  } else {
    span = !props.moreKey ? 24 - (currentAllSpans.value % 24) : colSpan.value
  }
  return span
})
const colSpan = ref(6)
function resizeColSpan() {
  const w = document.documentElement.clientWidth 
  if(w > 1920) colSpan.value = 4
  else colSpan.value = 6
}
onBeforeMount(() => {
  resizeColSpan()
  window.addEventListener('resize', resizeColSpan)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeColSpan)
})
</script>

<style lang="scss" scoped>
.filter-content {
  width: 100%;
  height: auto;
  .el-row {
    padding: 12px;
    .el-col {
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;

      > label {
        width: auto;
        white-space: nowrap;
        padding: 0 10px;
      }

      > label + * {
        width: auto;
        flex: 1;
      }

      &.opt-col {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .more-option {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-left: 20px;
    justify-content: flex-end;
    .btn-list {
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
    }

    .away-out {
      cursor: pointer;
      color: $primary;
      margin-left: 10px;
      svg {
        use {
          color: $primary;
        }
      }
    }
  }

  .item-none {
    display: none !important;
  }
}
</style>
