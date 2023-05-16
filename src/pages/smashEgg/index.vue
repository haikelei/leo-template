<template>
  <view class="page-smash-egg">
    <!-- 背景图 -->
    <view class="bgc">
      <image src="@/static/images/bgc.png" mode="widthFix" />
    </view>
    <!-- 主要部分 -->
    <view class="main-title">100%中奖你还在等什么</view>

    <!-- 剩余次数 -->
    <view class="remaining">剩余次数：{{ remainingNum }}次</view>

    <view class="main">
      <u-row class="ml-4">
        <u-col span="3" v-for="(item, index) in list" :key="index">
          <view class="item" @tap.stop="smash(item)">
            <!-- 蛋 -->
            <image
              src="@/static/images/egg.png"
              mode="aspectFill"
              class="egg"
              v-if="item.eggVisibel == true"
            />

            <!-- 砸蛋阶段1 -->
            <image
              src="@/static/images/step-1.png"
              mode="aspectFill"
              class="step1"
              v-if="item.step1Visibel == true"
            />

            <!-- 砸蛋阶段2 -->
            <image
              src="@/static/images/step-2.png"
              mode="aspectFill"
              class="step2"
              v-if="item.step2Visibel == true"
            />

            <!-- 砸蛋阶段3 -->
            <image
              src="@/static/images/step-3.png"
              mode="aspectFill"
              class="step3"
              v-if="item.step3Visibel == true"
            />

            <!-- 未中奖 -->
            <image
              src="@/static/images/no-general.png"
              mode="aspectFill"
              class="no-general"
              v-if="item.winLotter == true"
            />

            <!-- 锤子 -->
            <view class="hammer" v-if="item.hammerVisible == true">
              <image src="@/static/images/hammer.png" mode="aspectFill" />
            </view>
          </view>
        </u-col>
      </u-row>
    </view>

    <!-- 奖品弹窗 -->
    <u-popup v-model="prizeVisible" mode="center">
      <view class="prize">
        <image
          src="@/static/images/prize.png"
          mode="aspectFill"
          class="prize-bgc"
        />

        <!-- 奖品内容 -->
        <view class="content">
          <!-- 奖品标题 -->
          <text class="prize-title">恭喜您获得</text>
          <!-- 提示 -->
          <text class="prize-tips">-新人百元补贴 分享领取-</text>
          <!-- 奖金 -->
          <view class="prize-bonus">
            <text class="price">88</text>
            <text class="unit">元</text>
          </view>
          <!-- 按钮 -->
          <view class="btn">
            <u-button round>分享好友即可领取</u-button>
          </view>
        </view>
      </view>
      <!-- 关闭按钮 -->
      <view class="close" @tap="closePrize">
        <image src="@/static/images/close.png" mode="aspectFill" />
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const remainingNum = ref(5);
const eggNum = ref(9);
const list = ref([]);
const prizeVisible = ref(true);
const process = ref(false);

onMounted(() => {
  list.value = new Array(eggNum.value).fill().map(() => {
    return {
      hammerVisible: false,
      eggVisibel: true,
      step1Visibel: true,
      step2Visibel: true,
      step3Visibel: true,
      winLotter: false,
      ifOver: false
    };
  });
});

// 砸蛋函数
const smash = async (item: any) => {
  if (remainingNum.value <= 0) {
    uni.showToast({
      title: '你没有剩余次数了',
      icon: 'none'
    });
    return;
  }

  if (!item.eggVisibel) return;
  item.hammerVisible = true;
  await sleep(2000);

  item.eggVisibel = false;
  item.hammerVisible = false;
  remainingNum.value -= 1;

  // 如果中奖
  if (Math.random() > 0.5) {
    item.winLotter = true;
    prizeVisible.value = true;
  }
};

// 定义一个sleep函数
const sleep = (time: any) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
const closePrize = () => {
  prizeVisible.value = false;
};
</script>
<style scoped lang="less">
/deep/ .u-mode-center-box {
  background-color: transparent !important;
}

.page-smash-egg {
  position: relative;

  .bgc {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    image {
      display: block;
      width: 100%;
    }
  }

  .title {
    width: 100%;
    padding-top: 46rpx;
    text-align: center;
    font-size: 44rpx;
    font-weight: 500;
    color: #ffffff;
  }

  .main-title {
    position: absolute;
    top: 718rpx;
    width: 100%;
    text-align: center;
    font-size: 33rpx;
    font-weight: 500;
    color: #fe3c3f;
  }

  .remaining {
    position: absolute;
    top: 794rpx;
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    font-weight: 500;
    color: #ffdf6e;
  }

  .main {
    position: absolute;
    top: 840rpx;
    width: 100%;
    height: 730rpx;
    margin: 0 54rpx;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 232rpx;

      image {
        width: 211rpx;
        height: 232rpx;
      }

      .egg {
        position: absolute;
        z-index: 99;
      }

      .step1 {
        position: absolute;
        z-index: 88;
      }

      .step2 {
        position: absolute;
        z-index: 77;
      }

      .step3 {
        position: absolute;
        z-index: 66;
      }

      .no-general {
        position: absolute;
      }

      .hammer {
        position: absolute;
        top: 0;
        right: -22rpx;
        width: 130rpx;
        height: 144rpx;
        z-index: 99;
        animation: smash 0.2s infinite;
        animation-direction: alternate;
        @keyframes smash {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-30deg);
          }
        }

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .prize {
    position: relative;
    width: 621rpx;
    height: 769rpx;
    margin-bottom: 40rpx;

    &-bgc {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;

      .prize-title {
        margin-bottom: 20rpx;
        font-size: 56rpx;
        font-weight: 500;
        color: #ffffff;
      }

      .prize-tips {
        margin-bottom: 30rpx;
        font-size: 30rpx;
        font-weight: 500;
        color: #feffb3;
      }

      .prize-bonus {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        font-size: 83rpx;
        font-weight: bold;
        color: #feffb3;
        font-size: 83rpx;
        font-weight: bold;
        color: #feffb3;
      }

      .btn {
        margin-bottom: 40rpx;

        /deep/ .cl-button {
          background: linear-gradient(0deg, #ffbe4e 0%, #ffe485 100%);

          ::after {
            border: 0;
          }

          &__text {
            font-size: 28rpx;
            font-weight: 500;
            font-style: italic;
            color: #f41018;
          }
        }
      }
    }
  }

  .close {
    width: 100%;
    text-align: center;

    image {
      width: 68rpx;
      height: 68rpx;
    }
  }
}
</style>
