<template>
  <div class="detail__work__info">{{workInfo.label}}：<span>{{workInfo.value}}</span></div>
</template>

<script>
export default {
  name: "detailWorkInfo",
  props: {
    workInfo: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  }
}
</script>

<style lang="less" scoped>
.detail__work__info {
  white-space: pre-wrap;
  font-size: @fs12;
  font-family: @pfSC;
  line-height:17px;
  color: @titleColor
}
</style>
