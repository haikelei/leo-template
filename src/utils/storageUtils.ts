import { UserInfo } from '@/types';
import uniapp from '@dcloudio/uni-cli-shared/dist/postcss/plugins/uniapp';

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
