/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_AXIOS_BASE_URL: string;
}

declare module '@/utils/tmsdk.js' {
  const TMSDK: any; // use 'any' if you're not sure what type to use
  export default TMSDK;
}
