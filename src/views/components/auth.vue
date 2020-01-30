<template>
  <div></div>
</template>
<script>
import {
  handleRequestPromise,
  getWechatSign,
  getOpenId
} from "../../service/api";
import { baseUrlConfig } from "../../service/baseUrl";
import { mapActions } from "vuex";
import { getUrlParams } from "../../plugins/util";
const url = localStorage.getItem("now_url");
export default {
  // 生命周期函数
  async created() {
    // await this._initJDKConfig();
    // this.geiWechatOpenId();
  },
  async mounted() {
    await this._initJDKConfig();
    this.geiWechatOpenId();
    // this.getUserLocation();
  },
  data() {
    return {
      appId: "",
      timestamp: "",
      nonceStr: "",
      signature: ""
    };
  },
  methods: {
    ...mapActions(["requestUserInfo"]),
    async geiWechatOpenId() {
      const code = getUrlParams("code"); // 截取code
      if (!code) {
        let domine = window.location.href.split("#")[0]; // 微信会自动识别#    并且清除#后面的内容
        // 这里的axios是已封装过的
        // this.axios
        //   .get("/set_wxcode_url?url=" + domine) // 如果没有code，说明用户还没授权   将当前地址传递给后台
        //   .then(res => {
        //     window.location.href = res.data;
        //   });
        const wechatHref = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${domine}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
        window.location.href = wechatHref;
        // －scope=snsapi_base 获取微信用户openid,获取后直接跳转业务页面，不需要用户操作
        // －scope=snsapi_userinfo 获取微信用户详细信息（昵称，头像等），需要用户手动点击授权，当点击允许时，会跳转业务页面（类似于关闭弹窗），点击拒绝时会推出页面，授权如图
      } else {
        // 如果有code，说明用户点击了授权  将获取到的code传递给后台
        getOpenId({ code: code }).then(res => {
          // 返回状态和UId
          const data = res.data.data;
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          if (data.openid) {
            localStorage.setItem("openid", data.openid);
          }
          window.location.replace(baseUrlConfig.weChatUrl + "/#" + url);
        });
      }
    },

    /* 配置微信jdk */
    async _initJDKConfig() {
      let urlBase = location.href.split("#")[0]; // 获取当前url,不能带路由
      let data = await handleRequestPromise(getWechatSign, {
        url: urlBase
      });
      this.appId = data.data.appId;
      this.wechatConfig(
        data.data.sign,
        data.data.nonceStr,
        data.data.timestamp,
        data.data.appId
      );
      // this.getUserLocation();
    },

    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = {};
      if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    /**
     * 获取授权信息
     *
     * @param {Object} signature 签名
     * @param {Object} noncestr 随机串
     * @param {Object} timestamp 时间戳
     */
    wechatConfig(signature, noncestr, timestamp, appId) {
      // eslint-disable-next-line no-undef
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "onVoicePlayEnd",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "translateVoice",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      // eslint-disable-next-line no-undef space-before-function-paren
      // eslint-disable-next-line
      wx.ready(function() {
        /// / config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        // that.getUserLocation();
      });
    }
  }
};
</script>
