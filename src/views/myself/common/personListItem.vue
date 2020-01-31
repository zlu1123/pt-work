<template>
  <div class="myself__list__item">
    <van-field
      v-model="itemData.value"
      :label="itemData.name"
      :placeholder="placeholder"
      input-align="right"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    itemData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      placeholder: "请输入内容"
    };
  }
};
</script>

<style lang="less" scoped>
.myself__list__item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    font-size: @fs15;
    color: @titleColor;
    font-family: @pfSC;
  }
}
</style>
