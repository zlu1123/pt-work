<template>
  <div v-if="welfareName" class="detail__welfare">
    <div>{{welfareName}}</div>
  </div>
  <div v-else class="detail__require">
    <div>{{requireName}}</div>
  </div>
</template>

<script>
export default {
  name: "detailWelfare",
  props: {
    welfareName: {
      type: String,
      default: ""
    },
    requireName: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
.detail__welfare {
  display: inline-block;
  background: @detailBgColor;
  font-size:12px;
  font-family: @pfSC;
  line-height:17px;
  color: @chooseColor;
  div {
    padding: 1px 2px;
  }
}
  .detail__require {
    display: inline-block;
    background: @detailRequireColor;
    font-size:12px;
    font-family: @pfSC;
    line-height:17px;
    color: @personTipColor;
    div {
      padding: 1px 2px;
    }
  }
</style>
