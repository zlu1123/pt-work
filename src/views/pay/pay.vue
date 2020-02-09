<template>
  <div class="pay-content">
    <van-cell-group>
      <van-cell title="企业名称" :value="merchInfo.merchName" size="large" />
      <van-cell
        title="职位名称"
        :value="postionInfo.postionName"
        size="large"
      />
      <van-cell
        title="充值金额"
        :value="`${moneyUnit + consumptionTotal}`"
        value-class="money_span"
        size="large"
      />
    </van-cell-group>
    <div class="pay-btn" @click="confirmMoney">确认支付</div>
  </div>
</template>

<script>
import { enterpiseRecharge } from "../../service/api";
import { mapActions, mapGetters } from "vuex";
import { baseUrlConfig } from "../../service/baseUrl";
// import { getWechatPay } from "../../plugins/wechatUtil";
export default {
  data() {
    return {
      moneyUnit: "￥：",
      consumptionTotal: 0.01, // 消费总金额
      merchId: "",
      postionId: "",
      merchInfo: {},
      postionInfo: {}
    };
  },
  async mounted() {
    this.merchId = this.$route.query.merchId;
    this.postionId = this.$route.query.positionId;
    await this.requestAllMerchListInfo();
    let merchInfo = this.getTheMerchInfo(this.merchId);
    if (merchInfo && Object.keys(merchInfo).length > 0) {
      this.merchInfo = merchInfo;
    }
    await this.requestAllPositionInfo(this.merchId);
    let postionInfo = this.getThePostionInfo(this.postionId);
    if (postionInfo && Object.keys(postionInfo).length > 0) {
      this.postionInfo = postionInfo;
    }
  },
  methods: {
    ...mapActions(["requestAllMerchListInfo", "requestAllPositionInfo"]),
    confirmPay(data) {
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.package,
          signType: data.signType, // 微信签名方式：
          paySign: data.sign // 微信签名
        },
        // eslint-disable-next-line space-before-function-paren
        function(res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            console.log(111);
          } else {
            console.log(222);
          }
        }
      );
      // getWechatPay(data, this.getPayResult);
    },

    getPayResult(data) {
      console.log(data);
    },

    // 确认买单打开去支付弹框
    confirmMoney() {
      enterpiseRecharge({
        merchId: this.merchId,
        postionId: this.postionId,
        rechargeAmt: (this.consumptionTotal * 100).toString()
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          this.confirmPay(res.data.data);
        }
      });
    },

    // 关闭去支付弹框
    closeGoPay() {
      this.isConfirmPay = false;
    },
    getTheImg(url) {
      return baseUrlConfig.imgUrl + url;
    }
  },

  computed: {
    ...mapGetters(["getTheMerchInfo", "getThePostionInfo"])
  }
};
</script>

<style lang="less" scoped>
.pay-content {
  padding-top: 50px;
}
.money_span {
  font-size: 20px;
  color: @chooseRedColor;
}
.pay-btn {
  margin: 30px 15px 27px 15px;
  height: 52px;
  text-align: center;
  line-height: 52px;
  background: @myselfListTitleColor;
  border-radius: 5px;
  font-size: @fs18;
  font-family: @yhUI;
  color: @myselfNameColor;
}
</style>
