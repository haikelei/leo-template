# LEO-雷欧

## 潮新闻小程序跨平台框架

## 技术选型

uni-app Vue3 + TypeScript + Vite + Pinia + Unocss 模板项目

支持跨平台小程序，H5

## 环境推荐

**Node >= 14.19**

**pnpm 7**

**Registry taobao - https://registry.npmmirror.com/**

## 本地启动

### 微信小程序

```sh
# 构建出产物
pnpm dev:mp-weixin
```

### H5

```sh
# CSR
pnpm dev:h5
# SSR
pnpm dev:h5:ssr
```

## 打包构建

### 微信小程序

```
pnpm build:mp-weixin
```

## 别名配置

如果我们想要在`import`的时候 src 的路径简写成`@`，下面的就是配置 vite 的别名，[属性类型请查看 vite 文档](https://vitejs.cn/config/#resolve-alias)

- `@` 代替 `./src`
- `@components`代替`./src/components`

```typescript
// vite.config.ts
export default defineConfig({
  // ......
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  }
})
```

例子：

```diff
// pages/index/index.vue
- import Hello from '../../components/hello/index.vue'
+ import Hello from '@/components/hello/index.vue'
// 或者
+ import Hello from '@components/hello/index.vue'
```

### ts

如果是使用 ts 开发，这样还不够，ts 不会识别路径的别名，显示找不到模块的报错，这个时候需要修改 `tsconfig.json` 文件，纠正下路径才可以。

```diff
// tsconfig.json
{
  // ......
  "compilerOptions": {
    // ......
+    "baseUrl": "./",
+    "paths": {
+      "@/*": ["src/*"],
+      "@components/*": ["src/components/*"]
    }
  },
}

```

添加 `baseUrl` 和 `paths` 参数，就可以完美解决编辑器的报错提示了！

## 原子化 css

- [unocss](https://github.com/unocss/unocss) - 即时按需原子 css 引擎
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) - 兼容小程序 unocss 预设

> 支持小程序，h5，app

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202211121156442.png)
