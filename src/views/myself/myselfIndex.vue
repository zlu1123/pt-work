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
          <div class="name">微信用户45565</div>
          <div class="verified">已认证</div>
        </div>
        <div class="tel-num">电话号码：15509186643</div>
        <div>用户姓名：{{ personalInfo.userName }}</div>
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
      <div class="login-out" @click="test">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import listItem from "./common/listItem.vue";
import { mapActions } from "vuex";
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
          // path: "/idCertification"
        },
        {
          name: "银行卡信息",
          path: "/myBankCard"
        },
        {
          name: "个人信息维护",
          path: "/personalInfo"
        },
        {
          name: "保险"
        },
        {
          name: "违约记录",
          path: "/breachInfo"
        },
        {
          name: "打卡情况",
          path: "/checkInSituation"
        }
      ],
      personalInfo: ""
    };
  },

  mounted() {
    this.getPersonalInfo();
  },

  methods: {
    ...mapActions(["requestPersonalInfo"]),

    getPersonalInfo() {
      this.requestPersonalInfo().then(res => {
        if (res && res.data.retCode === "00000") {
          this.personalInfo = res.data.data;
        }
      });
    },

    goToNextPage(item) {
      this.$router.push({
        path: item.path
      });
    },
    test() {}
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
        }
        .verified {
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
