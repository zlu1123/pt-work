<template>
  <van-step class="step">
    <div slot="active-icon" class="already-step"></div>
    <div slot="inactive-icon" class="other-step"></div>
    <div class="check-in-info">
      <div class="arrow"></div>
      <div class="info">
        <div class="title">
          <div>职位：{{ checkInItem.positionName }}</div>
          <div v-if="checkInItem.alreadyCheckIn" class="already-check-in">
            已打卡
          </div>
          <div v-else class="un-check-in">未打卡</div>
        </div>
        <div class="go">
          {{ checkInItem.checkInFlag === "up" ? "上班" : "下班" }}时间
          {{ checkInItem.checkInTime }}
        </div>
        <div class="out" v-if="checkInItem.alreadyCheckIn">
          打卡时间 {{ checkInItem.alreadyCheckIn }}
        </div>
      </div>
    </div>
  </van-step>
</template>

<script>
export default {
  name: "checkInListItem",
  props: {
    checkInItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.step {
  /deep/ .van-steps {
    background: @bgColor;
  }

  /deep/ .van-step__circle-container {
    top: 25px;
  }
}
.already-step {
  width: 12px;
  height: 12px;
  background: @chooseColor;
  border-radius: 50%;
}
.other-step {
  width: 12px;
  height: 12px;
  background: @otherStepColor;
  border-radius: 50%;
}
.check-in-info {
  display: flex;
  justify-content: flex-start;
  .arrow {
    margin-top: 10px;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent @itemColor transparent transparent;
  }
  .info {
    padding: 0 14px 0 20px;
    background: @jobTitleBgColor;
    width: -webkit-fill-available;
    .title {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: @fs15;
      font-family: @pfSC;
      font-weight: bold;
      line-height: @fs21;
      color: @titleColor;
      .already-check-in {
        font-size: @fs12;
        line-height: @fs17;
        color: @chooseColor;
      }
      .un-check-in {
        font-size: @fs12;
        line-height: @fs17;
        color: @tipColor;
      }
    }
    .go {
      margin: 11px 0 10px;
      font-size: @fs12;
      font-family: @pfSC;
      line-height: @fs17;
      color: @titleColor;
    }
    .out {
      margin: 5px 0 10px;
      font-size: @fs12;
      font-family: @pfSC;
      line-height: @fs17;
      color: @titleColor;
    }
  }
}
</style>
