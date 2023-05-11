<template>
  <view class="index-page">
    <Hello />
    <UnoCss />
    <view class="u-flex-row">
      <view>
        <button type="primary" size="mini" @click="goTo1">跳转到活动1</button>
      </view>
      <view>
        <button type="primary" size="mini" @click="goTo2">跳转到活动2</button>
      </view>
    </view>
    <text class="h2"> 查看其它页面示例↓ </text>
    <view>
      <navigator v-for="(v, idx) in pages" :key="idx" :url="v.url">{{
        v.title
      }}</navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Hello from '@/components/hello/index.vue'
import UnoCss from '@/components/unocss/index.vue'
import { addParams } from '@/utils/urlUtils'

const pages = reactive([
  {
    title: 'Pinia Demo',
    url: '/pages/pinia/index'
  },
  {
    title: 'Axios Demo',
    url: '/pages/axios/index'
  },
  {
    title: 'uView Demo',
    url: '/pages/uview/index'
  },
  {
    title: 'UnoCSS Demo',
    url: '/pages/unocss/index'
  }
])
const goTo1 = () => {
  const url = addParams('/pages/webview/index', {
    link: 'https://act.thehour.cn/clockin/event/8'
  })
  uni.navigateTo({
    url
  })
}

const goTo2 = () => {
  const url = addParams('/pages/webview/index', {
    link: 'https://h5.zjol.com.cn/material/qy_form/index.html?applyId=29&type=tmForm&nav_crystal=1&ref_aid=2419096#/noTm'
  })
  uni.navigateTo({
    url
  })
}
</script>

<style scoped>
.index-page {
  font-style: normal;
  text-align: center;
}
.h2 {
  color: green;
  font-size: 50rpx;
}
navigator {
  color: #1e80ff;
}
</style>
