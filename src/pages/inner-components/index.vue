<template>
  <view class="flex max-w-full flex-col p-4">
    <view class="flex self-center mt-4">
      <image class="w-24 h-24" src="/static/logo.png"></image>
    </view>
    <view class="text-base mt-4 mb-2">
      <text>uni-app内置组件，展示样式仅供参考</text>
    </view>
    <view v-for="(item, index) in list" :key="item.id">
      <view
        class="flex flex-row justify-between h-12s bg-neutral-100 mt-1 p-2"
        :class="item.open ? 'uni-panel-h-on' : ''"
        @click="triggerCollapse(index, item.id)"
      >
        <text class="uni-panel-text">{{ item.name }}</text>
        <uni-icons
          :type="item.open ? 'top' : 'bottom'"
          size="16"
          color="#888888"
        ></uni-icons>
      </view>
      <view class="uni-panel-c" v-if="item.open">
        <view
          :class="{
            'left-win-active':
              leftWinActive === (item2.url ? item2.url.split('/')[3] : item2) &&
              hasLeftWin
          }"
          class="flex flex-row justify-between h-12s bg-neutral-50 mt-[1px] p-2"
          v-for="(item2, key) in item.pages"
          :key="key"
          @click="goDetailPage(item.id, item2)"
        >
          <text class="text-sm">{{ item2.name ? item2.name : item2 }}</text>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    hasLeftWin: {
      type: Boolean
    },
    leftWinActive: {
      type: String
    }
  },
  data() {
    return {
      list: [
        {
          id: 'view',
          name: '视图容器',
          open: false,
          pages: [
            'view',
            'scroll-view',
            'swiper',
            // #ifndef MP-TOUTIAO || MP-LARK
            'movable-view',
            'cover-view'
            // #endif
          ]
        },
        {
          id: 'content',
          name: '基础内容',
          open: false,
          pages: ['text', 'rich-text', 'progress']
        },
        {
          id: 'form',
          name: '表单组件',
          open: false,
          pages: [
            'button',
            'checkbox',
            'form',
            'input',
            'label',
            'picker',
            'picker-view',
            'radio',
            'slider',
            'switch',
            'textarea'
          ]
        },
        {
          id: 'nav',
          name: '导航',
          open: false,
          pages: ['navigator']
        },
        {
          id: 'media',
          name: '媒体组件',
          open: false,
          pages: ['image', 'video']
        },
        // #ifndef MP-TOUTIAO || MP-KUAISHOU
        {
          id: 'map',
          name: '地图',
          open: false,
          pages: ['map']
        },
        // #endif
        // #ifndef QUICKAPP-WEBVIEW-UNION
        {
          id: 'canvas',
          name: '画布',
          open: false,
          pages: ['canvas']
        },
        // #endif
        // #ifdef APP-PLUS || H5
        {
          id: 'web-view',
          name: '网页',
          open: false,
          pages: [
            {
              name: '网络网页',
              url: '/pages/component/web-view/web-view'
            },
            {
              name: '本地网页',
              url: '/pages/component/web-view-local/web-view-local'
            }
          ]
        },
        // #endif
        // #ifndef APP-PLUS || H5 || MP-LARK || MP-JD
        {
          id: 'web-view',
          name: '网页',
          open: false,
          pages: ['web-view']
        }
        // #endif
      ]
    };
  },
  onShareAppMessage() {
    return {
      title: '欢迎体验uni-app',
      path: '/pages/tabBar/component/component'
    };
  },
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: '/pages/about/about'
    });
  },
  // #ifdef H5
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        if (newRoute.matched.length) {
          let path = newRoute.path.split('/')[3];
          for (const item of this.list) {
            if (Array.isArray(item.pages)) {
              for (const page of item.pages) {
                if (page === path || (page.url && page.url === newRoute.path)) {
                  item.open = true;
                }
              }
            }
          }
        }
      }
    }
  },
  // #endif
  methods: {
    triggerCollapse(e, id) {
      if (!this.list[e].pages) {
        this.goDetailPage('', this.list[e].url);
        return;
      }
      for (var i = 0; i < this.list.length; ++i) {
        if (e === i) {
          this.list[i].open = !this.list[i].open;
        } else {
          this.list[i].open = false;
        }
      }
    },
    goDetailPage(panel, e) {
      if (typeof e === 'string') {
        const url = '/pages/component/' + e + '/' + e;
        if (this.hasLeftWin) {
          uni.reLaunch({
            url: url
          });
        } else {
          uni.navigateTo({
            url: url
          });
        }
      } else {
        if (this.hasLeftWin) {
          uni.reLaunch({
            url: e.url
          });
        } else {
          uni.navigateTo({
            url: e.url
          });
        }
      }
    }
  }
};
</script>

<style></style>
