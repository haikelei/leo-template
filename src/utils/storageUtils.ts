import { UserInfo } from '@/types';

export const setUserInfo = (userInfo: UserInfo) => {
  uni.setStorageSync('userInfo', userInfo);
};
export const getUserInfo = (): UserInfo => {
  return uni.getStorageSync('userInfo');
};
