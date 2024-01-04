<template>
  <div class="chat">
    <!-- 1、标题 -->
    <div class="chat_title">
      <el-form :model="form" size="large">
        <el-form-item label="标题：">
          <el-input v-model="form.title" placeholder="请输入您的故事标题" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 2、编辑器 -->
    <!-- https://www.wangeditor.com/ -->
    <page-editor v-model="editorHtml" />
    <!-- 3、按钮 -->
    <div class="chat_btn">
      <el-button icon="Refresh" class="btn_reset" @click="refreshEditor"> 重置 </el-button>
      <el-button icon="Search" type="primary" class="btn_submit" @click="sumbitEditor">
        提交
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useStoryStore from '@/store/main/story/story'
import pageEditor from '@/components/page-editor/page-editor.vue'

const form = reactive({
  title: ''
})
const editorHtml = ref<string>()

// 重置
const refreshEditor = () => {
  console.log('refreshEditor')
  form.title = ''
  editorHtml.value = ''
}
// 提交
const storyStore = useStoryStore()
const sumbitEditor = () => {
  console.log('sumbitEditor')
  storyStore
    .createNewStoryAction({
      title: form.title,
      content: editorHtml.value
    })
    .then(() => {
      refreshEditor()
    })
}
</script>

<style scoped lang="less">
.chat {
  .chat_btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .btn_reset {
      margin-right: 20px;
    }
  }
}
</style>
