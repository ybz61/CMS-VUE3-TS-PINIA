import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// 0.针对ElMessage和ElLoading等组件引入样式
// 0.1.组件样式引入
import 'element-plus/theme-chalk/el-message.css'
/**
 * 0.2.使用 vite-plugin-style-import 和 consola 两个包
 *   * npm install vite-plugin-style-import consola -D
 *   * 在vite.config.ts中配置
 */

// 1.1.全局引入element-plus组件和样式
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 2.1.按需引入：用到哪一个组件再引入
// import { ElButton } from 'element-plus'
// 3.1.图标的全局注册
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 4.1
import registerIcons from './global/register_icons'

const app = createApp(App)

// 1.2
// app.use(ElementPlus)
// 2.2
// app.component(ElButton.name, ElButton)
// 3.2
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
// 4.2
app.use(registerIcons)

app.use(router)
app.use(pinia)
app.mount('#app')
