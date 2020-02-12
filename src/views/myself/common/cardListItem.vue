<template>
  <div class="list__item-content">
    <div class="list__item" :class="last ? 'no-border-bottom' : ''">
      <div class="left">
        <van-image lazy-load width="60" height="60" :src="cardItem.imgUrl" />
      </div>
      <div class="right">
        <div class="name">{{ cardItem.bankName }}</div>
        <div class="id-card">
          <span>{{ cardItem.acctNo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrlConfig } from "../../../service/baseUrl";
export default {
  props: {
    cardItem: {
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      type: Object
    },
    last: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    getImgUrl(img) {
      return baseUrlConfig.imgUrl + img;
    }
  }
};
</script>

<style lang="less" scoped>
.list__item-content {
  margin: 10px 15px;
  background: @jobTitleBgColor;
  border-radius: 5px;
  border-bottom: 1px solid @dividerBgColor;
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
        // color: @chooseColor;
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

.no-border-bottom {
  border-bottom: none;
}
</style>
