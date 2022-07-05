<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <template v-for="(item, index) in breadcrumbData" :key="index">
      <el-breadcrumb-item :to="{ path: item.path }">{{
        item.meta.title
      }}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item v-else>{{ item.meta.title }}</el-breadcrumb-item> -->
    </template>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const breadcrumbData = computed(() => {
  return route.matched.filter((item) => item.meta.title && item.meta.icon)
})
console.log(breadcrumbData)
</script>

<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>
