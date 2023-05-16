import { UserInfo } from '@/types';
import Utils from '@/utils/tmsdk.js';
import { isTMH5Environment } from '@/utils/tmUtils';
import { useUserStore } from '@/store';

export const isLogin = () => {
  const userInfo = uni.getStorageSync('userInfo');
  return !!userInfo.token;
};

export const getUserInfo = (needLogin = false): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    if (!isTMH5Environment()) {
      reject(new Error('当前平台不支持getUserInfo'));
      return;
    }
    Utils.jsdk((obj: any) => {
      console.log('jsdk', obj);
      if (obj.session_id) {
        resolve({
          name: obj.nick_name,
          phone: obj.mobile,
          token: obj.session_id
        });
      } else {
        reject(new Error('当前平台没有session_id'));
      }
    }, needLogin);
    // #endif

    // #ifdef MP
    const userStore = useUserStore();
    if (userStore.token) {
      resolve(userStore.$state);
    } else if (needLogin) {
      uni.navigateTo({
        url: '/pages/login/index'
      });
      reject(new Error('当前用户未登录,跳转到登录页面'));
    } else {
      resolve({} as UserInfo);
    }
    // #endif

    // #ifndef H5 || MP
    reject(new Error('当前平台不支持getUserInfo'));
    // #endif
  });
};

export const setUserInfo = (userInfo: UserInfo) => {
  // #ifdef MP
  const userStore = useUserStore();
  userStore.setUser(userInfo);
  // #endif
};
