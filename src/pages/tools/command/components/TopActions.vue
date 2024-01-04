<template>
  <div class="top-options mb-10 flex flex-items-center w100%">
    <div class="groups-tab flex flex-items-center overflow-auto">
      <el-tag
        v-for="(tag, index) in groups"
        :key="tag"
        size="large"
        :class="{ active: activeGroupIndex === index, 'mx-4': index > 0 }"
        :closable="index != 0"
        :disable-transitions="false"
        @close="handleDelete(tag, index)"
        @click="switchGroup(index)"
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        v-if="visible"
        ref="InputRef"
        maxlength="10"
        show-word-limit
        v-model="inputValue"
        class="tag-input w20"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
      />
      <svg-icon
        iconClass="add"
        class="svg mx-6px flex-shrink-0"
        title="新建分组"
        @click="showInput"
      />
    </div>
    <div class="ml-10 flex flex-items-center flex-shrink-0 w-200">
      <el-dropdown @command="switchSize" popper-class="commnad-size-select">
        <p class="flex flex-items-center">
          <svg-icon iconClass="linetree" class="w-20px h-20px"></svg-icon>
          <span class="ml-4px"> {{ size }}宫格 </span>
        </p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :class="{ active: size === i }"
              :command="i"
              v-for="i in sizeList"
              :key="i"
            >
              {{ i }}宫格
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="primary" class="ml-10" @click="clearActive">清屏</el-button>
    </div>
  </div>
</template>
<script setup name="TopActions" lang="ts">
/**
 * TopActions
 */
import { ref, nextTick, computed, getCurrentInstance } from "vue"
import { ElInput } from "element-plus"
import { useBoolean } from "@/hooks/useBoolean"
import { GroupType } from "../types"

const props = defineProps({
  groups: Array<GroupType>,
  activeGroupIndex: Number,
})
const emits = defineEmits(["switchSize", "deleteGroup", "addGroup", "switchGroup", "clearActive"])
const { proxy } = getCurrentInstance()
const sizeList: Array<number> = [1, 4, 6, 8, 9]
const { bool: visible, toggle } = useBoolean()
const inputValue = ref("")
const size = computed(() => {
  let _s = props.groups.length > 0 ? props.groups[props.activeGroupIndex]?.size : 4
  return _s
})

const InputRef = ref<InstanceType<typeof ElInput>>()
function handleDelete(tag: string, index: number) {
  proxy
    .$NoticeDialog({
      title: "删除？",
      content: "请确认要删除吗？",
    })
    .then(() => {
      emits("deleteGroup", { tag, index })
    })
    .catch()
}

// 清除当前群组播放调阅
function clearActive() {
  proxy
    .$NoticeDialog({
      title: "提示",
      content: "您确定要清屏吗？",
      btnWords: {
        submit: "确认",
        cancel: "取消",
      },
    })
    .then(() => {
      emits("clearActive")
    })
    .catch(e => {
      console.log("取消提交", e)
    })
}

function showInput() {
  toggle()
  nextTick(() => InputRef.value!.input!.focus())
}

function handleInputConfirm() {
  emits("addGroup", inputValue.value)
  toggle()
  inputValue.value = ""
}

function switchSize(val: number) {
  emits("switchSize", val)
}

function switchGroup(index) {
  emits("switchGroup", index)
}
</script>
<style lang="scss" scoped>
.groups-tab {
  width: calc(100% - 200px);
  .tag-input {
    margin-left: 10px;
    width: 210px !important;
    :deep(.el-input__wrapper) {
      width: 210px;
    }
  }
  .el-tag {
    cursor: pointer;
  }
  .active {
    background-color: $primary;
    color: $white;
    :deep(.el-tag__close) {
      color: $white;
    }
  }
  .svg {
    position: sticky;
    right: 0;
    width: 20px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
}
</style>
