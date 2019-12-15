<template>
  <div class="common__content__header">
    <div class="name">{{titleValue}}</div>
  </div>
</template>

<script>
export default {
  name: "commonContentHeader",
  props: {
    titleValue: {
      type: String,
      default: "基本信息"
    }
  }
}
</script>

<style lang="less" scoped>
  .common__content__header {
    background: @itemColor;
    border-radius:5px 5px 0 0;
    height: 37px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid @dividerBgColor;
    .name {
      font-size: @fs15;
      font-family: @pfSC;
      font-weight: bold;
      line-height: @fs21;
    }
  }
</style>
