<template> <div></div></template>
<script>
import { getWechatSign } from "../../service/api";
const murl = "http://www.xx.com";
const url = localStorage.getItem("now_url");
var appid = "wx8a3767e4d64a71a2";
export default {
  // 生命周期函数
  created() {
    debugger;
    this._initJDKConfig();
    const code = this.GetUrlParame("code"); // 截取code
    if (!code) {
      var domine = window.location.href.split("#")[0]; // 微信会自动识别#    并且清除#后面的内容
      // 这里的axios是已封装过的
      // this.axios
      //   .get("/set_wxcode_url?url=" + domine) // 如果没有code，说明用户还没授权   将当前地址传递给后台
      //   .then(res => {
      //     window.location.href = res.data;
      //   });
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
        domine
      )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
    } else {
      this.axios
        .get("/gzh_token?code=", { code: code }) // 如果有code，说明用户点击了授权  将获取到的code传递给后台
        .then(res => {
          // 返回状态和UId
          console.log(res.data);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
          if (res.data.openid) {
            localStorage.setItem("openid", res.data.openid);
          }
          window.location.replace(murl + "/#" + url);
        });
    }
  },
  data() {
    return {};
  },
  methods: {
    // 截取code
    GetUrlParame(parameName) {
      /// 获取地址栏指定参数的值
      /// <param name="parameName">参数名</param>
      // 获取url中跟在问号后面的部分
      var parames = window.location.search;
      // 检测参数是否存在
      if (parames.indexOf(parameName) > -1) {
        var parameValue = "";
        parameValue = parames.substring(
          parames.indexOf(parameName),
          parames.length
        );
        // 检测后面是否还有参数
        if (parameValue.indexOf("&") > -1) {
          // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
          parameValue = parameValue.substring(0, parameValue.indexOf("&"));
          // 去掉参数名, 得到最终纯值字符串
          parameValue = parameValue.replace(parameName + "=", "");
          return parameValue;
        }
        return "";
      }
    },
    /* 配置微信jdk */
    _initJDKConfig() {
      getWechatSign({
        jsUrl:
          "http://test.coa.police.adxinfo.cn/officialAccountsUi/index.html",
        appid: appid
      }).then(data => {
        // eslint-disable-next-line no-undef
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.sign, // 必填，签名
          jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
        });
      });
    },

    getCode() {
      // 非静默授权，第一次有弹框
      this.code = "";
      var local = window.location.href; // 获取页面url
      var appid = "wx8a3767e4d64a71a2";
      this.code = this.getUrlCode().code; // 截取code
      if (this.code == null || this.code === "") {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      } else {
        // 你自己的业务逻辑
      }
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
    }
  }
};
</script>
