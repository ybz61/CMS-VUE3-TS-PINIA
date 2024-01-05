<template>
  <router-link :to="{ name: 'Detail', query: { id: comment.id } }">
    <div class="page_comment" :data-id="comment.id">
      <div class="header">
        <div class="left">
          <div class="avatar">
            <img src="https://avatars.githubusercontent.com/u/87956309" alt="图片" />
          </div>
          <div class="title">标题：{{ comment.title }}</div>
        </div>
        <div class="time">{{ formatUTC(comment.createAt) }}</div>
      </div>
      <div class="content" v-html="comment.content"></div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { formatUTC } from '@/utils/format'

interface Prop {
  comment: {
    id: number
    title: string
    content: string
    enable: number
    createAt: string
    updateAt: string
  }
}

defineProps<Prop>()
</script>

<style scoped lang="less">
.page_comment {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 40px;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  .header {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      width: 80%;
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .title {
        margin-left: 10px;
        font-size: 16px;
        color: #333333;
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .time {
      width: 20%;
      font-size: 16px;
      color: #999999;
    }
  }
  .content {
    margin-top: 20px;
    font-size: 16px;
    color: #333333;
    text-align: justify;
    line-height: 1.5;
  }
}
</style>
