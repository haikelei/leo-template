import { defineStore } from 'pinia';
import type { User } from './helper';
import { getLocalSetting, setLocalSetting } from './helper';

export const useUserStore = defineStore({
  id: 'user-store',

  state: (): User => getLocalSetting(),
  actions: {
    setUser(user: User | null) {
      if (user) {
        this.phone = user.phone;
        this.token = user.token;
        this.name = user.name;
      } else {
        this.phone = '';
        this.token = '';
        this.name = '';
      }
      this.recordState();
    },

    recordState() {
      setLocalSetting(this.$state);
    }
  }
});
