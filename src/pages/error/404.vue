<template>
  <div class="error-404">
    <div class="left-img">
      <img :src="srcImg"  alt="404 image" />
    </div>
    <div class="right-info">
      <p class="title">404</p>
      <p class="content">{{$t('status.404')}}</p>
      <el-button type="primary" class="btn">{{$t('status.backToHome')}}</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 404
*/
defineOptions({
  name: '404'
})

import { ref } from 'vue';
import { useRouter } from "vue-router";
import { getAssetsFile } from '@/utils/index.ts'
const srcImg = getAssetsFile('images/vue.svg');

</script>
<style lang="scss" scoped>
.error-404 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;  
  .left-img{
    width: 200px;
    margin-right: 20px;
    img{
      width: 100%;
    }
  }
  .right-info{
    width: 220px;
    .title{
      font-size: 40px;
      font-weight: bold;
    }
    .content {

    }
  }
}

</style>