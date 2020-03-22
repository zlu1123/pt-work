/* eslint-disable no-undef */
import store from "../store";
import { mutationsName } from "../common/constants";
export const getUserLocation = () => {
  // eslint-disable-next-line no-undef
  wx.getLocation({
    type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    // eslint-disable-next-line space-before-function-paren
    success: function(res) {
      // let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      // let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      // let speed = res.speed; // 速度，以米/每秒计
      // let accuracy = res.accuracy; // 位置精度
      getPosition([res.longitude, res.latitude]);
    },
    // eslint-disable-next-line space-before-function-paren
    fail: function(error) {
      console.log(error);
    }
  });
};

export const getPosition = param => {
  // var geocoder = new AMap.Geocoder({
  //   city: "029", // 城市设为北京，默认：“全国”
  //   radius: 1000 // 范围，默认：500
  // });
  // debugger;
  // geocoder.getAddress(param, (status, result) => {
  //   console.log("00000000" + status);
  //   console.log("1222222" + JSON.stringify(result));
  //   if (status === "complete" && result.regeocode) {
  //     // var address = result.regeocode.formattedAddress;
  //     console.log(result);
  //     debugger;
  //   } else {
  //     debugger;
  //     console.error("根据经纬度查询地址失败");
  //   }
  // });
  // 逆地址解析
  // eslint-disable-next-line no-undef
  var latLng = new qq.maps.LatLng(param[1], param[0]);
  // 地址和经纬度之间进行转换服务
  // eslint-disable-next-line no-undef
  let geocoder = new qq.maps.Geocoder();
  // 对指定经纬度进行解析
  geocoder.getAddress(latLng);
  // 设置服务请求成功的回调函数
  // eslint-disable-next-line space-before-function-paren
  geocoder.setComplete(function(result) {
    // _this.locationList = result.detail.nearPois
    store.commit(mutationsName.setLocationInfo, result);
  });
};

/**
 * 获取授权信息
 *
 * @param {Object} signature 签名
 * @param {Object} noncestr 随机串
 * @param {Object} timestamp 时间戳
 */
export const wechatConfig = (signature, noncestr, timestamp, appId) => {
  // eslint-disable-next-line no-undef
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
    wx.hideOptionMenu();
  });
};

export const getWechatPay = (data, callback) => {
  debugger;
  // eslint-disable-next-line no-undef
  wx.chooseWXPay({
    timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: data.sign, // 支付签名
    // eslint-disable-next-line space-before-function-paren
    success: function(res) {
      // 支付成功后的回调函数
      callback(res);
    }
  });
};
