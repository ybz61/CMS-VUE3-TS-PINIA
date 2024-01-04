<template>
  <div class="page_editor">
    <div style="border: 1px solid #ccc">
      <!-- 1、工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <!-- 2、编辑器 -->
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, defineProps, defineEmits, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

interface Prop {
  modelValue?: string
  maxLength?: number
  height?: string
}

const props = withDefaults(defineProps<Prop>(), {
  modelValue: '',
  maxLength: 3000,
  height: '50vh'
})
const emits = defineEmits(['click', 'update:modelValue'])

// https://www.wangeditor.com/

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
// const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//   }, 1500)
// })

// 工具栏配置 Toolbar
const toolbarConfig = {
  toolbarKeys: [
    'bold',
    'italic',
    'underline',
    'through',
    'blockquote',
    'color',
    'bgColor',
    'fontSize',
    'fontFamily',
    'clearStyle',
    'headerSelect',
    'justifyLeft',
    'justifyRight',
    'justifyCenter',
    'justifyJustify',
    'codeBlock',
    'indent',
    'divider'
  ]
}
// 编辑器配置 Editor
const editorConfig = {
  placeholder: '请输入您的故事内容...',
  maxlength: props.maxLength // 限制最大字符数
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

watch(
  () => props.modelValue,
  () => {
    editorRef.value.setHtml(props.modelValue)
  }
)

//为了实时能拿到
const handleChange = () => {
  emits('update:modelValue', editorRef.value.getHtml())
}
</script>

<style scoped lang="less">
.page_editor {
  :deep(.w-e-text-placeholder) {
    // font-style: normal;
    line-height: 21px;
    height: 21px;
  }
}
</style>
