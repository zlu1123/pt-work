<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive :include="$store.getters.getKeepAlivePath">
        <router-view />
      </keep-alive>
    </transition>
    <el-amap
      v-show="false"
      vid="amap"
      :plugin="plugin"
      :amap-manager="amapManager"
      ::map-manager="amapManager"
    ></el-amap>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { actionsName } from "./common/constants";
// import { userLogin } from "./service/api";
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager(); // 新建生成地图画布

export default {
  data() {
    let self = this;
    return {
      lng: 0,
      lat: 0,
      amapManager,
      plugin: [
        {
          pName: "Geolocation", // 定位
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  console.log(result);
                  self.lng = result.position.lng; // 设置经度
                  self.lat = result.position.lat; // 设置维度
                  self.getPosition([result.position.lng, result.position.lat]);
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  mounted() {
    // this.$store.commit(mutationsName.setKeepAlivePath, 'homeIndex');
    // enRoll();
    // userLogin()
    this[actionsName.requestUserInfo]().then(res => {
      // console.log(res);
    });
  },
  methods: {
    ...mapActions([actionsName.requestUserInfo]),

    getPosition(param) {
      let geocoder = new AMap.Geocoder({
        city: "029"
      });
      geocoder.getAddress(param, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          // result为对应的地理位置详细信息
        }
      });
    }
  },

  computed: {}
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
</style>
