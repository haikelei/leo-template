<template>
  <view class="bg-blue-300 h-full">我的页面</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';

onLoad((query) => {
  console.log(query);
});
</script>
<style scoped></style>
