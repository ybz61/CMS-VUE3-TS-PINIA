/// <reference types="vite/client" />

// Vue文件的类型声明方式和由来
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
  interface IModalConfig {}
  export { IModalConfig }
}

declare module '*.mjs'
