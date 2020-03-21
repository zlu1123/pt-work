<template>
  <div class="myself-content">
    <div class="myself-info">
      <div>
        <van-image
          round
          fit
          width="70"
          height="70"
          lazy-load
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="myself-detail">
        <div class="name-verified">
          <div class="name ellipsis">微信昵称：{{ personalInfo.userName }}</div>
          <div class="verified">
            {{ personalInfo.isCert === "1" ? "已" : "未" }}认证
          </div>
        </div>
        <div class="tel-num" v-if="personalInfo.mainMobile">
          电话号码：{{ personalInfo.mainMobile }}
        </div>
        <div v-if="personalInfo.custName">
          用户姓名：{{ personalInfo.custName }}
        </div>
      </div>
    </div>
    <div class="myself-info-list">
      <div class="info-list">
        <div class="list-title"><span>个人信息</span></div>
        <list-item
          v-for="(item, index) of infoList"
          :key="index"
          :item-data="item"
          @goToNextPage="goToNextPage(item)"
        ></list-item>
      </div>
      <div class="login-out" @click="loginOut">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import listItem from "./common/listItem.vue";
import { mapActions, mapGetters } from "vuex";
import { userLoginOut } from "../../service/api";
import { localData } from "../../plugins/local";
export default {
  name: "",
  components: {
    listItem
  },
  data() {
    return {
      infoList: [
        {
          name: "工资单",
          path: "/payRoll"
        },
        {
          name: "我的认证",
          path: "/myCertification"
        },
        {
          name: "银行卡信息",
          path: "/myBankCard"
        },
        {
          name: "个人信息维护",
          path: "/personalInfo"
        },
        // {
        //   name: "保险"
        // },
        // {
        //   name: "违约记录",
        //   path: "/breachInfo"
        // },
        {
          name: "打卡情况",
          path: "/checkInSituation"
        }
      ],
      personalInfo: ""
    };
  },

  async mounted() {
    await this.requestPersonalInfo();
    this.personalInfo = this.getPersonalInfo;
  },

  methods: {
    ...mapActions(["requestPersonalInfo", "requestBankList"]),

    async goToNextPage(item) {
      if (item.path === "/myBankCard") {
        if (this.getPersonalInfo.isCert !== "1") {
          this.$toast("您暂未进行身份证实名认证，请先认证");
          return;
        } else {
          await this.requestBankList();
          if (!this.getBandCardList || this.getBandCardList.length === 0) {
            item.path = "/addBankCard";
          }
        }
      } else if (
        item.path === "/personalInfo" ||
        item.path === "/checkInSituation"
      ) {
        if (this.getPersonalInfo.isCert !== "1") {
          this.$toast("您暂未进行身份证实名认证，请先认证");
          return;
        }
      }
      this.$router.push({
        path: item.path
      });
    },

    loginOut() {
      userLoginOut().then(res => {
        if (res && res.data.retCode === "00000") {
          localData("clean", "userInfo");
        }
      });
    }
  },

  computed: {
    ...mapGetters(["getPersonalInfo", "getBandCardList"])
  },

  async activated() {
    await this.requestPersonalInfo();
    this.personalInfo = this.getPersonalInfo;
  }
};
</script>

<style lang="less" scoped>
.myself-content {
  position: relative;
  .myself-info {
    display: flex;
    background: @chooseColor;
    padding: 35px 18px 64px 28px;
    .myself-detail {
      margin-left: 18px;
      color: @myselfNameColor;
      width: -webkit-fill-available;
      .name-verified {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 18px;
          font-family: @pfSC;
          font-weight: bold;
          flex: 5;
        }
        .verified {
          flex: 1;
          font-size: 12px;
          border: 1px solid @myselfNameColor;
          padding: 1px 2px;
          border-radius: 1px;
        }
      }
      .tel-num {
        margin-top: 11px;
        font-size: 15px;
        font-family: @pfSC;
      }
    }
  }
  .myself-info-list {
    position: absolute;
    top: 153px;
    left: 15px;
    right: 15px;
    .info-list {
      border-radius: 10px;
      background: @itemColor;
      .list-title {
        height: 50px;
        background: @myselfListTitle;
        border-radius: 10px 10px 0px 0px;
        display: flex;
        align-items: center;
        span {
          opacity: 1;
          font-size: 15px;
          margin-left: 20px;
          font-family: @yhUI;
          font-weight: bold;
          color: @myselfListTitleColor;
        }
      }
    }
  }
  .login-out {
    margin-top: 98px;
    margin-bottom: 50px;
    height: 52px;
    border: 2px solid #d2d2d2;
    border-radius: 5px;
    font-size: @fs18;
    font-family: @pfSC;
    text-align: center;
    line-height: 52px;
  }
}
</style>
