<template>
  <div class="navbar clearfix">
    <div class="navbar-left">
      <div class="hamburger" @click="diteHamburger">
        <span>
          <SvgIcon
            :icon="hamburgerStatus ? 'hamburger-opened' : 'hamburger-closed'"
          ></SvgIcon>
        </span>
      </div>
      <BreadcrumbVue></BreadcrumbVue>
    </div>
    <div class="navbar-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="40" :src="avatarUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="profile">课程主页</el-dropdown-item>
            <el-dropdown-item command="logout" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BreadcrumbVue from '@/components/Breadcrumb.vue'
import SvgIcon from '@/components/SvgIcon.vue'
const router = useRouter()
const store = useStore()
const hamburgerStatus = ref('true')
// 获取用户信息头像
const avatarUrl = computed(() => {
  return store.getters.userInfo.avatar
})
const handleCommand = (command) => {
  switch (command) {
    case 'home':
      handleToHome()
      break
    case 'logout':
      handleLogout()
      break
  }
}

const handleToHome = () => {
  router.push('/')
}

const handleLogout = async () => {
  try {
    await store.dispatch('user/logout')

    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}

const diteHamburger = () => {
  hamburgerStatus.value = !hamburgerStatus.value
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  padding: 0 15px 0 0;
  .navbar-left {
    float: left;
  }
  .navbar-right {
    float: right;
  }
  .el-dropdown {
    margin: 5px 10px 0 0;
  }
  .el-avatar {
    background: none;
  }
  .hamburger {
    float: left;
    // padding: 0 16px;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 20px;
  }
  .hamburger:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
