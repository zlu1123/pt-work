<template>
  <div class="settlement-feedback">
    <common-header title="工资单反馈"></common-header>
    <div class="title">反馈记录</div>
    <div class="content" v-for="(item, index) of feedbackList" :key="index">
      <div class="feedback-title">
        反馈内容 2019-11-08 20:00:05
      </div>
      <div class="feedback-content">
        工资结算不正确
      </div>
      <div class="reply-title">
        回复信息 2019-11-08 20:00:05
      </div>
      <div class="reply-content">
        结算没问题，正常按照1小时12元，10小时结算工资120元。
      </div>
    </div>
    <div class="title">反馈</div>
    <van-cell-group>
      <van-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        placeholder="请输入您的反馈内容..."
        border
      />
    </van-cell-group>
    <div class="feedback-submit">
      提交
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import { Divider, Field, CellGroup } from "vant"
export default {
  name: "settlementFeedback",
  components: {
    commonHeader,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      feedbackList: [1, 1],
      message: ""
    }
  }
}
</script>

<style lang="less" scoped>
  .settlement-feedback {
    .title {
      height: 31px;
      font-size: @fs12;
      font-family: @pfSC;
      color: @tipColor;
      background: @bgColor;
      padding-left: 15px;
      line-height: 31px;
    }
    .content {
      background: @itemColor;
      padding: 0 15px;
      margin-bottom: 10px;
      .feedback-title {
        padding: 11px 0;
        font-size: @fs12;
        font-family: @pfSC;
        color: @tipColor;
        border-bottom: 1px solid @dividerBgColor;
      }
      .feedback-content {
        font-size: @fs15;
        font-family: @pfSC;
        line-height: @fs21;
        color: @titleColor;
        padding: 9px 0 14px;
        border-bottom: 1px solid @dividerBgColor;
      }
      .reply-title {
        padding: 11px 0;
        font-size: @fs12;
        font-family: @pfSC;
        color: @tipColor;
        border-bottom: 1px solid @dividerBgColor;
      }
      .reply-content {
        font-size: @fs15;
        font-family: @pfSC;
        line-height: @fs21;
        color: @titleColor;
        padding: 9px 0 14px;
      }
    }
    .feedback-submit {
      margin: 30px 15px 27px;
      height: 52px;
      text-align: center;
      line-height: 52px;
      background: @myselfListTitleColor;
      border-radius: 5px;
      font-size: @fs18;
      font-family: @yhUI;
      color: @myselfNameColor;
    }
  }
</style>
