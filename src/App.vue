<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive :include="$store.getters.getKeepAlivePath">
        <router-view />
      </keep-alive>
    </transition>
    <van-overlay :show="getLoading">
      <div class="wrapper" @click.stop>
        <van-loading color="#21A675" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { actionsName } from "./common/constants";

export default {
  data() {
    return {
      show: true
    };
  },
  mounted() {
    // this.$store.commit(mutationsName.setKeepAlivePath, 'homeIndex');
    this.initMap();
  },
  methods: {
    ...mapActions([actionsName.requestUserInfo]),

    initMap() {
      const self = this;
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：5s
          buttonPosition: "RB", // 定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status === "complete") {
            // onComplete(result);
            self.lng = result.position.lng; // 设置经度
            self.lat = result.position.lat; // 设置维度
            // self.$store.commit(mutationsName.setLocationInfo, result.position);
            self.getPosition([result.position.lng, result.position.lat]);
            self.$nextTick();
          } else {
            // onError(result);
          }
        });
      });
    },

    getPosition(param) {
      var geocoder = new AMap.Geocoder({
        city: "029", // 城市设为北京，默认：“全国”
        radius: 1000 // 范围，默认：500
      });

      geocoder.getAddress(param, (status, result) => {
        if (status === "complete" && result.regeocode) {
          // var address = result.regeocode.formattedAddress;
          console.log(result);
        } else {
          console.error("根据经纬度查询地址失败");
        }
      });
    }
  },

  computed: {
    ...mapGetters(["getLoading"])
  }
};
</script>
<style lang="less">
/* 禁用iPhone中Safari的字号自动调整 */
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  /* 解决IOS默认滑动很卡的情况 */
  -webkit-overflow-scrolling: touch;
  background: @bgColor;
}

/* 禁止缩放表单 */
input[type="submit"],
input[type="reset"],
input[type="button"],
input {
  resize: none;
  border: none;
}

/* 取消链接高亮  */
body,
div,
ul,
li,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
input,
textarea,
select,
p,
dl,
dt,
dd,
a,
img,
button,
form,
table,
th,
tr,
td,
tbody,
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* 设置HTML5元素为块 */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

/* 图片自适应 */
img {
  width: 100%;
  height: auto;
  width: auto\9; /* ie8 */
  display: block;
  -ms-interpolation-mode: bicubic; /*为了照顾ie图片缩放失真*/
}

/* 初始化 */
body,
div,
ul,
li,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
input,
textarea,
select,
p,
dl,
dt,
dd,
a,
img,
button,
form,
table,
th,
tr,
td,
tbody,
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  margin: 0;
  padding: 0;
}
body {
  font: 12px/1.5 "Microsoft YaHei", "宋体", Tahoma, Arial, sans-serif;
  color: #555;
  background-color: #f7f7f7;
}
em,
i {
  font-style: normal;
}
ul,
li {
  list-style-type: none;
}
strong {
  font-weight: normal;
}
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
a {
  text-decoration: none;
  color: #969696;
  font-family: "Microsoft YaHei", Tahoma, Arial, sans-serif;
}
a:hover {
  text-decoration: none;
}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-family: "Microsoft YaHei";
}
img {
  border: none;
}
input {
  font-family: "Microsoft YaHei";
}
/*单行溢出*/
.one-txt-cut {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/*多行溢出 手机端使用*/
.txt-cut {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
}
/* 移动端点击a链接出现蓝色背景问题解决 */
a:link,
a:active,
a:visited,
a:hover {
  background: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
.w50 {
  width: 50%;
}
.w25 {
  width: 25%;
}
.w20 {
  width: 20%;
}
.w33 {
  width: 33.333333%;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.db {
  display: block !important;
}
.dn {
  display: none;
}
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
