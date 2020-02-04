<template>
  <div>
    <common-list-des></common-list-des>
    <div class="pay-roll-claimed">
      <div class="title">
        <div>职位：顺丰快递分派员（顺丰）</div>
        <div>12元/小时</div>
      </div>
      <div v-if="!listItem.claimed" class="receive-time">
        领取时间：2019-11-08 20:00:05
      </div>
      <div class="work-time">工作日期：2019-11-08 至 2019-11-08</div>
      <div class="card-record">
        <div class="pay-money">结算金额：120元</div>
        <div class="btn-list-info">
          <div class="btn-list" v-if="!listItem.claimed" @click.stop="feedback">
            <span>结算反馈</span>
          </div>
          <div class="btn-list"><span>打卡记录</span></div>
          <div
            class="btn-received"
            v-if="!listItem.claimed"
            @click.stop="receivePay"
          >
            <span>领取</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonListDes from "../../components/commonListDes";
export default {
  name: "payRollListItem",
  props: {
    listItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  components: {
    commonListDes
  },
  methods: {
    feedback() {
      this.$emit("billFeedback");
    },
    receivePay() {
      this.$emit("getPayOff");
    }
  }
};
</script>

<style lang="less" scoped>
.pay-roll-claimed {
  background: @jobTitleBgColor;
  padding: 0 15px;
  .title {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: @fs15;
    font-family: @pfSC;
    font-weight: bold;
    color: @titleColor;
    line-height: @fs21;
    div:last-child {
      font-size: @fs13;
      font-family: @pfSC;
      font-weight: normal;
    }
  }
  .receive-time {
    font-size: @fs13;
    font-family: @pfSC;
    font-weight: bold;
    line-height: @fs18;
    color: @tipColor;
    margin-top: 9px;
  }
  .work-time {
    font-size: @fs13;
    font-family: @pfSC;
    font-weight: bold;
    line-height: @fs18;
    color: @tipColor;
    margin-top: 11px;
    padding-bottom: 7px;
    border-bottom: 1px solid @dividerBgColor;
  }
  .card-record {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pay-money {
      font-size: @fs15;
      font-family: @pfSC;
      line-height: @fs21;
      color: @chooseRedColor;
    }
    .btn-list-info {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn-list {
        margin-left: 4px;
        font-size: @fs12;
        font-family: @pfSC;
        line-height: @fs17;
        color: @chooseColor;
        border: 1px solid @chooseColor;
        span {
          padding: 4px 5px;
        }
      }
      .btn-received {
        margin-left: 4px;
        background: @chooseRedColor;
        border-radius: 2px;
        border: 1px solid @chooseRedColor;
        font-size: @fs12;
        font-family: @pfSC;
        line-height: @fs17;
        color: @jobTitleBgColor;
        span {
          padding: 4px 17px;
        }
      }
    }
  }
}
</style>
