<template>
  <view class="index-page">
    <web-view :src="link"></web-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const link = ref('')
onLoad((query) => {
  console.log(query)
  link.value = decodeURIComponent(query?.link || '')
})
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
