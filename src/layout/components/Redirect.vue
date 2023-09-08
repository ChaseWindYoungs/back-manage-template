
<script setup name="Redirect" lang="ts">
/**
 * redirect
*/
import { unref } from "vue";
import { useRouter } from "vue-router";

const { currentRoute, replace } = useRouter();
const { params, query } = unref(currentRoute);
const { path } = params;
const _path = Array.isArray(path) ? path.join("/") : path;
console.log('path', path)
replace({
  path: "/" + _path,
  query
});
</script>
<template>
  <div />
</template>