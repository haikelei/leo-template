export const isTMH5Environment = () => {
  return uni.getSystemInfoSync().ua.match(/zjolapp/gi);
};
