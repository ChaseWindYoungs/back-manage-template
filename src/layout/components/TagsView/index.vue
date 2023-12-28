<template>
  <div ref="containerDom" class="tags-view">
    <!-- 左侧箭头 -->
    <span v-show="isShowArrow" class="arrow-left">
      <el-icon @click="handleScroll()">
        <ArrowLeft />
      </el-icon>
    </span>
    <div ref="scrollbarDom" class="scroll-container">
      <div ref="tabDom" class="tags-list">
        <div
          ref="tagItemRef"
          v-for="(item, index) in multiTags"
          :key="index"
          class="tag-item"
          :class="{ active: route.name === item.name, 'content-menu-active': rightMenuIndex === index }"
          @click="goto(item, index)"
          @mouseenter.prevent="onMouseEnter(index)"
          @mouseleave.prevent="onMouseLeave"
          @contextmenu.prevent="openMenu(item, index, $event)"
        >
          <span class="title">{{ item.meta?.title ?? "" }}</span>
          <el-icon
            :class="{ 'show-icon': showCloseIcon(index, item) }"
            class="el-icon-close"
            @click.stop="handleDelete(item, index)"
          >
            <Close />
          </el-icon>
        </div>
      </div>
    </div>
    <span v-show="isShowArrow" class="arrow-right">
      <el-icon @click="handleScroll()">
        <ArrowRight />
      </el-icon>
    </span>
    <!-- 右侧功能按钮 -->
    <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
      <span v-show="isShowArrow" class="arrow-menu">
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 右键菜单按钮 -->
    <transition name="el-zoom-in-top">
      <ul v-show="visible" :key="Math.random()" class="contextmenu" :style="menuPosition" ref="contextmenuRef">
        <li
          v-for="(item, index) in tagsRightMenuFilter"
          :key="index"
          :class="{ disabled: item.disabled }"
          @click="menuItemClick(item, index)"
        >
          <component v-if="item.icon" :is="item.icon" />
          {{ item.text }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script setup lang="tsx">
/**
 * index
 */
defineOptions({
  name: "TagsView",
});
import { ref, reactive, computed, getCurrentInstance, watch, shallowRef, unref, nextTick } from "vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
import { useTagsStore } from "@/store/modules/tags";
import { useAppStore } from "@/store/modules/app";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import router from "@/router";
import {
  Refresh,
  Close,
  DArrowLeft,
  DArrowRight,
  Remove,
  CircleClose,
  FullScreen,
  Crop,
} from "@element-plus/icons-vue";
import { onClickOutside } from "@vueuse/core";
import { cloneDeep } from "lodash-es";
import { $toRef } from "vue/macros";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
const $I18n = useI18n();

const tagsStore = useTagsStore();
const appStore = useAppStore();
const { multiTags } = storeToRefs(tagsStore);
const { isContentFull } = storeToRefs(appStore);
const { changeContentFull } = appStore;
const route = useRoute();

const isShowArrow = computed(() => true);
const showCloseIcon = computed(() => {
  return (index, item) => {
    if (index === 0) return false;
    return item.name === route.name || activeIndex.value === index;
  };
});
const activeIndex = ref(0); // 用于处理icon展示
const currentIndex = ref(0); // 用于记录当前激活
const rightMenuIndex = ref(-1); // 用户记录当前右键点击
const contextmenuRef = ref(null);
const visible = ref(false);

const tagsRightMenu = [
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () => (
        <el-icon>
          <Refresh />
        </el-icon>
      ),
    }),
    flag: "refresh",
    text: $I18n.t("buttons.hsreload"),
    divided: false,
    disabled: false,
    show: true,
  },
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () => (
        <el-icon>
          <Close />
        </el-icon>
      ),
    }),
    flag: "current",
    text: $I18n.t("buttons.hscloseCurrentTab"),
    divided: false,
    disabled: false,
    show: true,
  },
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () => (
        <el-icon>
          <DArrowLeft />
        </el-icon>
      ),
    }),
    flag: "left",
    text: $I18n.t("buttons.hscloseLeftTabs"),
    divided: false,
    disabled: false,
    show: true,
  },
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () => (
        <el-icon>
          <DArrowRight />
        </el-icon>
      ),
    }),
    flag: "right",
    text: $I18n.t("buttons.hscloseRightTabs"),
    divided: false,
    disabled: false,
    show: true,
  },
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () => (
        <el-icon>
          <Remove />
        </el-icon>
      ),
    }),
    flag: "other",
    text: $I18n.t("buttons.hscloseOtherTabs"),
    divided: false,
    disabled: false,
    show: true,
  },
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () => (
        <el-icon>
          <CircleClose />
        </el-icon>
      ),
    }),
    flag: "all",
    text: $I18n.t("buttons.hscloseAllTabs"),
    divided: false,
    disabled: false,
    show: true,
  },
  {
    icon: shallowRef({
      name: "contextmenuIcon",
      render: () =>
        isContentFull.value ? (
          <el-icon>
            <Crop />
          </el-icon>
        ) : (
          <el-icon>
            <FullScreen />
          </el-icon>
        ),
    }),
    flag: "cur_full",
    text: "",
    divided: false,
    disabled: false,
    show: true,
  },
];
const tagsRightMenuFilter = ref([]);

function handleScroll() {
  console.log(333333);
}

function goto(item: { name: any }, index: number) {
  router.push({ name: item.name });
  currentIndex.value = index;
}
const currentSelect = ref({});
function openMenu(item: Object, index: number, event: MouseEvent) {
  rightMenuIndex.value = index;
  setContextmenuPosition(event);
  filterMenuList(index);
  currentSelect.value = item;
  nextTick(() => {
    visible.value = true;
  });
}

function handleDelete(item: any, index: number) {
  if (currentIndex.value === index) {
    let newItem = multiTags.value[index - 1];
    router.push({ name: newItem.name });
    currentIndex.value = index - 1;
  }
  tagsStore.handleTags("delete", item, "current");
}

function onMouseEnter(index: number) {
  if (index) activeIndex.value = index;
}
function onMouseLeave() {
  activeIndex.value = -1;
}

function handleCommand(command: any) {
  const { key, item } = command;
  // onClickDrop(key, item);
}

function initCurrentIndex(arr: any[]) {
  arr.forEach((tag, index) => {
    if (tag.name === route.name) {
      currentIndex.value = index;
    }
  });
}

const menuPosition = ref({ left: "10px", top: "10px" });
function setContextmenuPosition(e: MouseEvent) {
  let left = `${(e?.clientX ?? 0) + 10}px`;
  let top = `${(e?.clientY ?? 0) + 20}px`;
  menuPosition.value = { left, top };
}


function filterMenuList(index: number) {
  let arr = cloneDeep(tagsRightMenu);
  arr[6].text = isContentFull.value
    ? $I18n.t("buttons.hscontentExitFullScreen")
    : $I18n.t("buttons.hscontentFullScreen");
  if (index !== currentIndex.value) {
    arr[0].disabled = true;
    arr[6].disabled = true;
  }
  if (index === 0) {
    arr[1].show = false;
    arr[2].show = false;
  } else if (index === 1) {
    arr[2].show = false;
  }
  if (multiTags.value.length - 1 === index || multiTags.value.length === 1) {
    arr[3].show = false;
  }
  // 只有首页
  if (multiTags.value.length < 3) {
    arr[4].show = false;
    arr[5].show = false;
  }
  tagsRightMenuFilter.value = arr.filter((i: { show: any }) => i.show);
}

function menuItemClick(item: { disabled: any; flag: string }, key: number) {
  let cIdx = currentIndex.value;
  let rmIdx = rightMenuIndex.value;
  let cIdxItem = multiTags.value[rmIdx];
  if (item && item.disabled) return;
  if (item.flag === "refresh") {
    tagsStore.handleTags("refresh", cIdxItem);
    // 刷新路由
    nextTick(() =>{
      handleReFresh();
    })
    
    
  } else {
    if (item.flag === "cur_full") {
      changeContentFull();
    } else {
      if (item.flag === "current") {
        // 关闭当前
        if (cIdx === rmIdx) {
          let newItem = multiTags.value[rmIdx - 1];
          router.push({ name: newItem.name });
          currentIndex.value = rmIdx - 1;
        }
      } else if (item.flag === "left") {
        if (cIdx !== rmIdx && rmIdx > cIdx) {
          let newItem = cloneDeep(multiTags.value[rmIdx]);
          router.push({ name: newItem.name });
          currentIndex.value = rmIdx;
        }
        // 关闭左侧
      } else if (item.flag === "right") {
        // 关闭右侧
        router.push({ name: cIdxItem.name });
        currentIndex.value = rmIdx - 1;
      } else if (item.flag === "other") {
        // 关闭其他
        router.push({ name: cIdxItem.name });
        currentIndex.value = rmIdx - 1;
      } else if (item.flag === "all") {
        // 关闭其他
        router.push({ name: multiTags.value[0].name });
        currentIndex.value = 0;
      }
      tagsStore.handleTags("delete", cIdxItem, item.flag);
    }
  }
  nextTick(() => {
    closeMenu();
  });
}
// 刷新路由
function handleReFresh() {
  const { fullPath, query } = unref(route);
  router.replace({
    path: "/redirect" + fullPath,
    query,
  });
}

watch(
  () => multiTags.value,
  (newV) => initCurrentIndex(newV),
  { deep: true }
);
watch(
  () => route,
  (newV) => {
    currentIndex.value = multiTags.value.findIndex(
      (i: { name: RouteRecordName | null | undefined }) => i.name === newV.name
    );
  },
  { deep: true }
);

function closeMenu() {
  visible.value = false;
  rightMenuIndex.value = -1;
}

onClickOutside(contextmenuRef, () => {
  closeMenu();
});

onMounted(() => {
  initCurrentIndex(multiTags.value);
});
</script>
<style lang="scss" scoped>
.tags-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .arrow-left,
  .arrow-right,
  .arrow-menu {
    cursor: pointer;
    transition: all $transDuration;
    font-size: 18px;
    line-height: 18px;
    height: 38px;
    position: relative;
    width: 40px;
    text-align: center;

    &:hover {
      color: $primary;
    }

    .el-icon {
      height: 20px;
      left: 50%;
      position: absolute;
      transform: translate(-50%, 50%);
      width: 20px;
    }
  }

  .arrow-left {
    box-shadow: 6px 0 8px -4px #ccc;
  }

  .arrow-right {
    box-shadow: -6px 0 8px -4px #ccc;
  }

  .arrow-menu {
    border-left: 1px solid #a5a5a5;
  }

  .scroll-container {
    flex: 1;
    padding: 4px 6px;
  }

  .tags-list {
    display: flex;
    align-items: center;
  }

  .tag-item {
    cursor: pointer;
    padding: 4px 16px;
    border: 1px solid #ececec;
    border-radius: 4px;
    position: relative;
    display: flex;
    align-items: center;
    transition: all $transDuration;

    .title {
      font-size: 14px;
    }

    // &:first-child {
    //   padding-right: 6px !important;
    // }

    &:not(:last-child) {
      margin-right: 6px;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0;
      height: 0;
      border-bottom: 2px solid $primary;

      transition: all $transDuration;
    }

    &.active {
      color: $primary;
      padding-right: 20px;

      &::before {
        width: 100%;
      }
    }

    &:hover {
      color: $primary;
      padding-right: 20px;

      &::before {
        width: 100%;
      }
    }

    &.content-menu-active {
      border-bottom: 2px dashed $primary;
    }

    .el-icon-close {
      display: none;
      width: 16px;
      height: 16px;
      font-size: 10px;
      margin-left: 4px;
      transition: all $transDuration;
      position: absolute;
      right: 2px;
      top: 20%;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 16px;
      color: $primary;

      &:hover {
        font-size: 13px;
        color: #fff;
        background: #b4bccc;
        border-radius: 50%;
      }

      &.show-icon {
        display: flex;
      }
    }
  }

  .contextmenu {
    position: fixed;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.149);

    li {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      &:hover {
        color: $primary;
      }

      .el-icon {
        margin-right: 4px;
      }

      &.disabled {
        cursor: not-allowed;
        color: #a5a5a5;
      }
    }
  }
}
</style>
