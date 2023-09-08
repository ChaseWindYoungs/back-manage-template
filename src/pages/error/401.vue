<template>
  <div class="error-401">
    <div class="left-img">
      <img :src="srcImg"  alt="401 image" />
    </div>
    <div class="right-info">
      <p class="title">401</p>
      <p class="content">{{$t('status.401')}}</p>
      <el-button id="test" type="primary" class="btn">{{$t('status.backToHome')}}</el-button>
      <el-input v-model="test"></el-input>
    </div>
    
  </div>
</template>
<script setup lang="ts">
/**
 * 401
*/
defineOptions({
  name: '401'
})

import { ref } from 'vue';
import { useRouter } from "vue-router";
import { getAssetsFile } from '@/utils/index.ts'
import { onMounted } from 'vue';
const srcImg = getAssetsFile('images/vue.svg');
const test = ref('')
const isCollapse = ref(true)

onMounted(() => {
  const test = document.getElementById('test')
  test?.addEventListener('click', test1)
  test?.addEventListener('click', test2)
})


function test1() {
  console.log('test1')
}
function test2() {
  console.log('test2')
}

</script>
<style lang="scss" scoped>
.error-401 {
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
  }
}

</style>