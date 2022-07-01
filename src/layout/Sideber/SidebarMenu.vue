<template>
  <el-menu
    active-text-color="#fff"
    background-color="#304156"
    default-active=""
    text-color="#bfcbd9"
    unique-opened
    router
  >
    <SidebarMenuItem
      v-for="item in menuList"
      :key="item"
      :menuList="item"
    ></SidebarMenuItem>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { filterMenuData } from '../../utils/menu'
import SidebarMenuItem from './SidebarMenuItem'
import { filterRouters, generateMenus } from '../../utils/router'
const router = useRouter()
// const data = [
//   {
//     path: '/profile',
//     name: 'profile',
//     meta: {
//       title: '个人中心',
//       icon: 'personnel'
//     },
//     children: []
//   },
//   {
//     path: '/chart',
//     name: 'chart',
//     meta: {
//       title: '数据可视化',
//       icon: 'chart'
//     },
//     children: []
//   },
//   {
//     path: '/user',
//     redirect: '/user/manage',
//     meta: {
//       title: '用户',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         name: 'userManage',
//         meta: {
//           title: '员工管理',
//           icon: 'personnel-manage'
//         },
//         children: []
//       },
//       {
//         path: '/user/role',
//         name: 'userRole',
//         meta: {
//           title: '角色列表',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         name: 'userPermission',
//         meta: {
//           title: '权限列表',
//           icon: 'permission'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     redirect: '/article/ranking',
//     meta: {
//       title: '文章',
//       icon: 'article'
//     },
//     props: {
//       default: false
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         name: 'articleRanking',
//         meta: {
//           title: '文章排名',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/create',
//         name: 'articleCreate',
//         meta: {
//           title: '文章创建',
//           icon: 'article-create'
//         }
//       }
//     ]
//   }
// ]

const menuList = computed(() => {
  const routes = filterRouters(router.getRoutes())
  return filterMenuData(generateMenus(routes))
})
</script>

<style scoped lang="scss"></style>
