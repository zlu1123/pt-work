<template>
  <div></div>
</template>
<script>
import { getOpenId } from "../../service/api";
import { baseUrlConfig } from "../../service/baseUrl";
import { getUrlParams } from "../../plugins/util";
import { mapGetters, mapActions } from "vuex";

const url = localStorage.getItem("now_url");
export default {
  data() {
    return {};
  },
  mounted() {
    this.geiWechatOpenId();
  },
  methods: {
    ...mapActions(["requestWechatInfo"]),

    async geiWechatOpenId() {
      const code = getUrlParams("code"); // 截取code
      let appId = this.getWechatInfo && this.getWechatInfo.appId;
      if (!appId) {
        appId = await this.requestWechatInfo();
      }
      if (!code) {
        let domine = window.location.href.split("#")[0]; // 微信会自动识别#    并且清除#后面的内容
        // 这里的axios是已封装过的
        // this.axios
        //   .get("/set_wxcode_url?url=" + domine) // 如果没有code，说明用户还没授权   将当前地址传递给后台
        //   .then(res => {
        //     window.location.href = res.data;
        //   });
        const wechatHref = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${domine}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
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
  },

  computed: {
    ...mapGetters(["getWechatInfo"])
  }
};
</script>
