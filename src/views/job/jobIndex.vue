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
          <common-list-des
            v-if="item"
            :title-name="item.releasEmerchName"
            @goJobMap="goJobMapDetail(item)"
          ></common-list-des>
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
import { applyList, disRoll, queryBillInfo } from "../../service/api";
import { mapGetters } from "vuex";
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
      acceptedList: [],
      acceptedLoading: false,
      acceptedFinished: false,
      settledList: [],
      settledLoading: false,
      settledFinished: false,
      postionApplyId: "",
      pageSize: "20",
      pageNum: "1"
    };
  },
  methods: {
    acceptedOnLoad() {
      // // 异步更新数据
      applyList({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
        .then(res => {
          if (res && res.data.retCode === "00000") {
            const resData = res.data.data;
            if (resData.list) {
              this.acceptedList = this.acceptedList.concat(resData.list);
              if (!resData.hasNextPage) {
                // 循环增加职位名称
                this.acceptedFinished = true;
              } else {
                this.pageNum++;
              }
            }
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.acceptedFinished = true;
        });
    },

    fixApplyList(list) {
      let newList = [];
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].applyExemStat === "3" || list[i].applyExemStat === "1") {
            continue;
          }
          newList.push(list[i]);
        }
      }
      return newList;
    },

    settledOnLoad() {
      queryBillInfo({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
        .then(res => {
          if (res && res.data.retCode === "00000") {
            const resData = res.data.data;
            if (resData.list) {
              this.settledList = this.settledList.concat(
                this.fixApplyList(resData.list)
              );
              if (!resData.hasNextPage) {
                // 循环增加职位名称
                this.settledFinished = true;
              } else {
                this.pageNum++;
              }
            }
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.settledFinished = true;
        });
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
            this.acceptedList = [];
            this.acceptedOnLoad();
          }
          done();
        });
      } else {
        done();
      }
    },
    goJobMapDetail(item) {
      if (Object.keys(this.getLocationInfo).length === 0) {
        return;
      }
      this.$router.push({
        path: "/routeNavigation",
        query: {
          postionLngLat: item.postionLngLat,
          postionAddr: item.postionAddr
        }
      });
    },
    disRollPostion(item) {}
  },

  computed: {
    ...mapGetters(["getLocationInfo"])
  }
};
</script>

<style lang="less" scoped>
.job-index-content {
  background: @bgColor;
}
</style>
