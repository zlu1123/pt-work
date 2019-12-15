<template>
  <div>
    <common-header title="打卡"></common-header>
    <div class="check-in-history">打卡记录</div>
    <div>
      <van-steps direction="vertical" :active="0">
        <check-in-list-item v-for="(item, index) of checkInList" :key="index" :check-in-item="item" :check-index="index"></check-in-list-item>
      </van-steps>
    </div>
    <div class="check-in-btn">
      {{checkInList.length >= 2 ? "下班打卡" : "上班打卡"}}
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import checkInListItem from "./common/checkInListItem";
import { Steps } from 'vant';
export default {
  name: "checkInSituation",
  components: {
    commonHeader,
    checkInListItem,
    [Steps.name]: Steps
  },
  data() {
    return {
      checkInList: [
        {
          checkInFlag: true
        },
        {
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .check-in-history {
    margin: 10px 15px;
    text-align: right;
    font-size: @fs12;
    font-family: @pfSC;
    line-height: @fs17;
    color: @chooseColor;
  }
  /deep/ .van-steps {
    background: @bgColor;
  }

  /deep/ .van-step--vertical:first-child::before {
    height: 0;
  }
  .check-in-btn {
    margin: 34px auto 0;
    width:130px;
    height:40px;
    background: @chooseColor;
    border-radius:5px;
    font-size:18px;
    font-family: @pfSC;
    line-height:23px;
    color: @jobTitleBgColor;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
