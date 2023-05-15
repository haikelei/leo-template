<template>
  <view class="w-full flex flex-col pt-4">
    <view class="w-[700rpx] flex flex-row flex-wrap gap-4">
      <view>
        <button size="mini" type="primary" @click="onClickGetUserInfo">
          getUserInfo
        </button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickLogin">Login</button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickLogout">
          Logout
        </button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickUA">获取UA</button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickJSSDK">JSSDK</button>
      </view>
    </view>
    <div class="break-words mt-4">
      登录状态: {{ isLogined ? '已登录' : '未登录' }}
    </div>
    <div class="break-words mt-4">用户信息: {{ message }}</div>
    <div class="break-words mt-4">UserAgent: {{ userAgent }}</div>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import { getUserInfo, setUserInfo } from '@/utils/storageUtils';
import Utils from '@/utils/tmsdk.js';

const userAgent = ref('');
const message = ref('');
message.value = JSON.stringify(getUserInfo());
onLoad((query) => {
  console.log(query);
});

const isLogined = computed(() => {
  return message.value !== '' && message.value !== '{}';
});

const onClickGetUserInfo = () => {
  console.log(getUserInfo());
};
// 模拟登录,3秒后存入存储
const onClickLogin = () => {
  uni.showLoading({
    title: '登录中'
  });
  setTimeout(() => {
    uni.hideLoading();
    setUserInfo({
      name: '张三',
      phone: '13888888888',
      token: '1234324qwertyyuudsafg'
    });
    message.value = JSON.stringify(getUserInfo());
    uni.showToast({
      title: '登录成功'
    });
  }, 2000);
};
const onClickLogout = () => {
  uni.showLoading({
    title: '退出中'
  });
  setTimeout(() => {
    uni.hideLoading();
    setUserInfo({} as any);
    message.value = JSON.stringify(getUserInfo());
    uni.showToast({
      title: '退出成功'
    });
  }, 2000);
};
const onClickUA = () => {
  console.log(uni.getSystemInfoSync().ua);
  userAgent.value = uni.getSystemInfoSync().ua;
};
const onClickJSSDK = () => {
  Utils.jsdk((obj: any) => {
    message.value = JSON.stringify(obj);
  }, true);
};
</script>
<style scoped></style>
