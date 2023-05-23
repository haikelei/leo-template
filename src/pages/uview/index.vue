<template>
  <view>
    <button>默认按钮</button>
    <button type="primary">主要按钮</button>
    <button type="warn">警告按钮</button>
    <button type="default">危险按钮</button>
    <button size="default">江湖</button>
    <button size="mini">十年灯</button>
    <uni-badge class="uni-badge-left-margin" text="1" />
    <uni-badge class="uni-badge-left-margin" text="2" type="primary" />
    <uni-badge class="uni-badge-left-margin" text="34" type="success" />
    <uni-badge class="uni-badge-left-margin" text="45" type="warning" />
    <uni-badge class="uni-badge-left-margin" text="123" type="info" />
  </view>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('mounted');
});
</script>
