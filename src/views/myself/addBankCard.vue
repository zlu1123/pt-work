<template>
  <div>
    <common-header title="银行卡绑定"></common-header>
    <div class="detail-info">
      <common-content-header title-value="卡信息"></common-content-header>
      <div class="info">
        <van-cell-group>
          <van-field
            v-model="cardName"
            clearable
            label="持卡人姓名："
            label-class="label-class"
            readonly
          />
          <van-field
            v-model="cardNo"
            label="卡         号："
            clearable
            maxlength="18"
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
import { cardAdd } from "../../service/api";
import { mapGetters } from "vuex";
import cardBin from "bankcardinfo";
export default {
  components: {
    commonHeader,
    commonContentHeader
  },
  data() {
    return {
      cardName: "",
      cardNo: "",
      bankName: ""
    };
  },
  mounted() {
    this.cardName = this.getPersonalInfo.custName;
  },
  methods: {
    addCardEvent() {
      cardAdd({
        cardNo: this.cardNo,
        cardName: this.cardName
      }).then(res => {
        console.log(res);
      });
    },

    /**
     * 获取银行卡信息
     */
    getCardBinInfo() {
      // promise 方式调用, 2.0.0 及以上版本支持
      if (!this.cardNo || this.cardNo.length < 10) {
        return;
      }
      cardBin
        .getBankBin(this.cardNo)
        .then(res => {
          this.bankName = `${res.bankName}--${res.cardTypeName}`;
        })
        .catch(err => {
          if (err) {
            this.$toast(`${err.split(",")[0].split(":")[1]}, 请重新输入卡号`);
            this.cardNo = "";
          }
        });
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
