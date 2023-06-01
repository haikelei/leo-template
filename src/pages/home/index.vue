<template>
  <view class="bg-amber-200 h-full">首页页面</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';

onLoad((query) => {
  console.log(query);
});
</script>
<style scoped></style>
