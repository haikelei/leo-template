import { ss } from '@/utils/storage';

const LOCAL_NAME = 'userSetting';

export interface User {
  phone: string;
  token: string;
  name: string;
}

export function defaultSetting(): User {
  return { phone: '', token: '', name: '' };
}

export function getLocalSetting(): User {
  const localSetting: User | undefined = ss.get(LOCAL_NAME);
  return { ...defaultSetting(), ...localSetting };
}

export function setLocalSetting(setting: User): void {
  ss.set(LOCAL_NAME, setting);
}
