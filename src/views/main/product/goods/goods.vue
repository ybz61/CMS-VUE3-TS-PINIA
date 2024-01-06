<template>
  <div class="goods">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #newPrice="scope">
        <span>
          {{ '￥' + scope.row.newPrice }}
        </span>
      </template>
      <template #oldPrice="scope">
        <span>
          {{ '￥' + scope.row.oldPrice }}
        </span>
      </template>
      <template #status="scope">
        <span>
          {{ scope.row.status === 1 ? '已上架' : '已下架' }}
        </span>
      </template>
      <template #imgUrl="scope">
        <el-image
          v-if="scope.row.imgUrl"
          style="width: 75px; height: 75px; border-radius: 5px"
          :src="scope.row.imgUrl"
          :preview-teleported="true"
          :zoom-rate="1.2"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
        <!-- <img
          :src="scope.row.imgUrl"
          alt=""
          style="width: 100px; height: 100px; border-radius: 5px"
        /> -->
      </template>
    </page-content>

    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 点击content, modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped lang="less">
.el-table__cell {
  .cell.el-tootip {
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
