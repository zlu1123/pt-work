<template>
  <div class="myself-content">
    <van-row>
      <van-col :span="4">
        <van-image
          round
          fit
          width="50"
          height="50"
          lazy-load
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col :span="20" class="myself-title">
          <div>微信用户45565</div>
          <div>电话号码</div>
          <div>姓名：</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col, Image, Lazyload } from "vant"
export default {
  name: "",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Lazyload.name]: Lazyload
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.myself-content {
    margin: 0.2rem 0.2rem 0;
    .myself-title {
        text-align: left
    }
}
</style>
