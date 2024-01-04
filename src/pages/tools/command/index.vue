<template>
  <div class="command flex w100%">
    <div class="left-tree w-200px flex-shrink-0">
      <ul>
        <li @dblclick="nodeClick(item)" v-for="item in allEquipmentList" :key="item">
          {{ item.productName }} - {{ item.clientid }}
        </li>
      </ul>
    </div>
    <div class="right-video-box flex flex-col flex-items-start w100% h100%">
      <TopActions
        :groups="groups"
        :activeGroupIndex="activeGIdx"
        @switchSize="switchSize"
        @deleteGroup="deleteGroup"
        @addGroup="addGroup"
        @switchGroup="switchGroup"
        @clearActive="clearActiveScreen"
      />
      <MediaView
        :size="currentSize"
        :mediaList="activeMediaList"
        :activeIndex="activeMediaIndex"
        @changeActiveIndex="changeActiveMediaIndex"
        @changeDragInfo="changeMediaIndex"
        @deleteMeida="deleteMeida"
      />
    </div>
  </div>
</template>
<script setup name="index" lang="ts">
/**
 * index
 */
import { ref, onMounted, computed, getCurrentInstance } from "vue"
import { fetchGetDeviceList, fetchGetDeviceVideoPath } from "@/api/equipment"
import TopActions from "./components/TopActions.vue"
import MediaView from "./components/MediaView.vue"
import { isEmpty } from "@/utils/is"
import { allMediasType, MediaItemType, GroupType } from './types'

onMounted(() => {
  fetchGetDeviceList({ status: true, pageSize: 200 }).then(res => {
    if (res.list.length > 0) {
      allEquipmentList.value = res.list.filter(i => {
        return i.abilityList?.includes("VIDEO") || i.abilityList?.includes("AUDIO")
      })
    }
  })
})
let pid = 1
const { proxy } = getCurrentInstance()
const allEquipmentList = ref([])
const activeGIdx = ref(0)
const allMedias = ref<allMediasType>({})
const activeMediaIndex = ref(0)
const groups = ref<[GroupType]>([{ name: "默认分组", size: 4, pid: `tag${pid}` }])
const currentSize = computed(() => groups.value[activeGIdx.value].size)
const activedPid = computed(() => groups.value[activeGIdx.value].pid)
const activeMediaList = computed(() => allMedias.value[activedPid.value] || [])
function switchSize(size: number) {
  if (activeMediaList.value.length > size) {
    proxy
      .$NoticeDialog({
        title: "提示",
        content: `由${currentSize.value}宫格切换到${size}宫格会把多余的播放器关闭！`,
        btnWords: {
          submit: "确认",
          cancel: "取消",
        },
      })
      .then(() => {
        resetSizeAndMediaIndex(size)
      })
      .catch(e => {
        console.log("取消提交", e)
      })
  } else {
    resetSizeAndMediaIndex(size)
  }
}

function resetSizeAndMediaIndex(size: number) {
  allMedias.value[activedPid.value] = activeMediaList.value
    .map((i, idx) => {
      i.index = idx
      return i
    })
    .slice(0, size)
  groups.value[activeGIdx.value].size = size
  activeMediaIndex.value > size - 1 && (activeMediaIndex.value = size - 1)
}

function switchGroup(val) {
  activeGIdx.value = val
}

function deleteGroup({ tag, index }) {
  let _pid = groups.value.find(i => i === tag).pid
  delete allMedias.value[_pid]
  groups.value.splice(groups.value.indexOf(tag), 1)
  if (activeGIdx.value === index) {
    activeGIdx.value = index - 1
  } else {
    if (activeGIdx.value > index) {
      activeGIdx.value = activeGIdx.value - 1
    }
  }
}

function addGroup(val) {
  pid = pid + 1
  groups.value.push({ name: val || "新建分组", size: 4, pid: `tag${pid}` })
}

function nodeClick(item) {
  if (
    Object.keys(allMedias.value).length > 0 &&
    Object.keys(allMedias.value).find(i => i === activedPid.value)
  ) {
    let mediaArr: Array<MediaItemType> = allMedias.value[activedPid.value]
    if (mediaArr.length === currentSize.value) {
      ElMessage.warning("已无其他空位置播放视频")
      return
    }
    setPalyInfo(item).then((url: string)=> {
      if (!mediaArr.find(i => i.url === url)) {
        let flag = activeMediaList.value
          .map(i => i.index)
          .findIndex(i => i === activeMediaIndex.value)
        allMedias.value[activedPid.value].push({
          url: url,
          index: flag > -1 ? getNewIndex() : activeMediaIndex.value,
        })
      } else {
        ElMessage.warning("该视频已存在")
        return
      }
    })
  } else {
    setPalyInfo(item).then((url: string) => {
      allMedias.value[activedPid.value] = [{ url, index: activeMediaIndex.value}]
    })
  }
}

function setPalyInfo(item) {
  let url = ""
  return fetchGetDeviceVideoPath({ deviceId: item.clientid })
    .then(res => {
      if (!isEmpty(res)) {
        if (!res.isChannel && res.stream) {
          url = res.stream.mediaInfo.flv
        } else if (res.channelStreams.length > 0) {
          url = ""
          let arr = res.channelStreams.map(i => {
            return {
              value: i.stream.mediaInfo.flv,
              label: i.channelId,
            }
          })
          url = arr[0].value
        }
      }
      return Promise.resolve(url)
    })
    .catch(err => {
      console.log(err)
      ElMessage.error("获取流地址失败")
    })
}

function changeActiveMediaIndex(index) {
  activeMediaIndex.value = index
}

function changeMediaIndex({ start, end }) {
  allMedias.value[activedPid.value].forEach(i => {
    if (i.index === start.index) {
      i.index = end.index
      activeMediaIndex.value = end.index
      return
    }
  })
}

function deleteMeida(info) {
  allMedias.value[activedPid.value] = allMedias.value[activedPid.value].filter(
    i => i.index !== info.index
  )
}

function clearActiveScreen() {
  allMedias.value[activedPid.value] = []
}

// 找到可以插入的下标
function getNewIndex() {
  if (activeMediaList.value.length === 0) return 0
  let allIdxArr = Array.from({ length: currentSize.value }, (_, i) => i)
  let existArr = activeMediaList.value.map(i => i.index)
  let resetArr = allIdxArr.filter(i => !new Set(existArr).has(i))
  return resetArr[0]
}
</script>
<style lang="scss" scoped>
.command {
  width: calc(100% - 30px);
  height: calc(100vh - $heightFromTop - 40px);
  background-color: #fff;
  padding: 15px;
  margin: 15px;
  .right-video-box {
    width: calc(100% - 200px);
  }
}
</style>
