import { getUserInfoStorage, setUserInfoStorage } from '@/utils/storageUtils';
import { UserInfo } from '@/types';
import Utils from '@/utils/tmsdk.js';

export const isLogin = () => {
  const userInfo = uni.getStorageSync('userInfo');
  return !!userInfo.token;
};

export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    Utils.jsdk((obj: any) => {
      console.log('jsdk', obj);
      if (obj.session_id) {
        resolve({
          name: obj.nick_name,
          phone: obj.mobile,
          token: obj.session_id
        });
      } else {
        reject('当前平台没有session_id');
      }
    }, true);
    // #endif

    // #ifdef MP
    resolve(getUserInfoStorage());
    // #endif

    // #ifndef H5 || MP
    reject('当前平台不支持getUserInfo');
    // #endif
  });
};

export const setUserInfo = (userInfo: UserInfo) => {
  // #ifdef MP
  setUserInfoStorage(userInfo);
  // #endif
};
