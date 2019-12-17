<template>
  <div class="check__list__item">
    <div class="title">
      <div class="left">{{listItem.name}}</div>
      <div class="right" :style="{'color': listItem.isCheckIn ? '#21A675' : '#F23800'}">{{listItem.isCheckIn ? "" : "已"}}审核</div>
    </div>
    <div class="content" v-for="(item, index) of listItem.workInfo" :key="index">{{item.label}}：<span>{{item.value}}</span></div>
  </div>
</template>

<script>
export default {
  name: "punchInfoListItem",
  props: {
    listItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  }
}
</script>

<style lang="less" scoped>
  .check__list__item {
    background: @itemColor;
    padding: 0 15px 10px;
    margin-top: 10px;
    .title{
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid @dividerBgColor;
      .left {
        font-size: @fs15;
        font-family: @pfSC;
        font-weight:bold;
        color: @titleColor;
      }
      .right {
        font-size: @fs12;
        font-family: @pfSC;
        color: @chooseColor;
      }
    }
    .content {
      white-space: pre-wrap;
      font-size: @fs12;
      font-family: @pfSC;
      color: @titleColor;
      margin-top: 7px;
    }
  }
</style>
