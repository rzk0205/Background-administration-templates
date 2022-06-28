<template>
  <div>
    <el-row>
      <el-col :span="4">
        <App-Navbar></App-Navbar>
      </el-col>
      <el-col :span="20">
        <App-Header></App-Header>
        <AppMain></AppMain>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import AppNavbar from './AppNavbar/index'
import AppHeader from './AppHeader/index'
import AppMain from './AppMain/index'
</script>
<style lang="scss" scoped></style>
