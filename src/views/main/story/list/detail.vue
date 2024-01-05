<template>
  <div class="detail" v-loading="isLoading">
    <div class="title">标题：{{ storyDetail.title }}</div>
    <div class="time_create">创建时间：{{ formatUTC(storyDetail.cteateUp) }}</div>
    <div class="content" v-html="storyDetail.content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useStoryStore from '@/store/main/story/story'
import { formatUTC } from '@/utils/format'

const $route = useRoute()
const storyId = ref($route.query.id)
const storyStore = useStoryStore()
const { storyDetail, isLoading } = storeToRefs(storyStore)
console.log('[ storyId ] >', storyId.value)
if (storyId.value !== null) {
  storyStore.getStoryDetailAction(+storyId.value)
}
</script>

<style scoped lang="less">
.detail {
  // color: red;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  background: #ffffff;
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;

    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
  .time_create {
    font-size: 1.5rem;
    color: #999999;
    margin-bottom: 1rem;
  }
  .content {
    font-size: 1.5rem;
    color: #333333;
    line-height: 2.5rem;
    // text-indent: 2rem;
    text-align: justify;
  }
}
</style>
