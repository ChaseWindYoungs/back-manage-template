<template>
  <div class="login-page">
    <SvgIcon className="icon" class="icon2" iconClass="icon2" />
    <div class="login-container">
      <!-- <div class="title">
        <z-text event="pointer" eventRotation="5deg" depth=".15em">
          <p>BMT</p>
          <p class="small">back-manage-template</p>
        </z-text>
      </div> -->

      <div class="login-box">
        <div class="title">
          <SvgIcon className="icon" class="" iconClass="logo" />
          <p>ToBe管理系统</p>
        </div>
        <el-form ref="formRef" label-position="right" label-width="0" :model="form" :rules="rules" size="large">
          <el-form-item prop="username">
            <el-input v-model.trim="form.username" clearable placeholder="用户名: admin" :prefix-icon="UserFilled" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              clearable
              placeholder="密码: 123456"
              :show-password="true"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item prop="verify">
            <div class="flex flex-items-center w100%">
              <el-input v-model.trim="form.verify" clearable placeholder="验证码" >
                <template #prefix>
                  <SvgIcon className="icon" iconClass="safetycertificate" class="w1em! h1em!" style="color: var(--primary);"/>
                </template>
              </el-input>
            <ImageVerify v-model:code="imgCode" />
            </div>
          </el-form-item>
          <div class="flex flex-items-center flex-justify-between">
            <el-checkbox>记住我</el-checkbox>
            <el-button link type="primary" >忘记密码？</el-button>
          </div>
          
          <el-button class="w-100%" type="primary" @click="handleLogin" @keyup.enter="handleLogin" :loading="loading">登 录</el-button>
        </el-form>
      </div>
    </div>
    <LoginBg :theme-color="bgThemeColor" />
  </div>
</template>
<script lang="ts" setup name="index">
/**
 * index
 */
import { ref, reactive, onBeforeMount, onBeforeUnmount, computed } from "vue";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash-es";
import { useRouter } from "vue-router";
import LoginBg from './LoginBg/index.vue'
import { getColorPalette, mixColor } from '@/utils/color';
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const bgThemeColor = computed(() => (appStore.theme ? getColorPalette('#1f74ff', 7) : '#1f74ff'));
const router = useRouter();
const form = reactive({
  username: "",
  password: "",
  verify: "",
});
const formRef = ref();
const loading = ref(false);
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: ["blur", "change"] }],
  password: [{ required: true, message: "请输入密码", trigger: ["blur", "change"] }],
  verify: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error('请输入验证码'));
        } else if (imgCode.value !== value) {
          callback(new Error('请输入正确的验证码'));
        } else {
          callback();
        }
      },
      trigger: ["blur", "change"]
    }
  ],
});
const imgCode = ref("");

function handleLogin() {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      const obj = cloneDeep(form);
      console.log(obj);
      setTimeout(() => {
        localStorage.setItem("TOKEN", "Test");
        ElMessage.success("登录成功");
        router.push("/");
        loading.value = false
      }, 1000);
    }
  })
}
function keyDown(e) {
  if (e.keyCode == 13) {
    //13是回车键的keycode
    handleLogin();
  }
}


onBeforeMount(() => {
  window.addEventListener("keydown", keyDown);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyDown);
});
</script>
<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: hwb(217 12% 0% / 0.08);

  // background-image:
  //   -webkit-gradient(
  //     linear,
  //     left top,
  //     right top,
  //     from(rgba(255, 255, 255, 0)),
  //     color-stop(40%, #fff),
  //     color-stop(60%, #fff),
  //     to(rgba(255, 255, 255, 0))
  //   ),
  //   repeating-linear-gradient(
  //     -45deg,
  //     transparent 0,
  //     transparent 2.5em,
  //     #cfd8dc 0,
  //     #cfd8dc calc(2.5em + 1px)
  //   ),
  //   repeating-linear-gradient(
  //     45deg,
  //     transparent 0,
  //     transparent 2.5em,
  //     #cfd8dc 0,
  //     #cfd8dc calc(2.5em + 1px)
  //   );
}
.login-container {
  right: 15%;
  top: 50%;
  transform: translate(0, -50%);
  position: absolute;
  background-color: #fff;
  border-radius: 20px;
  padding: 40px 30px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: 0 0 5px 1px rgba(31, 117, 255, 0.233);
  z-index: 99;
}

.login-box {
  width: 350px;
  .title {
    color: $primary;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    svg {
      width: 70px;
      height: 70px;
    }
    p {
      font-size: 28px;
    }
  }

  :deep(.el-input__wrapper) {
    background-color: rgba(248, 253, 255, 0.7) !important;
    box-shadow: 0 0 0 1px rgb(224, 224, 230) inset;

    .el-input__inner,
    .el-input__icon {
      color: rgba(47, 106, 216);
    }

    ::placeholder {
      color: rgba(47, 106, 216, 0.5);
    }
  }
}
:deep(.svg-icon) {
  z-index: 9
}
.icon1 {
  position: absolute;
  left: -2vw;
  bottom: -5vw;
  width: 25vw;
  height: 25vw;
}
.icon2 {
  position: absolute;
  left: 10%;
  top: 12%;
  width: 60%;
  height: 60%;
}
.icon3 {
  position: absolute;
  right: -5vw;
  top: -4vw;
  width: 25vw;
  height: 25vw;
}
</style>
