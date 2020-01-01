<template>
  <div class="job-index-content">
    <!-- <common-header :title="contentData.title"></common-header> -->
    <van-tabs
      v-model="active"
      class="job-tabble"
      sticky
      line-width="60px"
      line-height="4px"
      color="#21A675"
      title-active-color="#21A675"
      title-inactive-color="#333333"
    >
      <van-tab name="accepted" :title="contentData.firstName">
        <slot name="firstList"></slot>
      </van-tab>
      <van-tab name="settled" :title="contentData.lastName">
        <slot name="lastList"></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import commonHeader from "./commonHeader";
export default {
  name: "",
  props: {
    contentData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  components: {
    // commonHeader
  },
  data() {
    return {
      active: "accepted"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.job-index-content {
  background: @bgColor;
  .job-header {
    height: 58px;
    background: @jobTitleBgColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @fs18;
    font-family: @pfSC;
    font-weight: bold;
    color: @chooseColor;
  }
  .job-tabble {
    // margin-top: 10px;
    margin-bottom: 50px;
    /*height: 40px;*/
    /*/deep/ .van-tabs__wrap {*/
    /*  height: 40px;*/
    /*  .van-tab {*/
    /*    line-height: 40px;*/
    /*  }*/
    /*  /deep/.span {*/
    /*    height: 40px;*/
    /*  }*/
    /*}*/
  }
}
</style>
