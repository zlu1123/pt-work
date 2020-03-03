<template>
  <div class="list-des-content" @click.stop="goJobMap">
    <div class="list-des-content-info">
      <div>{{ titleName }}</div>
      <img v-if="showDes" :src="defaultImgUrl" alt="" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonListDes",
  props: {
    showDes: {
      default: true,
      type: Boolean
    },
    titleName: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      defaultImgUrl: "./img/myself/fanhui@2x.png"
    };
  },
  methods: {
    goJobMap() {
      this.$emit("goJobMap");
    }
  }
};
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
