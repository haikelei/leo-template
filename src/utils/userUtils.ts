export const isLogin = () => {
  const userInfo = uni.getStorageSync('userInfo');
  return !!userInfo.token;
};
