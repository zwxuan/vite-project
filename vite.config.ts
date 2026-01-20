import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { visualizer } from 'rollup-plugin-visualizer';
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    viteMockServe({ 
      mockPath: './src/mock', // mock文件夹路径默认是 src/mock
      enable: command === 'serve', // 仅在开发环境下启用
    }),
    // visualizer({ open: true }), // 添加 visualizer 插件，并配置为自动打开分析报告

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'), // 路径别名
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
      }
    }
  },
  server:{
    host:'0.0.0.0',
    proxy: {
      '/api/aspire': {
        target: 'https://localhost:8102',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/aspire/, '/api/')
      }
    }
  }
}))
