<template>
  <div class="list">
    <template v-for="item in storyList" :key="item.id">
      <page-comment :comment="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import pageComment from '@/components/page-comment/page-comment.vue'

import useStoryStore from '@/store/main/story/story'
import { storeToRefs } from 'pinia'

const storyStore = useStoryStore()
storyStore.postStoryListAction()
const { storyList } = storeToRefs(storyStore)
</script>

<style scoped lang="less"></style>
