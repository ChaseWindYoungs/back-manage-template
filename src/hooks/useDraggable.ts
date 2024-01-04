import { ref } from "vue";
import { cloneDeep } from "lodash-es"
interface dragInfoType{
  start: any
  end: any
}

export function useDraggable() {
  const dragInfo = ref<dragInfoType>(null);
  function dragStart(e, data) {
    // console.log('dragStart =======>',e, data)
    dragInfo.value = null
    e.dataTransfer.dropEffect = 'move';
    dragInfo.value['start'] = cloneDeep(data)
  }
  function dragovere(e, data) {
    // console.log('dragovere =======>',e, data)
    e.preventDefault();
    const effectStr = data.key ? 'none' : 'move';
    e.dataTransfer.effectAllowed = effectStr;
    e.dataTransfer.dropEffect = effectStr;
  }
  function dragEnd(e, data) {
    dragInfo.value['end'] = cloneDeep(data)
    console.log(dragInfo.value)
  }
  // 通过返回值暴露所管理的状态
  return {
    dragStart,
    dragovere,
    dragEnd,
    dragInfo
  };
}
