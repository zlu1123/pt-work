<template>
  <div class="detail__title">
    {{titleName}}
  </div>
</template>

<script>
export default {
  name: "detailTitle",
  props: {
    titleName: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
  .detail__title {
    font-size: 15px;
    font-family: @pfSC;
    font-weight:bold;
    line-height:21px;
    color: @chooseColor;
  }
</style>
