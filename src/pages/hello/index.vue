<template>
  <view>
    <view class="u-page">
      <!-- 所有内容的容器 -->
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const current = ref(0);
const list = ref([
  {
    iconPath: 'home',
    selectedIconPath: 'home-fill',
    text: '首页',
    show: false,
    count: 2,
    isDot: true,
    customIcon: false
  }
]);
</script>

<style scoped></style>
