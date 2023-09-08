<template>
  <div class="error-500">
    <div class="left-img">
      <img :src="srcImg"  alt="500 image" />
    </div>
    <div class="right-info">
      <p class="title">500</p>
      <p class="content">{{$t('status.500')}}</p>
      <el-button type="primary" class="btn">{{$t('status.backToHome')}}</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 500
*/
defineOptions({
  name: '500'
})

import { ref } from 'vue';
import { useRouter } from "vue-router";
import { getAssetsFile } from '@/utils/index.ts'
const srcImg = getAssetsFile('images/vue.svg');

</script>
<style lang="scss" scoped>
.error-500 {
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