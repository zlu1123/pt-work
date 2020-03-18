<template>
  <div class="list__item-content">
    <div class="list__item-title">
      <div class="left">{{ myItem.name }}</div>
      <div class="right" :class="myItem.isCertification ? 'isCer' : 'isNotCer'">
        {{ getTheStatus }}
      </div>
    </div>
    <div class="list__item-info" v-if="myItem.isCertification">
      <div class="list__item" v-if="myItem.path === 'idCertification'">
        <div class="left">
          <van-image
            lazy-load
            width="86"
            height="60"
            :src="getImgUrl(myItem.identImageAddr)"
          />
        </div>
        <div class="right">
          <div class="name" v-html="getName"></div>
          <div class="id-card">
            身份证号：<span>{{ myItem.certNo }}</span>
          </div>
        </div>
      </div>
      <div class="list__item" v-if="myItem.path === 'healthCertification'">
        <div class="content">
          <van-image
            lazy-load
            width="200"
            height="150"
            :src="getImgUrl(myItem.identImageAddr)"
          />
        </div>
      </div>
    </div>
    <div class="list__item__btn" v-else>
      <div class="in__btn" @click="goCertification">
        {{ getBtnText }}
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrlConfig } from "../../../service/baseUrl";

export default {
  name: "certificationListItem",
  props: {
    myItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },

  methods: {
    goCertification() {
      this.$emit("goCertification", this.myItem);
    },

    getImgUrl(img) {
      return baseUrlConfig.imgUrl + img;
    }
  },

  computed: {
    getName() {
      return `姓      名：<span style="color: #1E1B1B;">${this.myItem.custName}</span>`;
    },

    getTheStatus() {
      if (this.myItem.isCertification) {
        return "已认证";
      } else {
        if (this.myItem.waitApply === 1) {
          return "待审核";
        }
        return "未认证";
      }
    },

    getBtnText() {
      return this.myItem.waitApply === 1 ? "去修改" : "去认证";
    }
  }
};
</script>

<style lang="less" scoped>
.list__item-content {
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
  .list__item-info {
    .list__item {
      padding: 0 18px 0 11px;
      display: flex;
      justify-content: flex-start;
      .left {
        margin-top: 13px;
        padding-bottom: 21px;
      }
      .right {
        margin-left: 18px;
        div {
          margin-top: 19px;
          font-size: @fs13;
          font-family: @pfSC;
          line-height: @fs18;
          color: @chooseColor;
          span {
            color: @myCertificationColor;
          }
        }
        .name {
          white-space: pre-wrap;
        }
      }
      .content {
        padding: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
  .list__item__btn {
    padding-bottom: 20px;
    .in__btn {
      margin: 34px auto 0;
      width: 130px;
      height: 40px;
      background: @chooseColor;
      border-radius: 5px;
      font-size: 18px;
      font-family: @pfSC;
      line-height: 23px;
      color: @jobTitleBgColor;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
