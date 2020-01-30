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
      // store.commit(mutationsName.setLocationInfo, res);
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
