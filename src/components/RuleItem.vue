<template>
  <div
    class="rulers-select-wraper-nodata"
    v-if="
      depth === 1 && (!filterRules.children?.length)
    "
  >
    <p>暂无规则</p>
  </div>
  <div v-else class="rulers-select-wraper">
    <el-form ref="treeForm" :model="filterRules" label-width="80px">
      <template v-for="(item, index) in filterRules.children" :key="item.id">
        <div class="select-label-row">
          <span class="horizontal-line"></span>
          <div
            v-if="!item.children || !item.children.length"
            class="input-select-data"
          >
            <div class="form-modal">
              <el-form-item
                :prop="`children[${index}].filedValue`"
                :rules="[
                  {
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="item.filedValue"
                  placeholder="请选择字段"
                ></el-input>
              </el-form-item>
            </div>
            <div class="icon-list">
              <i
                v-if="depth < 5"
                class="i-icon ri-add-circle-fill"
                @click="insertRuleItem(item)"
              > + </i>
              <i
                class="i-icon ri-indeterminate-circle-fill"
                @click="removeRuleItem(item)"
              > - </i>
            </div>
          </div>
          <RuleItem
            :depth="depth + 1"
            @removeRuleNode="removeRuleNode"
            v-if="item.children?.length"
            :filterRuleConfig="item"
            ref="childRuleItem"
          />
        </div>
      </template>
    </el-form>
    <div class="add-item">
      <span class="horizontal-line"></span>
      <i class="i-icon ri-add-circle-fill" @click="insertRuleItem(null)"> + </i>
    </div>
    <div class="vertical-line">
      <p @click="updateUnit" class="rules-unit">
        {{ filterRules.unit === "0" ? "且" : "或" }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts" name="RuleItem">
import {
  reactive,
  toRefs,
  nextTick,
  watch,
  ref,
  type PropType
} from 'vue'
import type { Rule } from './type'

const treeForm = ref(null)
const childRuleItem = ref()
const emit = defineEmits(['insertRuleNode', 'removeRuleNode'])
const props = defineProps({
  filterRuleConfig: {
    type: Object as PropType<Rule>,
    default: () => {
      return {}
    }
  },
  depth: {
    type: Number,
    default: 1
  }
})

const state = reactive({
  filterRules: props.filterRuleConfig
})

watch(
  () => props.filterRuleConfig,
  (newVal) => {
    state.filterRules = newVal
    nextTick(() => {
      calculateLineHeight()
    })
  },
  { deep: true }
)

/**
 * 新增规则节点
 * @param { Object | null } ruleItem 若存在指定节点则在指定节点中添加，不存在则向根节点添加
 */
function insertRuleItem (ruleItem: null | Rule) {
  if (!ruleItem) {
    (state.filterRules.children || []).push({
      filedValue: '',
      id: String(Math.random()),
      unit: '0',
      depth: props.depth + 1
    })
  } else {
    ruleItem.children =
      ruleItem.children && ruleItem.children.length
        ? ruleItem.children
        : [
          {
            ...ruleItem,
            id: String(Math.random()),
            depth: ruleItem.depth + 1
          }
        ]
    ruleItem.children.push({
      filedValue: '',
      id: String(Math.random()),
      unit: '0',
      depth: ruleItem.depth + 1
    })
    ruleItem.filedValue = ''
  }
  nextTick(() => {
    calculateLineHeight()
  })
}

/**
 * 移除规则节点
 */
function removeRuleItem (ruleItem: Rule) {
  emit('removeRuleNode', ruleItem)
}

function removeRuleNode (node: Rule) {
  emit('removeRuleNode', node)
}

/**
 * 修改操作符 且和或切换
 */
function updateUnit () {
  if (state.filterRules.unit === '0') {
    state.filterRules.unit = '1'
  } else {
    state.filterRules.unit = '0'
  }
}

nextTick(() => {
  calculateLineHeight()
})

/**
 * 重新计算纵向线条top点具体位置
 */
function calculateLineHeight () {
  const verticalLine = document.querySelectorAll('.vertical-line')
  for (let i = 0; i < verticalLine.length; i++) {
    const parentNode = verticalLine[i].parentNode as HTMLElement
    const firstSelectLabelRow = parentNode.children[0].children[0]
    const hasWraper = Array.from(firstSelectLabelRow.children).find(
      (o) => o.className === 'rulers-select-wraper'
    ) as HTMLElement
    if (hasWraper) {
      (verticalLine[i] as HTMLElement).style.top =
        hasWraper.clientHeight / 2 + 'px'
    } else {
      (verticalLine[i] as HTMLElement).style.top = '17px'
    }
  }
}
const { filterRules } = toRefs(state)
</script>
<style lang="scss">
.rulers-select-wraper-nodata {
  p {
    text-align: center;
    color: #999;
    font-size: 12px;
  }
}

.rulers-select-wraper {
  position: relative;
  .select-label-row {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    .el-input {
      font-size: 12px;
      color: #81a2f8;
      width: 160px;
      .el-input__wrapper {
        box-shadow: none;
        border: 2px solid #81a2f8;
        &:hover {
          border-color: #567ced;
        }
      }
      .el-input__inner {
        cursor: pointer;
        height: 28px;
      }
    }
  }
  .vertical-line {
    position: absolute;
    width: 2px;
    background: #81a2f8;
    top: 17px;
    bottom: 20px;
  }
  .add-item {
    height: 41px;
    display: flex;
    align-items: center;
  }
  .horizontal-line {
    display: block;
    width: 30px;
    height: 2px;
    background: #81a2f8;
  }
  .rules-unit {
    width: 21px;
    height: 21px;
    background: #567ced;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 21px;
    position: absolute;
    top: 50%;
    left: -8px;
    margin-top: -12px;
    z-index: 9;
    cursor: pointer;
  }
  .input-select-data {
    display: flex;
    align-items: center;
    .icon-list {
      margin-left: 8px;
    }
  }
  .i-icon {
    color: #567ced;
    font-size: 22px;
    margin-right: 6px;
    margin-left: -2px;
    cursor: pointer;
    transition: 0.3s;
    &:active {
      opacity: 0.6;
    }
  }
}
</style>

<style lang="scss">
.el-form-item__content {
  margin-left: 0 !important;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
