import { UserInfo } from '@/types';

export const setUserInfoStorage = (userInfo: UserInfo) => {
  uni.setStorageSync('userInfo', userInfo);
};
export const getUserInfoStorage = (): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo && userInfo.token) {
      resolve(userInfo);
    } else {
      reject();
    }
  });
};
