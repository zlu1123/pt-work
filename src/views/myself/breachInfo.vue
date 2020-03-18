<template>
  <div>
    <common-list-header :content-data="showData">
      <van-list
        slot="firstList"
        v-model="unprocessedLoading"
        :finished="unprocessedFinished"
        finished-text="没有更多了"
        @load="unprocessedOnLoad"
      >
        <breach-list-item
          v-for="(item, index) of unprocessedBreachList"
          :key="index"
          :breach-item="item"
        ></breach-list-item>
      </van-list>
      <van-list
        slot="lastList"
        v-model="processedLoading"
        :finished="processedFinished"
        finished-text="没有更多了"
        @load="processedOnLoad"
      >
        <breach-list-item
          v-for="(item, index) of processedBreachList"
          :key="index"
          :breach-item="item"
        ></breach-list-item>
      </van-list>
    </common-list-header>
  </div>
</template>

<script>
import commonListHeader from "../components/commonListHeader";
import breachListItem from "./common/breachListItem";
export default {
  components: {
    commonListHeader,
    breachListItem
  },
  data() {
    return {
      showData: {
        title: "违约信息",
        firstName: "未处理",
        lastName: "已处理"
      },
      unprocessedLoading: false,
      unprocessedFinished: false,
      unprocessedBreachList: [{ status: 1 }],
      processedLoading: false,
      processedFinished: false,
      processedBreachList: [{ status: 2 }]
    };
  },
  methods: {
    unprocessedOnLoad() {},
    processedOnLoad() {}
  }
};
</script>

<style></style>
