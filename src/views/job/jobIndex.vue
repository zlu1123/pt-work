<template>
  <div class="job-index-content">
    <div class="job-header">
      零活工
    </div>
    <van-tabs v-model="active"
              class="job-tabble" sticky
              line-width="60px"
              line-height="4px"
              color="#21A675"
              title-active-color="#21A675"
              title-inactive-color="#333333">
      <van-tab name="accepted" title="已录取">
        <van-list
          v-model="acceptedLoading"
          :finished="acceptedFinished"
          finished-text="没有更多了"
          @load="acceptedOnLoad">
          <position-list-item v-for="(item, index) of acceptedList" :key="index" :listItem="item"></position-list-item>
        </van-list>
      </van-tab>
      <van-tab name="settled" title="已结算">
        <van-list
          v-model="settledLoading"
          :finished="settledFinished"
          finished-text="没有更多了"
          @load="settledOnLoad">
          <position-list-item v-for="(item, index) of settledList" :key="index" :listItem="item"></position-list-item>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant"
import postionListItem from "../position/common/postionListItem";
export default {
  name: "",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [postionListItem.name]: postionListItem
  },
  data() {
    return {
      active: "accepted",
      acceptedList: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ],
      acceptedLoading: false,
      acceptedFinished: false,
      settledList: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ],
      settledLoading: false,
      settledFinished: false
    }
  },
  methods: {
    acceptedOnLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.acceptedList.push(this.acceptedList[i]);
        }
        // 加载状态结束
        this.acceptedLoading = false;

        // 数据全部加载完成
        if (this.acceptedList.length >= 40) {
          this.acceptedFinished = true;
        }
      }, 500);
    },
    settledOnLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.settledList.push(this.settledList[i]);
        }
        // 加载状态结束
        this.settledLoading = false;

        // 数据全部加载完成
        if (this.settledList.length >= 40) {
          this.settledFinished = true;
        }
      }, 500);
    }
  }
}
</script>

<style lang="less" scoped>
  .job-index-content {
    background: @bgColor;
    .job-header {
      height: 58px;
      background: @jobTitleBgColor;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @fs18;
      font-family: @pfSC;
      font-weight: bold;
      color: @chooseColor;
    }
    .job-tabble {
      margin-top: 10px;
      margin-bottom: 50px;
      /*height: 40px;*/
      /*/deep/ .van-tabs__wrap {*/
      /*  height: 40px;*/
      /*  .van-tab {*/
      /*    line-height: 40px;*/
      /*  }*/
      /*  /deep/.span {*/
      /*    height: 40px;*/
      /*  }*/
      /*}*/
    }
  }
</style>
