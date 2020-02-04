<template>
  <div>
    <common-list-header :content-data="showData">
      <van-list
        slot="firstList"
        v-model="acceptedLoading"
        :finished="acceptedFinished"
        finished-text="没有更多了"
        @load="acceptedOnLoad"
      >
        <pay-roll-list-item
          v-for="(item, index) of acceptedList"
          :key="index"
          :listItem="item"
        ></pay-roll-list-item>
      </van-list>
      <van-list
        slot="lastList"
        v-model="settledLoading"
        :finished="settledFinished"
        finished-text="没有更多了"
        @load="settledOnLoad"
      >
        <pay-roll-list-item
          v-for="(item, index) of settledList"
          :key="index"
          :listItem="item"
          @billFeedback="billFeedback(item)"
          @getPayOff="getPayOff"
        ></pay-roll-list-item>
      </van-list>
    </common-list-header>
  </div>
</template>

<script>
import commonListHeader from "../components/commonListHeader";
import payRollListItem from "./common/payRollListItem";
import { List } from "vant";
import { payRollInfo } from "../../service/api";
export default {
  name: "payRoll",
  components: {
    commonListHeader,
    payRollListItem,
    [List.name]: List
  },
  data() {
    return {
      showData: {
        title: "工资单",
        firstName: "已领取",
        lastName: "未领取"
      },
      acceptedList: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          claimed: "claimed"
        }
      ],
      acceptedLoading: false,
      acceptedFinished: false,
      settledList: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-2.jpg"
        }
      ],
      settledLoading: false,
      settledFinished: false,
      pageSize: 20,
      pageNum: 1
    };
  },

  mounted() {},

  methods: {
    /**
     * 领取工资
     */
    getPayOff() {
      this.$router.push({
        path: "/getPaid"
      });
    },
    acceptedOnLoad() {
      // 异步更新数据
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
      payRollInfo({
        pageSize: this.pageSize.toString(),
        pageNum: this.pageNum.toString()
      }).then(res => {
        const resData = res.data.data;
        if (resData.list) {
          this.acceptedList = this.acceptedList.concat(resData.list);
          if (!resData.hasNextPage) {
            this.acceptedFinished = true;
          } else {
            this.pageNum++;
          }
        }
        this.acceptedLoading = false;
      });
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
    billFeedback(item) {
      this.$router.push({
        path: "/settlementFeedback"
      });
    }
  }
};
</script>

<style scoped></style>
