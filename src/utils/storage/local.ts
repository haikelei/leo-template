import { deCrypto, enCrypto } from '../crypto';

interface StorageData<T = any> {
  data: T;
  expire: number | null;
}

export function createLocalStorage(options?: {
  expire?: number | null;
  crypto?: boolean;
}) {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  const { expire, crypto } = {
    expire: DEFAULT_CACHE_TIME,
    crypto: true,
    ...options
  };

  function set<T = any>(key: string, data: T) {
    const storageData: StorageData<T> = {
      data,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    };

    const json = crypto ? enCrypto(storageData) : JSON.stringify(storageData);
    // #ifdef H5
    window.localStorage.setItem(key, json);
    // #endif
    // #ifdef MP
    uni.setStorageSync(key, json);
    // #endif
  }

  function get(key: string) {
    let json: string | null;
    // #ifdef H5
    json = window.localStorage.getItem(key);
    // #endif
    // #ifdef MP
    json = uni.getStorageSync(key);
    // #endif
    if (json) {
      let storageData: StorageData | null = null;

      try {
        storageData = crypto ? deCrypto(json) : JSON.parse(json);
      } catch {
        // Prevent failure
      }

      if (storageData) {
        const { data, expire } = storageData;
        if (expire === null || expire >= Date.now()) {
          return data;
        }
      }
      remove(key);
      return null;
    }
    return null;
  }

  function remove(key: string) {
    // #ifdef H5
    window.localStorage.removeItem(key);
    // #endif
    // #ifdef MP
    uni.removeStorageSync(key);
    // #endif
  }

  function clear() {
    // #ifdef H5
    window.localStorage.clear();
    // #endif
    // #ifdef MP
    uni.clearStorageSync();
    // #endif
  }

  return {
    set,
    get,
    remove,
    clear
  };
}

export const ls = createLocalStorage();

export const ss = createLocalStorage({ expire: null, crypto: false });
