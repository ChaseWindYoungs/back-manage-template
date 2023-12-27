<template>
  <div class="login-page">
    <div class="login-container">
      <div class="title">
        <z-text event="pointer" eventRotation="5deg" depth=".15em">
          <p>IOT</p>
          <p class="small">Platform</p>
        </z-text>
      </div>

      <div class="login-box">
        <el-form ref="formRef" label-position="right" label-width="0" :model="form" :rules="rules" size="large">
          <el-form-item prop="username">
            <el-input v-model.trim="form.username" clearable placeholder="用户名" :prefix-icon="UserFilled" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="form.password" clearable placeholder="密码" :show-password="true" :prefix-icon="Lock" />
          </el-form-item>
          <el-button type="primary" @click="handleLogin" @keyup.enter="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="index">
/**
 * index
*/
import { ref, reactive, onBeforeMount, onBeforeUnmount } from 'vue';
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { cloneDeep } from "lodash-es";
import { useRouter } from 'vue-router';

const router = useRouter()
const form = reactive({
  username: '',
  platform: 'admin',
  password: ''
})
const formRef = ref()
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: ["blur", "change"], },],
  password: [{ required: true, message: "请输入密码", trigger: ["blur", "change"] }],
})

function handleLogin() {
  formRef.value.validate((valid) => {
    if (valid) {
      const obj = cloneDeep(form)
      console.log(obj)
      setTimeout(() => {
        localStorage.setItem('TOKEN', 'Test')
        ElMessage.success("登录成功")
        router.push('/')
      }, 1000);
    }
  })
}
function keyDown(e) {
  if (e.keyCode == 13) { //13是回车键的keycode
    handleLogin()
  }
}
onBeforeMount(() => {
  window.addEventListener('keydown', keyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyDown)
})


</script>
<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: 
    -webkit-gradient(
      linear, 
      left top, 
      right top, 
      from(rgba(255, 255, 255, 0)), 
      color-stop(40%, #fff), 
      color-stop(60%, #fff), 
      to(rgba(255, 255, 255, 0))
    ), 
    repeating-linear-gradient(
      -45deg, 
      transparent 0, 
      transparent 2.5em, 
      #cfd8dc 0, 
      #cfd8dc calc(2.5em + 1px)
    ), 
    repeating-linear-gradient(
      45deg, 
      transparent 0, 
      transparent 2.5em, 
      #cfd8dc 0, 
      #cfd8dc calc(2.5em + 1px)
    );
}
.login-container {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.title {
  color: rgba(47, 106, 216, 0.431);
  text-align: center;
  font-size: 25em;
  // position: absolute;
  // left: 50%;
  // top: 40%;
  // transform: translate(-50%, -40%);
  
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  

  p {
    padding: 0 60px;
  }

  :deep(.z-layer) {
    &:nth-child(4) {
      background: rgb(165 192 205 / 50%);
      border-radius: 20px;
    }
  }

  .small {
    font-size: 50px;
  }
}

// .z-layer:not(:first-child) {
//   color: #0072a7;
// }

.login-box {
  left: 50%;
  transform: translate(-50%, -55%);
  top: 55%;
  position: absolute;
  width: 350px;

  .el-button {
    width: 100%;
  }

  :deep(.el-input__wrapper) {
    background-color: rgba(181, 220, 240, 0.7) !important;
    box-shadow: 0 0 0 1px rgba(47, 106, 216) inset;

    .el-input__inner,
    .el-input__icon {
      color: rgba(47, 106, 216);
    }

    ::placeholder {
      color: rgba(47, 106, 216);
    }
  }
}</style>