<template>
  <view class="index-page">
    <view class="u-form-group">
      <u-input
        :border="true"
        type="number"
        v-model="phone"
        placeholder="请输入手机号"
        maxlength="11"
        confirm-type="done"
        clearable
      />
    </view>
    <view class="u-form-group flex flex-row">
      <u-input
        class="flex-1"
        :border="true"
        type="number"
        v-model="code"
        placeholder="请输入验证码"
        maxlength="6"
        confirm-type="done"
        clearable
        right-icon="send"
        @iconClick="sendCode"
      />
      <view class="w-28 flex flex-row justify-end">
        <button type="primary" size="mini" @click="sendCode">
          {{ countdown !== 0 ? `${countdown}s` : '发送验证码' }}
        </button>
      </view>
    </view>
    <text class="text-sm text-gray-600" v-if="showCode">验证码: 123456</text>
    <u-button @click="login">登录</u-button>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { useUserStore } from '@/store';

const phone = ref('');
const code = ref('');
const countdown = ref(0);
const showCode = ref(false);

const sendCode = () => {
  if (phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    });
  } else if (countdown.value !== 0) {
    uni.showToast({
      title: '请稍后再试',
      icon: 'none'
    });
  } else {
    // 此处应有真正的发送验证码操作
    console.log('验证码已发送至：' + phone.value);

    // 开始倒计时，例如60秒
    countdown.value = 60;
    showCode.value = true;
    const intervalId = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value === 0) {
        showCode.value = false;
        clearInterval(intervalId);
      }
    }, 1000);
  }
};

// 模拟登录的函数
const login = () => {
  if (phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    });
  } else if (code.value.length !== 6) {
    uni.showToast({
      title: '请输入正确的验证码',
      icon: 'none'
    });
  } else {
    // 此处应有真正的登录操作
    const userInfo = {
      phone: phone.value,
      name: '陆磊磊',
      token: 'asdfghjklzxcvbnm'
    };
    const userStore = useUserStore();
    userStore.setUser(userInfo);
    uni.$emit('onGetResult', {
      data: userInfo
    });
    uni.showToast({
      title: '登录成功'
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1000);
  }
};
</script>

<style scoped>
.index-page {
  padding: 20px;
}

.u-form-group {
  margin-bottom: 20px;
}
</style>
