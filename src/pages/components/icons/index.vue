<template>
  <div class="icon-page">
    <h3>所有图标</h3>
    <div class="all-icons">
      <div class="icon-item" v-for="item in iconNames" :key="item">
        <SvgIcon className="icon" :iconClass="item.includes('') ? item.replaceAll(' ', '') : item" />
        <p class="min-h-40">{{ item.includes("") ? item.replaceAll(" ", "") : item }}</p>
      </div>
    </div>
    <h3>自定义图标</h3>
    <div class="flex mt-15 ml-40">
      <SvgIcon className="icon" class="w-40! h-40! mr-90" iconClass="dim_place" />
      <SvgIcon className="icon" class="w-40! h-40! " iconClass="vue" />
    </div>
    <p class="mt-10 mb-40"> 可以在 vite.config.ts中找到 createSvgIconsPlugin 配置项，配置iconDirs路径，将图标添加到该路径内就可以使用自定义图标</p>
  </div>
</template>
<script setup name="icons" lang="ts">
/**
 * icons
 */
import { ref } from "vue";
import iconNames from "./iconNames";
</script>
<style lang="scss" scoped>
.icon-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.all-icons {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  // height: 40vh;
  overflow: auto;
  margin: 40px 0;
  .icon-item {
    cursor: pointer;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 4px 1px $primary;
    width: calc(10% - 20px);
    margin: 6px 10px ;
    padding: 4px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  svg {
    width: 40px;
    height: 40px;
  }
}
</style>
