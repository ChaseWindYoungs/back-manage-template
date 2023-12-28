<template>
  <el-drawer
    class="setting-drawer"
    v-model="visible"
    title="项目配置"
    :before-close="handleClose"
    :append-to-body="true"
    size="300"
  >
    <el-scrollbar>
      <div class="setting-content">
        <el-divider>{{ $t("setting.titleInterfaceFunctions") }}</el-divider>
        <div class="set-item">
          <p>{{ $t("setting.hsMenuSearch") }}</p>
          <SwitchCom :disabled="!setting.showAppHearder" v-model="setting.showAppSearch" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsUniqueOpened") }}</p>
          <SwitchCom :disabled="!setting.showVerticalNav" v-model="setting.uniqueOpened" />
        </div>

        <el-divider>{{ $t("setting.titleTags") }}</el-divider>
        <div class="set-item">
          <p>{{ $t("setting.hsShowTags") }}</p>
          <SwitchCom :disabled="!setting.showAppHearder" v-model="showTags" @change="setisShowTags" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsKeepAlive") }}</p>
          <SwitchCom :disabled="!showTags" v-model="keepAlive" />
        </div>

        <el-divider>{{ $t("setting.titleInterfaceDisplay") }}</el-divider>
        <div class="set-item">
          <p>{{ $t("setting.hsShowLogo") }}</p>
          <SwitchCom :disabled="!setting.showAppHearder" v-model="setting.showAppName" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsShowBreadCrumb") }}</p>
          <SwitchCom :disabled="!setting.showAppHearder" v-model="setting.showBreadCrumb" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsShowAppHearder") }}</p>
          <SwitchCom v-model="setting.showAppHearder" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsShowVerticalNav") }}</p>
          <SwitchCom v-model="setting.showVerticalNav" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsShowNavCollapse") }}</p>
          <SwitchCom v-model="setting.showNavCollapse" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsShowGrayColor") }}</p>
          <SwitchCom v-model="setting.showGreyColor" />
        </div>
        <div class="set-item">
          <p>{{ $t("setting.hsShowWeakColor") }}</p>
          <SwitchCom v-model="setting.showWeakColor" />
        </div>
        <el-divider>{{ $t("setting.titleEraseCache") }}</el-divider>
        <el-button type="danger" class="erase" @click="eraseCache()">
          <SvgIcon iconClass="export" />
          {{ $t("setting.hsEraseCache") }}
        </el-button>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>
<script setup lang="ts">
/**
 * SettingDrawer
 */
defineOptions({
  name: "SettingDrawer",
});
import { ref, computed } from "vue";
import SwitchCom from "@/components/SwitchCom.vue";
import { useAppStore, useAppStoreHook } from "@/store/modules/app";
import { useTagsStore } from "@/store/modules/tags";
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash-es";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const appStore = useAppStore();
const tagsStore = useTagsStore();
const { eraseSettingCache, greyChange, weakChange, setSettingVal, curCaseSet } = appStore;
const { curCase, setting } = storeToRefs(appStore);
const { setIsKeepAlive } = tagsStore;
const { showTags, keepAlive } = storeToRefs(tagsStore);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const visible = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});
const _setting = ref();
onMounted(() => {
  _setting.value = cloneDeep(setting);
});

function handleClose() {
  visible.value = false;
}

function handleGreyChange(val: boolean | undefined, key: string) {
  setSettingVal(val, key);
  greyChange(val);
}

function handleWeakChange(val: boolean | undefined, key: string) {
  setSettingVal(val, key);
  weakChange(val);
}

const router = useRouter();
function eraseCache() {
  eraseSettingCache();
  greyChange();
  weakChange();
  router.push({ path: "/" });
}

function setisShowTags(status) {
  if (!status) setIsKeepAlive(false);
}
</script>
<style lang="scss">
.setting-drawer {
  .el-drawer__body {
    padding: 0 !important;
  }

  .el-divider__text {
    font-size: 18px !important;
  }

  .setting-content {
    padding: 20px;
  }

  .set-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }

  .erase {
    width: 96%;
    margin: 0 2%;
    svg {
      margin-right: 5px;
    }
  }
}
</style>
