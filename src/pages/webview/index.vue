<template>
  <view class="index-page">
    <web-view src="https://www.baidu.com"></web-view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

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
