<template>
  <view class="index-page">
    <Hello />
    <view>
      <view>
        <button type="primary" size="mini" @click="goToPlatformAbility">
          跨平台能力展示
        </button>
      </view>
      <view>
        <button type="primary" size="mini" @click="goTo1">跳转到活动H5</button>
      </view>
      <view>
        <button type="primary" size="mini" @click="goTo2">
          跳转到原生活动
        </button>
      </view>
    </view>
    <text class="text-base"> 查看其它页面示例↓</text>
    <view>
      <navigator v-for="(v, idx) in pages" :key="idx" :url="v.url"
        >{{ v.title }}
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Hello from '@/components/hello/index.vue';
import { addParams } from '@/utils/urlUtils';

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
  }
]);

const goToPlatformAbility = () => {
  uni.navigateTo({
    url: '/pages/platformAbility/index'
  });
};
const goTo1 = () => {
  const url = addParams('/pages/webview/index', {
    link: 'https://act.thehour.cn/clockin/event/8'
  });
  uni.navigateTo({
    url
  });
};

const goTo2 = () => {
  uni.navigateTo({
    url: '/pages/smashEgg/index'
  });
};
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
