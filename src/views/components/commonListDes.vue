<template>
  <div class="list-des-content">
    <div class="list-des-content-info">
      <div>顺丰快递公司</div>
      <img :src="defaultImgUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "commonListDes",
  data() {
    return {
      defaultImgUrl: './img/myself/fanhui@2x.png'
    }
  }
}
</script>

<style lang="less" scoped>
.list-des-content {
  margin-top: 10px;
  padding: 0 15px;
  background: @jobTitleBgColor;
  font-size: @fs12;
  font-family: @pfSC;
  color: @tipColor;
  .list-des-content-info {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid @dividerBgColor;
    img {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
