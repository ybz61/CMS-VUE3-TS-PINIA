<template>
  <div class="main_menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :collapse="isFold"
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <!-- 使用动态组件处理icon图标 -->
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                v-if="subItem.url != '/main/analysis/overview'"
                :index="subItem.id + ''"
                @click="handleItemClick(subItem)"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
// import type { IUserMenuRoot2 } from '@/types/login'
import { mapPathToMenu } from '@/utils/map-menus'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu
console.log('[ userMenu ] >', userMenu)

// 2.处理菜单点击事件
const router = useRouter()
function handleItemClick(item: any) {
  // console.log('[ item ] >', item)
  const url = item.url
  router.push(url)
}

// 3.ElMenu的默认菜单
const route = useRoute()
// const pathMenu = mapPathToMenu(route.path, userMenu)
// const defaultActive = ref(pathMenu ? String(pathMenu.id) : '')
// 思路：改用计算属性或者watchEffect
// 1.计算属性
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenu)
  return pathMenu ? String(pathMenu.id) : ''
})
// 2.watchEffect
// const defaultActive = ref()
// watchEffect(() => {
//   const pathMenu = mapPathToMenu(route.path, userMenu)
//   defaultActive.value = pathMenu ? String(pathMenu.id) : ''
// })
</script>

<style scoped lang="less">
.main_menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
    // background-color: #0a60bd;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
