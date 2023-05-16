<template>
  <view class="w-full flex flex-col pt-4 px-4">
    <view class="w-[700rpx] flex flex-row flex-wrap gap-4">
      <view>
        <button size="mini" type="primary" @click="onClickGetUserInfo">
          获取用户信息
        </button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickLogin">
          {{ isLogined ? '退出登录' : '登录' }}
        </button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickUA">获取UA</button>
      </view>
      <view>
        <button size="mini" type="primary" @click="onClickJSSDK">JSSDK</button>
      </view>
    </view>
    <view class="break-words mt-4 bg-gray-200 p-4">{{ message }}</view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, onMounted, ref } from 'vue';
import { getUserInfo, setUserInfo } from '@/utils/userUtils';

const message = ref('');
onLoad((query) => {
  console.log(query);
});

onMounted(() => {
  onClickGetUserInfo();
});

const isLogined = ref(false);

const onClickGetUserInfo = () => {
  getUserInfo(true)
    .then((userInfo) => {
      console.log('userInfo', userInfo);
      message.value = `用户信息: ${JSON.stringify(userInfo)}`;
      if (userInfo && userInfo.token) {
        isLogined.value = true;
      } else {
        isLogined.value = false;
      }
    })
    .catch((err) => {
      isLogined.value = false;
      console.log('err', err);
    });
};
// 模拟登录,3秒后存入存储
const onClickLogin = () => {
  if (isLogined.value) {
    uni.showLoading({
      title: '退出中'
    });
    setTimeout(() => {
      uni.hideLoading();
      setUserInfo({} as any);
      message.value = JSON.stringify('');
      isLogined.value = false;
      uni.showToast({
        title: '退出成功'
      });
    }, 1000);
  } else {
    uni.navigateTo({
      url: '/pages/login/index'
    });
    uni.$once('onGetResult', (data: any) => {
      onClickGetUserInfo();
      console.log('登录返回数据', data);
    });
  }
};
const onClickUA = () => {
  console.log(uni.getSystemInfoSync().ua);
  message.value = `UserAgent: ${uni.getSystemInfoSync().ua}`;
};
const onClickJSSDK = () => {
  // Utils.jsdk((obj: any) => {
  //   message.value = JSON.stringify(obj);
  // }, true);
};
</script>
<style scoped></style>
