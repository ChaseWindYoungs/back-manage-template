<template>
  <div class="add-rule-item-content">
    <div class="add-rule-btn" @click="insertRuleItem">
      <i class="i-icon ri-add-circle-fill"></i>
      <div>添加过滤条件</div>
    </div>
    <div class="rule-tree-view">
      <RuleItem
        ref="childRuleItem"
        @removeRuleNode="removeRuleNode"
        :depth="1"
        :filterRuleConfig="filterRuleConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="RuleTree">
import RuleItem from './RuleItem.vue'
import { ref, type PropType } from 'vue'
import type { Rule } from './type'

const childRuleItem = ref()
const props = defineProps({
  filterRuleConfig: {
    type: Object as PropType<Rule>,
    default: () => {
      return {}
    }
  }
})

const filterRuleConfig = ref(JSON.parse(JSON.stringify(props.filterRuleConfig)))

/**
 * 添加过滤条件
 */
function insertRuleItem () {
  if (!filterRuleConfig.value.children?.length) {
    filterRuleConfig.value = {
      filedValue: '',
      id: String(Math.random()),
      unit: '0',
      depth: 1,
      children: [
        {
          filedValue: '',
          id: String(Math.random()),
          unit: '0',
          depth: 2
        }
      ]
    }
  } else {
    filterRuleConfig.value.children.push({
      filedValue: '',
      id: String(Math.random()),
      unit: '0',
      depth: 2
    })
  }
}

/**
 * 移除指定的规则节点
 * @param { Object } node 需要移除的指定节点
 */
function removeRuleNode (node: Rule) {
  function findTargetNode (target: Rule, source: Rule) {
    if (source.children) {
      for (let i = 0; i < source.children.length; i++) {
        if (source.children[i].id === target.id) {
          source.children.splice(i, 1)
          if (source.children.length === 1) {
            source.filedValue = source.children[0].filedValue
            // 不处于第一层级的节点不能单个展示
            if (
              source.depth !== 1 ||
            (source.children[0].children && source.children[0].children.length)
            ) {
              source.children = source.children[0].children || undefined
            }
          }
          return
        }
        if (source.children[i].children?.length) {
          findTargetNode(target, source.children[i])
        }
      }
    }
  }
  findTargetNode(node, filterRuleConfig.value)
}

function getNodeRuleTreedata () {
  return filterRuleConfig.value
}

defineExpose({
  getNodeRuleTreedata
})
</script>
<style scoped lang="scss">
.add-rule-item-content {
  .add-rule-btn {
    color: #6b8ff4;
    display: inline-flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    margin-bottom: 10px;
    i {
      font-size: 18px;
      margin-right: 6px;
      position: relative;
      top: 1px;
    }
  }
  .rule-tree-view {
    padding: 0 12px;
  }
}
</style>
