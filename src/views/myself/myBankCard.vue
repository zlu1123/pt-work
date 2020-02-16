<template>
  <div>
    <div class="my-bank-content">
      <div class="list__item-title">
        <div class="left">已绑定卡</div>
      </div>
      <card-list-item
        v-for="(item, index) of cardList"
        :card-item="item"
        :key="index"
        :last="index === cardList.length - 1"
      ></card-list-item>
    </div>
    <div class="btn__lsg" @click="addCard">银行卡绑定</div>
  </div>
</template>

<script>
import cardListItem from "./common/cardListItem";
import { mapGetters } from "vuex";
import https from "https";
import { baseUrlConfig } from "../../service/baseUrl";

export default {
  name: "myBankCard",
  components: {
    cardListItem
  },
  data() {
    return {
      cardList: []
    };
  },

  mounted() {
    this.cardList = this.getBandCardList;
    if (this.cardList.length > 0) {
      this.getCardLogo(this.cardList);
    }
  },

  methods: {
    initAsyncApi(tCardType) {
      https
        .get(
          "https://apimg.alipay.com/combo.png?d=cashier&t=" + tCardType,
          res => {
            if (res.statusCode === 200) {
              let chunk = "";
              res.on("data", d => {
                chunk += d;
              });
              res.on("end", () => {
                try {
                  var bankInfo = JSON.parse(chunk);
                  if (bankInfo.validated) {
                    // let info = {};
                  } else {
                    this.$toast(tCardType + ":该银行卡LOGO不存在");
                  }
                } catch (e) {
                  this.$toast(
                    tCardType + ":获取alipay接口信息出错了,返回json格式不正确"
                  );
                }
              });
            } else {
              this.$toast(
                tCardType +
                  ":获取alipay接口信息出错了,statusCode," +
                  res.statusCode
              );
            }
          }
        )
        .on("error", e => {
          this.$toast(tCardType + ":获取alipay接口信息出错了");
        });
    },
    getCardLogo(list) {
      list.forEach(item => {
        item.imgUrl = baseUrlConfig.bankLogoAnother + item.bankCode + ".png";
      });
      // let tCardType = "";
      // for (let item of list) {
      //   tCardType += item.bankCode;
      // }
      // this.initAsyncApi(tCardType);
    },
    addCard() {
      this.$router.push({
        path: "/addBankCard"
      });
    }
  },

  computed: {
    ...mapGetters(["getBandCardList"])
  }
};
</script>

<style lang="less" scoped>
.my-bank-content {
  margin: 10px 15px;
  background: @jobTitleBgColor;
  border-radius: 5px;
  .list__item-title {
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px 0 15px;
    border-bottom: 1px solid @dividerBgColor;
    font-family: @pfSC;
    .left {
      font-size: @fs15;
      font-weight: bold;
      line-height: @fs21;
      color: @tipColor;
    }
    .right {
      font-size: @fs13;
      line-height: @fs18;
    }
    .isCer {
      color: @chooseColor;
    }
    .isNotCer {
      color: @chooseRedColor;
    }
  }

  /deep/ .list__item-content .list__item:last-child {
    border-bottom: none;
  }
}
</style>
