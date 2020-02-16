<template>
  <div>
    <common-header title="银行卡绑定"></common-header>
    <div class="detail-info">
      <common-content-header title-value="卡信息"></common-content-header>
      <div class="info">
        <van-cell-group>
          <van-field
            v-model="acctName"
            clearable
            label="持卡人姓名："
            label-class="label-class"
            readonly
          />
          <van-field
            v-model="acctNo"
            label="卡         号："
            clearable
            label-class="label-class"
            placeholder="请输入卡号"
            @blur="getCardBinInfo"
          />
          <van-field
            v-model="bankName"
            label="银         行："
            label-class="label-class"
            placeholder="请选择银行"
            readonly
          />
        </van-cell-group>
      </div>
    </div>
    <div class="btn__lsg" @click="addCardEvent">添加</div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import commonContentHeader from "../components/commonContentHeader";
import { mapGetters, mapActions } from "vuex";
import CardBin from "chinabankbin";
export default {
  components: {
    commonHeader,
    commonContentHeader
  },
  data() {
    return {
      acctName: "",
      acctNo: "",
      bankName: "",
      bankCode: "",
      cardType: "",
      cardTypeName: ""
    };
  },
  mounted() {
    this.acctName = this.getPersonalInfo.custName;
  },
  methods: {
    ...mapActions(["requestBankList", "addBankCard"]),
    async addCardEvent() {
      if (this.cardType !== "DC") {
        this.$toast("请绑定借记卡");
        return;
      }
      let card = await this.addBankCard({
        acctNo: this.acctNo,
        acctName: this.acctName,
        bankName: this.bankName,
        bankCode: this.bankCode,
        cardType: this.cardType,
        cardTypeName: this.cardTypeName
      });
      if (card && card.retCode === "00000") {
        this.$toast("绑定成功");
        this.$router.replace({
          path: "/myBankCard"
        });
      }
    },

    /**
     * 获取银行卡信息
     */
    async getCardBinInfo() {
      // promise 方式调用, 2.0.0 及以上版本支持
      if (!this.acctNo || this.acctNo.length < 10) {
        this.bankName = "";
        this.bankCode = "";
        this.cardType = "";
        this.cardTypeName = "";
        return;
      }
      try {
        const res = await new CardBin(this.acctNo);
        if (res && res.validated) {
          this.bankName = res.data.bankName;
          this.bankCode = res.data.bankCode;
          this.cardType = res.data.cardType;
          this.cardTypeName = res.data.cardTypeName;
        }
      } catch (e) {
        this.$toast(`${e.msg}, 请重新输入卡号`);
        this.cardNo = "";
        this.bankName = "";
        this.bankCode = "";
        this.cardType = "";
        this.cardTypeName = "";
      }
    }
  },
  computed: {
    ...mapGetters(["getPersonalInfo"])
  }
};
</script>

<style lang="less" scoped>
.detail-info {
  margin: 9px 15px 0 15px;
  border-radius: 5px;
  .info {
    border-radius: 0 0 5px 5px;
    /deep/ .label-class {
      white-space: pre-wrap;
      color: @chooseColor;
      font-family: @pfSC;
    }
    /deep/ .van-cell:not(:last-child)::after {
      border-bottom: none;
    }
  }
}
</style>
