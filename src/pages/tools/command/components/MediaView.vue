<template>
  <div class="flex1 content-view w100% h100% grid" :class="{ [`grid-${size}`]: size }">
    <div
      v-for="(item, index) in size"
      :key="item"
      class="content-item"
      :class="{ active: activeIndex === index }"
      @click="setActiveIndex(index)"
      @contextmenu.prevent="openMenu(index, $event)"
      @dragstart="dragStart($event, { index, key: getItem(index) })"
      @dragover="dragovere($event, { index, key: getItem(index) })"
      @drop="dragEnd($event, { index, key: getItem(index) })"
      :draggable="getItem(index) ? true : false"
    >
      <LiveVideo v-if="getItem(index)" class="video-ref" :url="getItem(index)" ref="LiveVideoRef" />
    </div>

    <!-- 右键菜单按钮 -->
    <transition name="el-zoom-in-top">
      <ul
        v-show="showMenu"
        :key="Math.random()"
        class="context-menu"
        :style="menuPosition"
        ref="contextMenuRef"
      >
        <li
          v-for="(item, index) in mediaViewRightMenu"
          :key="index"
          @click="menuClick(item, index)"
        >
          <svg-icon class="wh20" :iconClass="item.icon" />
          <span>{{ item.name }}</span>
          <ul v-if="item.children" class="child-option">
            <li
              :class="{
                'active-option':
                  liveStatus[`live${capitalizeFirstLetter(option.key)}`] === option.value,
              }"
              v-for="option in item.children"
              :key="option.key"
              @click.stop="menuClick(option, index)"
            >
              {{ option.name }}
            </li>
          </ul>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script setup name="MediaView" lang="ts">
/**
 * MediaView
 */
import { ref, watch, nextTick } from "vue"
import { useBoolean } from "@/hooks/useBoolean"
import { useDraggable } from "@/hooks/useDraggable"
import { capitalizeFirstLetter } from "@/utils"
import { MenuItem, MediaItemType } from "../types"

const props = defineProps({
  size: Number,
  activeIndex: Number,
  mediaList: Array<MediaItemType>,
})
const emits = defineEmits(["changeActiveIndex", "changeDragInfo", "deleteMeida"])
const { bool: showMenu, toggle } = useBoolean()
const { dragStart, dragovere, dragEnd, dragInfo } = useDraggable()
const rightMenuIndex = ref(-1) // 用户记录当前右键点击
const mediaViewRightMenu = ref<Array<MenuItem> | []>([]) // 真正展示的右键菜单内容
const liveStatus = ref({
  liveRotate: "0", // 记录旋转角度
  liveTrasform: "0", // 记录镜像状态
  liveDisplay: false, // 记录图像比例
  liveSound: 1, // 记录图像增益
})
const videoMenuList: Array<MenuItem> = [
  { name: "关闭预览", key: "close", icon: "close_live" },
  { name: "查看详情", key: "details", icon: "txt_live" },
  {
    name: "角度旋转",
    key: "rotate",
    icon: "rotate_live",
    children: [
      { name: "原始", value: "0", key: "rotate" },
      { name: "90", value: "90", key: "rotate" },
      { name: "180", value: "180", key: "rotate" },
      { name: "270", value: "270", key: "rotate" },
    ],
  },
  {
    name: "镜面反转",
    key: "trasform",
    icon: "cope_live",
    children: [
      { name: "原始", value: "0", key: "trasform" },
      { name: "水平镜像", value: "90", key: "trasform" },
      { name: "垂直镜像", value: "180", key: "trasform" },
    ],
  },
  {
    name: "图像比例",
    key: "display",
    icon: "display_live",
    children: [
      { name: "原始比例", value: false, key: "display" },
      { name: "画面填充", value: true, key: "display" },
    ],
  },
  {
    name: "音量增益",
    key: "sound",
    icon: "volume_vibrate",
    children: [
      { name: "1倍", value: 1, key: "sound" },
      { name: "1.5倍", value: 1.5, key: "sound" },
      { name: "2倍", value: 2, key: "sound" },
    ],
  },
]
watch(
  () => dragInfo.value,
  newV => {
    if (newV?.start && newV?.end) {
      emits("changeDragInfo", newV)
    }
  },
  { deep: true, immediate: true }
)

function setActiveIndex(index) {
  showMenu.value = false
  emits("changeActiveIndex", index)
}

function getItem(index): string {
  let obj = null
  props.mediaList.length && (obj = props.mediaList.find(i => i.index === index))
  return obj?.url
}

function openMenu(index: number, event: MouseEvent): void {
  showMenu.value = false
  let _menuArr: Array<MenuItem> | [] = setMenusVideo(getItem(index))
  if (_menuArr.length === 0) return
  mediaViewRightMenu.value = _menuArr
  rightMenuIndex.value = index
  showMenu.value = true
  setContextmenuPosition(event)
}
const contextMenuRef = ref(null)
const menuPosition = ref({ left: "10px", top: "10px" })
function setContextmenuPosition(e: MouseEvent): void {
  nextTick(() => {
    const layerX = e.layerX // 点击在当前元素的位置X
    const layerY = e.layerY // 点击在当前元素的位置Y
    const offH = e.currentTarget.offsetHeight // 当前元素的高
    const offW = e.currentTarget.offsetWidth // 当前元素的宽
    const offT = e.currentTarget.offsetTop // 当前点击元素距父元素的top
    const offL = e.currentTarget.offsetLeft // 当前点击元素距父元素的width
    let top = 0,
      left = 0,
      menuH = contextMenuRef.value.offsetHeight,
      menuW = contextMenuRef.value.offsetWidth
    if (offH < menuH) {
      top = offH - menuH + offT
      left = offW - menuW + offL
      menuPosition.value = { left: `${left}px`, top: `${top}px` }
      return
    }
    // 判断方向
    top = offH - layerY > menuH ? layerY + offT : layerY + offT - menuH
    left = offW - layerX > menuW ? layerX + offL : layerX + offL - menuW
    menuPosition.value = { left: `${left}px`, top: `${top}px` }
  })
}

/**
 * list[mediaItem.key].hasAudio === '1' 表示只有音频
 * list[mediaItem.key].hasAudio === '2' 表示既有视频也有音频
 * list[mediaItem.key].hasAudio === '0' 表示都没有
 * 只有音频的不能旋转视图
 */
function setMenusVideo(mediaItem): MenuItem[] | [] {
  if (!mediaItem) return []
  const { hasAudio = "" } = mediaItem
  if (hasAudio === "1") {
    return videoMenuList.filter(item => !["rotate", "trasform", "display"].includes(item.key))
  }
  return videoMenuList
}

// 菜单点击
function menuClick(item, index) {
  const options = {
    rotate: { funCode: "drawRotate", key: "liveRotate", initVal: "0" },
    trasform: { funCode: "drawTrasform", key: "liveTrasform", initVal: "0" },
    display: { funCode: "setCover", key: "liveDisplay", initVal: false },
    sound: { funCode: "setGain", key: "liveSound", initVal: 1 },
  }
  switch (item.key) {
    case "close": {
      console.log(getItem(index))
      emits("deleteMeida", getItem(index))
      mediaViewRightMenu.value = []
      break
    }
    // case "details": {
    //   const { id, name, url, rtspUrl } = onContentDevice.value
    //   createLivePlayer(id, name, rtspUrl)
    //   break
    // }
    // case "rotate": {
    //   playerSetting(item, options, "rotate")
    //   break
    // }
    // case "trasform":
    // case "display": {
    //   playerSetting(item, options)
    //   break
    // }
    // case "sound": {
    //   playerSetting(item, options)
    //   break
    // }
  }
  showMenu.value = false
}
</script>
<style lang="scss" scoped>
.content-view {
  border: 1px solid #cccccc;
  position: relative;
}
.content-item {
  width: 100%;
  height: 100%;
  border: 1px solid #cccccc;
  position: relative;
  &.active {
    border-color: $primary;
    p {
      background-color: #772626;
    }
  }
  .content-box {
    width: 100%;
    height: 100%;
  }
}
.video-ref {
  width: 100% !important;
  height: 100% !important;
}

.grid-4 {
  grid-template-rows: repeat(2, 50%);
  grid-template-columns: repeat(2, 50%);
}
.grid-6 {
  grid-template-rows: repeat(3, 33.33%);
  grid-template-columns: repeat(3, 33.33%);
  .content-item {
    &:nth-child(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }
  }
}
.grid-8 {
  grid-template-rows: repeat(4, 25%);
  grid-template-columns: repeat(4, 25%);
  .content-item {
    &:nth-child(1) {
      grid-column: 1 / 4;
      grid-row: 1 / 4;
    }
  }
}
.grid-9 {
  grid-template-rows: repeat(3, 33.33%);
  grid-template-columns: repeat(3, 33.33%);
}

.context-menu {
  position: absolute;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.149);
  z-index: 99;

  li {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 6px 14px;
    span {
      display: inline-block;
      margin-left: 12px;
      width: 100%;
    }
    svg {
      color: $primary;
    }

    &:hover {
      color: $primary;
    }

    & > .child-option {
      position: absolute;
      left: 100%;
      top: 0;
      display: none;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.149);
      // background-color: opacity(1);
      width: 100%;
      color: #303133;
      li {
        display: block;
      }

      & > .active-option {
        background: $menuActiveBg;
        background-color: opacity(1);
        color: $menuActiveText;
      }
    }

    &:hover {
      color: $menuActiveText;
      background: $menuActiveBg;
      background-color: opacity(1);

      & > .child-option {
        display: block;
      }
    }
  }
}
</style>
