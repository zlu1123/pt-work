<template>
  <div class="list__item-content">
    <div class="list__item-title">
      <div class="left">{{myItem.name}}</div>
      <div class="right" :class="myItem.isCertification ? 'isCer' : 'isNotCer' ">{{myItem.isCertification ? '已认证' : '未认证'}}</div>
    </div>
    <div class="list__item-info">
      <div class="left">
        <van-image
          width="86"
          height="60"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="right">
        <div class="name">姓      名：<span>李江涛</span></div>
        <div class="id-card">身份证号：<span>610303015957426523</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from "vant"
export default {
  name: "certificationListItem",
  props: {
    myItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  components: {
    [Image.name]: Image
  }
}
</script>

<style lang="less" scoped>
.list__item-content {
  margin: 10px 15px;
  background: @jobTitleBgColor;
  border-radius:5px;
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
      font-weight:bold;
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
  }
}
</style>
