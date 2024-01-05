import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),

    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts']
        }
      }
    },
    // 关闭生成map文件 可以达到缩小打包体积
    sourcemap: false,
    // 关闭文件计算
    reportCompressedSize: false
  },
  // 配置静态资源路径
  base: './',
  // 配置代理
  // server: {
  //   proxy: {
  //     '/proxy': {
  //       target: 'https://hqk10.xyz:3000/api/v1', // 代理地址
  //       changeOrigin: true, // 是否跨域
  //       rewrite: (path) => path.replace(/^\/proxy/, '') // 将 /proxy 重写为空
  //     }
  //   }
  // }
})
