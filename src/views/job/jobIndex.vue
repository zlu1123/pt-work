<template>
  <div class="job-index-content">
    <common-list-header :content-data="showData">
      <van-list
        slot="firstList"
        v-model="acceptedLoading"
        :finished="acceptedFinished"
        finished-text="没有更多了"
        @load="acceptedOnLoad"
      >
        <div
          v-for="(item, index) of acceptedList"
          :key="index"
          v-show="item.exemStat !== '1'"
        >
          <common-list-des @goJobMap="goJobMapDetail"></common-list-des>
          <position-list-item
            :listItem="item"
            @goJobDetail="goJobDetail"
            @cancelRegistration="cancelJob(item)"
          ></position-list-item>
        </div>
      </van-list>
      <van-list
        slot="lastList"
        v-model="settledLoading"
        :finished="settledFinished"
        finished-text="没有更多了"
        @load="settledOnLoad"
      >
        <div v-for="(item, index) of settledList" :key="index">
          <common-list-des :show-des="false"></common-list-des>
          <position-list-item
            :listItem="item"
            @checkInDetail="goCheckIn"
          ></position-list-item>
        </div>
      </van-list>
    </common-list-header>
  </div>
</template>

<script>
import commonListHeader from "../components/commonListHeader";
import positionListItem from "../position/common/positionListItem";
import commonListDes from "../components/commonListDes";
import { applyList, disRoll } from "../../service/api";
export default {
  name: "jobIndex",
  components: {
    positionListItem,
    commonListHeader,
    commonListDes
  },
  data() {
    return {
      showData: {
        title: "零时工",
        firstName: "已录取",
        lastName: "已结算"
      },
      acceptedList: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          status: "accepted"
        }
      ],
      acceptedLoading: false,
      acceptedFinished: false,
      settledList: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-2.jpg",
          settled: "settled"
        }
      ],
      settledLoading: false,
      settledFinished: false,
      postionApplyId: ""
    };
  },
  methods: {
    acceptedOnLoad() {
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.acceptedList.push(this.acceptedList[i]);
      //   }
      //   // 加载状态结束
      //   this.acceptedLoading = false;
      //   // 数据全部加载完成
      //   if (this.acceptedList.length >= 40) {
      //     this.acceptedFinished = true;
      //   }
      // }, 500);
      applyList().then(res => {
        // { applyExemStat: 2 }
        this.acceptedList = this.fixApplyList(res.data.data);
        // 循环增加职位名称
        this.acceptedFinished = true;
      });
    },

    fixApplyList(list) {
      let newList = [];
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].applyExemStat === "3") {
            continue;
          }
          newList.push(list[i]);
        }
      }
      return newList;
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
        if (this.settledList.length >= 10) {
          this.settledFinished = true;
        }
      }, 500);
    },
    goCheckIn() {
      this.$router.push({
        path: "/punchList"
      });
    },
    goJobDetail(item) {
      this.$router.push({
        path: "/jobDetail",
        query: {
          postionId: item.postionId,
          isNotShowBtn: true
        }
      });
    },
    cancelJob(item) {
      this.postionApplyId = item.postionApplyId;
      this.$dialog.confirm({
        title: "提醒",
        message: `确认取消该职位申请吗？`,
        beforeClose: this.beforeClose
      });
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        // setTimeout(done, 1000);
        // 刷新当前页面
        disRoll({
          postionApplyId: this.postionApplyId
        }).then(res => {
          if (res.data.retCode === "00000") {
            this.$toast("取消报名成功");
            done();
          }
        });
      } else {
        done();
      }
    },
    goJobMapDetail() {
      this.$router.push({
        path: "/routeNavigation"
      });
    },
    disRollPostion(item) {}
  }
};
</script>

<style lang="less" scoped>
.job-index-content {
  background: @bgColor;
}
</style>
