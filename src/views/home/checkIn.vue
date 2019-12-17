<template>
  <div>
    <common-list-header :content-data="showData">
      <van-list
        slot="firstList"
        v-model="acceptedLoading"
        :finished="acceptedFinished"
        finished-text="没有更多了"
        @load="acceptedOnLoad">
        <punch-info-list-item v-for="(item, index) of acceptedList" :key="index" :listItem="item"></punch-info-list-item>
      </van-list>
      <van-list
        slot="lastList"
        v-model="settledLoading"
        :finished="settledFinished"
        finished-text="没有更多了"
        @load="settledOnLoad">
        <punch-info-list-item v-for="(item, index) of settledList" :key="index" :listItem="item" ></punch-info-list-item>
      </van-list>
    </common-list-header>
  </div>
</template>

<script>
import commonListHeader from "../components/commonListHeader";
import punchInfoListItem from "./components/punchInfoListItem";
import { List } from "vant"

export default {
  name: "checkIn",
  components: {
    commonListHeader,
    punchInfoListItem,
    [List.name]: List
  },
  data() {
    return {
      showData: {
        title: "零活工",
        firstName: '待审核',
        lastName: "已审核"
      },
      acceptedList: [
        {
          name: "顺丰快递分派员（顺丰）",
          isCheckIn: true,
          workInfo: [
            {
              label: "打 卡 人",
              value: "李江涛"
            },
            {
              label: "打卡类型",
              value: "上班"
            },
            {
              label: "打卡时间",
              value: "8:55:12"
            }
          ]
        }
      ],
      acceptedLoading: false,
      acceptedFinished: false,
      settledList: [
        {
          name: "顺丰快递分派员（顺丰）",
          isCheckIn: false,
          workInfo: [
            {
              label: "打 卡 人",
              value: "李江涛"
            },
            {
              label: "打卡类型",
              value: "上班"
            },
            {
              label: "打卡时间",
              value: "8:55:12"
            }
          ]
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
        if (this.settledList.length >= 10) {
          this.settledFinished = true;
        }
      }, 500);
    }
  }
}
</script>

<style scoped>

</style>
