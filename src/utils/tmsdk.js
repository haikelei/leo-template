window.jssdknum = 0;

const Utils = {
  // 取地址栏参数
  getParameter() {
    let str = window.location.href.split('#')[0];
    let num = str.indexOf('?');
    const param = {};
    str = str.substr(num + 1);
    const arr = str.split('&');
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        const name = arr[i].substring(0, num);
        const value = arr[i].substr(num + 1);
        param[name] = decodeURI(value);
      }
    }
    return param;
  },
  // 获取UA状态
  getUaInit() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.match(/android/gi);
    const isIos = userAgent.match(/iphone|ipod|ipad/gi);
    const isQQ = userAgent.match(/QQ/gi);
    const isWeixin =
      userAgent.match(/wechat/gi) || userAgent.match(/MicroMessenger/gi);
    const isTm = userAgent.match(/zjolapp/gi);
    return {
      isAndroid,
      isIos,
      isQQ,
      isWeixin,
      isTm
    };
  },
  // jsdk
  jsdk(callback, tmLogin) {
    if (window.jssdknum === 0) {
      const zjrbCp = document.createElement('script');
      zjrbCp.async = 'async';
      zjrbCp.src =
        'https://activity.tianmunews.com/material/tmWebJssdk/tmJsSdk.js';
      zjrbCp.charset = 'UTF-8';
      document.body.appendChild(zjrbCp);
      window.jssdknum = 1;
      zjrbCp.onload = function () {
        if (window.CP && typeof window.CP.ready === 'function') {
          window.CP.ready({
            debug: false, // 可选，是否是开启调试模式, 默认false
            es6Require: false, // 可选，是否需要加载es6库，默认false
            wxOption: {
              // 可选，内容需要二次分享时请配置此项
              debug: false, // 是否是开启微信调试模式
              appid: 'wx0511ad48925f257e', // 授权的微信公众号的appid  微信二次分享使用，具体使用方式请参照 附录：微信及微信二次分享
              method: 'getShareSign', // 获取微信信息方法，写死
              // uploadImage: '', //使用微信录音，图片上传等功能时需要的上传后台服务器地址
              redirect: location.href.split('#')[0], // 回调域名，一般为加载后签名时页面，如跳转可能会签名失败 附录：微信及微信二次分享
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'onVoicePlayEnd',
                'uploadVoice',
                'playVoice',
                'getLocation',
                'chooseImage',
                'uploadImage',
                'stopVoice',
                'pauseVoice',
                'previewImage',
                'translateVoice',
                'updateAppMessageShareData',
                'updateTimelineShareData'
              ], // 分享到微信必填，需要使用的微信JS接口列表，所有JS接口列表见 附录：微信JS接口列表
              openTagList: ['wx-open-launch-app']
            },
            ready(client_info) {
              console.log('-----------**********---------');
              let shareUrl =
                'https://activity.tianmunews.com/material/CW-88zhanlue/index.html';
              if (Utils.getUaInit().isWeixin) {
                shareUrl =
                  'https://activity.tianmunews.com/material/CW-88zhanlue/index.html';
              }
              // client_info > { client_code: 'web', version: '1.0', detail: ''}  clientInfo 接口返回数据
              window.CP.setShare({
                completed() {},
                title: '潮闻杯“八八战略”知识竞赛答题',
                link: shareUrl,
                imgUrl:
                  'https://activity.tianmunews.com/material/CW-88zhanlue/static/fx.jpg',
                shareSummary: '学个习，答个题，抽个奖。'
              });
              isZjolapp();
            },
            error(error) {
              console.log(error);
              // jssdk运行时报错，但不会阻断程序运行  427569
              // error > {code: 4000, msg: res.errMsg, data: res}  res为原生报错 微信的报错也在这处理
            }
          });
        }
      };
    } else {
      isZjolapp();
    }

    function min() {
      console.log('登录？？？？？', tmLogin);
      if (!tmLogin) return;
      // 判断用户是否登陆
      window.CP.isLogin({
        completed(data) {
          window.CP.tools.writelog('get_is_login', data);
          // data === 1 登陆成功，然后获取用户信息
          if (data.is_login === '1') {
            getUserInfo();
          } else {
            window.CP.showLogin({
              completed(data) {
                // data > {unique_id: '', account_id: '', is_login: ''}
                window.CP.tools.writelog('show_login', data);
                if (data.is_login === '1') {
                  getUserInfo();
                }
              },
              cpIncompatible() {
                window.CP.tools.writelog('', '此环境不支持此方法');
              }
            });
          }
        },
        cpIncompatible() {
          window.CP.tools.writelog('', '此环境不支持此方法');
        }
      });
    }

    // // 是否天目客户端打开
    function isZjolapp() {
      window.CP.getClientInfo({
        completed(data) {
          window.version = data.version;
          data.client_code === 'zjolapp'
            ? zjolInit()
            : noZjolInit(data.client_code);
        }
      });

      // 是天目客户端
      function zjolInit() {
        window.tmPath = 'tmzjol';
        console.log('是天目客户端');
        min();
      }

      // 不是天目客户端
      function noZjolInit(code) {
        console.log(code);
        callback({
          code: 404
        });
      }
    }

    // 获取用户信息
    function getUserInfo() {
      // 设备信息
      window.CP.getClientInfo({
        completed(data) {
          // 存储设备信息
          window.appVersion = data.versionName;
          window.deviceNum = data.detail.uuid;
          window.device = data.detail.device;
        }
      });
      window.CP.getCustomerInfo({
        completed(data) {
          // data > {account_id: '',username: '',head_img: '',nick_name: '',score:'',mobile: '',ref_code:'',ref_user_uid:'',ref_user_code:'',invitation_number: ''}
          window.CP.tools.writelog('get_customer_info', data);
          // 存储用户信息
          window.nick_name =
            data.nick_name.length > 8
              ? `${data.nick_name.slice(0, 8)}...`
              : data.nick_name;
          window.account_id = data.account_id;
          window.session_id = data.session_id;
          window.mobile = data.mobile;
          window.head_img = data.head_img;
          callback({
            code: 200,
            nick_name: data.nick_name,
            account_id: data.account_id,
            session_id: data.session_id,
            mobile: data.mobile
          });
        },
        cpIncompatible() {
          window.CP.tools.writelog('', '此环境不支持此方法');
        }
      });
    }
  },

  toMLink(url = '') {
    const iosLink = `zjol://tm.zjol.com.cn?url=${encodeURIComponent(url)}`;
    console.log(iosLink);
    const androidLink = `zjol://tm.zjol.com.cn?url=${url}`;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.match(/android/gi);
    const isIos = userAgent.match(/iphone|ipod|ipad/gi);
    const isQQ = userAgent.match(/QQ/gi);
    // eslint-disable-next-line camelcase
    const isIos13_1 = userAgent.match(/iPhone OS 13_1/gi);
    const isWeixin =
      userAgent.match(/wechat/gi) || userAgent.match(/MicroMessenger/gi);
    let openLink = 'https://tianmunews.com/download.html';

    const iosyybLink = `https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.zjol&ios_scheme=${encodeURIComponent(
      iosLink
    )}`;
    const androidyybLink = `https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.zjol&android_schema=${escape(
      androidLink
    )}`;
    const iosUniversalLink = `https://app-api.zjol.com.cn/?url=${encodeURIComponent(
      url
    )}`;
    let downloadLink = iosyybLink;
    if (isIos) {
      // IOS13.1不识别universal link
      // eslint-disable-next-line camelcase
      if (isIos13_1) {
        if (isWeixin) {
          openLink = iosyybLink;
        } else {
          openLink = iosLink;
        }
      } else if (isQQ) {
        openLink = iosLink;
      } else {
        openLink = iosUniversalLink;
      }
    } else if (isAndroid) {
      if (isWeixin) {
        openLink = androidyybLink;
      } else {
        openLink = androidLink;
      }
      downloadLink = androidyybLink;
    }
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = openLink;
    document.body.appendChild(a);
    // eslint-disable-next-line no-undef
    const ev = new MouseEvent('click');
    a.dispatchEvent(ev);

    const now = Date.now();
    if (openLink === iosUniversalLink) {
      return;
    }
    const o = setTimeout(() => {
      if (document.hidden || document.webkitHidden) {
        clearTimeout(o);
      } else if (Date.now() - now > 3503) {
        clearTimeout(o);
      } else {
        window.location.href = downloadLink;
      }
    }, 3000);
  },
  // 用户手机号脱敏
  desensitization(number) {
    if (!number) return '';
    const matching = /(\d{3})\d*(\d{4})/;
    const result = number.replace(matching, '$1***$2');
    return result;
  },

  // 任务跳转端能力
  TmNative({ url, id = '', type = '' }) {
    const obj = {
      url: `https://tm.zjol.com.cn${url}`,
      activity_address: 'https://tm.zjol.com.cn/link.html?id=517154',
      task_id: id,
      task_type: type
    };
    const { ZBJTJSBridge } = window;
    ZBJTJSBridge.invoke(
      'jumpToNativePage',
      JSON.stringify(obj),
      'checkAPICallbackMethod'
    );
    // } catch (error) {
    //   console.error("TYPE：try, 端能力调用报错")
    // }
  },
  // 获取随机数
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      default:
        return 0;
    }
  }
};

// 触发端能力后的回调。暂时没用
// eslint-disable-next-line no-unused-vars
window.checkAPICallbackMethod = function () {};

export default Utils;
