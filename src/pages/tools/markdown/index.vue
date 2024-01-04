<template>
  <div class="full-content">
    <div class="md-box" id="mdBox">
    <v-md-preview :text="text" ref="previewBox" class="preview-content"></v-md-preview>
    <div class="right-menu">
      <el-button class="flex flex-items-center flex-justify-right" type="primary" @click="handleExport(text)">导出文件</el-button>
      <div class="md-menu-tree-box">
        <el-tree
          v-if="titlesList.length > 0"
          :data="titlesList"
          node-key="lineIndex"
          :props="{
            children: 'children',
            label: 'title',
          }"
          :default-expanded-keys="['1']"
          @node-click="handleAnchorClick"
          :expand-on-click-node="false"
        />
      </div>
    </div>
  </div>
  </div>
  
</template>
<script setup name="MDFile">
/**
 * MDFile
 */
import { ref, onBeforeMount, nextTick, onMounted, onBeforeUnmount } from "vue"
// 将资源引入为字符串
// 资源可以使用 ?raw 后缀声明作为字符串引入
import mdFile from './promise.md?raw'

const text = ref("")
const titlesList = ref([])
const previewBox = ref()

function handleExport(val) {
  let eleLink = document.createElement("a")
  eleLink.download = `test.md`
  eleLink.style.display = "none"
  // 这里的data换成你想要导出的JavaScript对象
  let data = val
  let blob = new Blob([data], { type: "text/markdown" })
  eleLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

async function getAllTitles() {
  const anchors = previewBox.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6")
  const titles = Array.from(anchors).filter(title => !!title.innerText.trim())
  if (!titles.length) {
    titlesList.value = []
    return
  }
  await nextTick()
  titlesList.value = formatMenu(titles)
}

function handleAnchorClick(anchor) {
  console.log(anchor)
  const { lineIndex } = anchor
  const heading = previewBox.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`)
  console.log(previewBox.value)
  if (heading) {
    // Note: If you are using the preview mode of the editing component, the method name here is changed to previewScrollToTarget
    previewBox.value.scrollToTarget({
      target: heading,
      scrollContainer: document.getElementById("mdBox"),
      top: 60,
    })
  }
}
function formatMenu(titles) {
  let arr = genArrWithPid(titles)
  return menu2Tree(arr, 0)
}

/**
 * * 算法
 * * 为标题寻找并设置父级
 * * 通过两个arr实现
 */ 
function genArrWithPid(titles) {
  let arr = []
  let arr2 = []
  titles.forEach(i => {
    let id = i.getAttribute("data-v-md-line")
    let level = i.tagName.slice(1)
    let obj = {
      title: i.innerText,
      lineIndex: id,
      level,
    }
    if (arr.length > 0) {
      if (arr[arr.length - 1]["level"] >= level) {
        arr = arr.filter(_i => _i.level < level)
      }
      obj.pid = arr[arr.length - 1] ? arr[arr.length - 1]['id'] : 0
    } else {
      obj.pid = 0
    }
    arr.push({ id, level })
    arr2.push(obj)
  })
  return arr2
}

/**
 * * 算法
 * * 一维数组转为Tree
 * * 通过父id递归实现
 */ 
function menu2Tree(arr, pid) {
  return arr.reduce((res, current) => {
    if (current["pid"] === pid) {
      current.children = menu2Tree(arr, current["lineIndex"])
      return res.concat(current)
    }
    return res
  }, [])
}

// 读取md文件
async function setMdValue() {
  text.value = mdFile
  await nextTick()
  await getAllTitles()
}

function setMaxH(e) {
   let maxH = document.getElementById('mdBox').clientHeight - 80
   let box = document.querySelector('.md-menu-tree-box')
   box.style.maxHeight = `${maxH}px`
}

onMounted(() => {
  setMaxH()
  window.addEventListener('resize', setMaxH)
  setMdValue()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setMaxH)
})
</script>
<style lang="scss" scoped>
.md-box {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 15px;
  position: relative;
  overflow: auto;
  display: flex;
  :deep(.preview-content) {
    width: calc(100% - 300px);
    height: 100%;
  }
  .right-menu {
    width: 280px;
    position: fixed;
    right: 50px;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0px 0px 6px -2px var(--el-color-primary);
    .md-menu-tree-box {
      width: 100%;
      max-height: 570px;
      overflow: auto;
      padding: 10px 0;
      margin-top: 10px;
    }
    :deep(.el-tree) {
      .el-tree-node>.el-tree-node__children {
        overflow: auto;
      }
    }
  }
}
</style>
