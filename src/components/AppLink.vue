<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { isExternal } from '@/utils'
import {useTagsStore} from '@/store/modules/tags'
import { storeToRefs } from "pinia";

const tagsStore = useTagsStore();
const { showTags } = storeToRefs(tagsStore);

const props = defineProps({
  to: {
    type: String,
    default: '',
    require: true
  },
  menuItem: {
    type: Object,
    default: () => {},
  }
})

const router = useRouter();
const route = useRoute();

function push() {
  router.push(props.to).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <a v-else @click="push">
    <slot />
  </a>
</template>