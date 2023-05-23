import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import App from './App.vue';
// 引入 uni-ui 组件和样式

// #ifdef H5
if (process.env.NODE_ENV === 'development') {
  import('vconsole').then((module) => {
    const vconsole = new module.default();
  });
}

// #endif

export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  return {
    app,
    // uni-app 官方文档示例 https://zh.uniapp.dcloud.io/tutorial/vue3-pinia.html#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-pinia
    Pinia // 此处必须将 Pinia 返回
  };
}
