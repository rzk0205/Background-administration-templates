<template>
  <div>
    <h1 class="sidebar-title">
      <img src="../.././assets/logo-small@2x.png" alt="" />
      usian-admin
    </h1>
    <sidebar-menu></sidebar-menu>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu'
</script>
<style lang="scss" scoped>
.sidebar-title {
  color: #fff;
  font-size: 20px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 22px 0;
  img {
    width: 44px;
    height: 44px;
    margin-right: 5px;
  }
}
</style>
