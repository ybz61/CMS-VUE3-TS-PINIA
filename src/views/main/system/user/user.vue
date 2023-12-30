<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userSearch from './cpns/user-search.vue'
import userContent from './cpns/user-content.vue'
import UserModal from './cpns/user-modal.vue'

// 对 userContent 组件的操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any = {}) {
  // console.log('[ query-click ] >')
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  // console.log('[ reset-click ] >')
  contentRef.value?.fetchUserListData()
}
// 对 modal 组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  // console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
