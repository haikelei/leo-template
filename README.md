# LEO-潮新闻小程序跨平台框架

## 技术选型

### 架构: uni-app + Vue3 + TypeScript + Vite

### UI框架: uni-app内置组件 uView

### 状态管理: Pinia

### CSS框架: Unocss

## 框架介绍

### uni-app:

一个基于Vue.js的多端开发框架，可以快速创建小程序、H5和App。注意默认组件使用的是uni-app的组件，而不是uView的组件。
[uni-app组件官方地址](https://uniapp.dcloud.net.cn/component/view.html#)

### Vue3:

最新的Vue.js版本，带来了更快的性能和更好的开发体验。

### TypeScript:

一种强类型的JavaScript超集，提供了更好的类型检查和代码提示。

### Vite:

一款基于ESM的开发服务器，可以实现快速的开发环境搭建和热更新。

### Pinia:

一个状态管理库，可以帮助我们更好地管理应用的状态，并提供更好的性能。

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

如果我们想要在`import`的时候 src 的路径简写成`@`，下面的就是配置 vite
的别名，[属性类型请查看 vite 文档](https://vitejs.cn/config/#resolve-alias)

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
