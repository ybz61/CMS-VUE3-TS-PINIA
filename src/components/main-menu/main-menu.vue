<template>
  <div class="main_menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>
    <div>
      <!-- 
        :default-active="defaultActive"
       -->
      <el-menu
        :collapse="isFold"
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
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="String(subItem.id)"
              @click="handleItemClick(subItem)"
            >
              {{ subItem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>

        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item>核心技术</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
// import type { IUserMenuRoot2 } from '@/types/login'

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
// const route = useRoute()
// const defaultActive = computed(() => {
//   const pathMenu = mapPathToMenu(route.path, userMenus)
//   return pathMenu.id + ''
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
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
