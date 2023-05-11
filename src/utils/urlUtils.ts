/**
 * Add params to url
 * @param url
 * @param params
 */
export const addParams = (url: string, params: { [key: string]: string }) => {
  // 1. 判断 url 是否已经包含参数
  const hasParams = url.includes('?');
  // 2. 将参数拼接到 url 上
  const paramsStr = Object.keys(params).reduce(
    (result, key) => {
      // 判断key是link则encodeURIComponent
      if (key === 'link') {
        return `${result}${key}=${encodeURIComponent(params[key])}&`;
      }
      return `${result}${key}=${params[key]}&`;
    },
    hasParams ? '&' : '?'
  );
  return `${url}${paramsStr.slice(0, -1)}`;
};
