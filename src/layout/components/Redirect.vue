<script setup name="Redirect" lang="ts">
/**
 * redirect
 */
import { unref, onMounted, onActivated } from "vue";
import { useRouter } from "vue-router";

const { currentRoute, replace } = useRouter();
const { params, query } = unref(currentRoute);
// let _path = ref('')
function handleredirect() {
  const { path } = params;
  const _path = Array.isArray(path) ? path.join("/") : path;
  replace({
    path: "/" + _path,
    query,
  });
}

onMounted(() => {
  handleredirect()
})

onActivated(() => {
  handleredirect()
})

</script>
<template>
  <div />
</template>
