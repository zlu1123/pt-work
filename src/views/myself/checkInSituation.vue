<template>
  <div>
    <common-header title="打卡"></common-header>
    <div class="check-in-history" @click="goPunchList">打卡记录</div>
    <div>
      <van-steps direction="vertical" :active="0">
        <check-in-list-item
          v-for="(item, index) of checkInList"
          :key="index"
          :check-in-item="item"
          :check-index="index"
        ></check-in-list-item>
      </van-steps>
    </div>
    <div class="check-in-btn" @click="checkIn">
      {{ checkInList.lenght === 2 ? "下班打卡" : "上班打卡" }}
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import checkInListItem from "./common/checkInListItem";
import { clockInOrSignOut, queryCurrentDayClock } from "../../service/api";
export default {
  name: "checkInSituation",
  components: {
    commonHeader,
    checkInListItem
  },
  mounted() {
    queryCurrentDayClock({}).then(res => {
      this.postionApplyId = res.data.data[0].postionApplyId;
      this.postionId = res.data.data[0].postionId;
      this.merchId = res.data.data[0].merchId;
      this.checkInList = this.getCheckInfo(res.data.data[0]);
    });
  },
  data() {
    return {
      checkInList: [],
      postionApplyId: "",
      postionId: "",
      merchId: ""
    };
  },
  methods: {
    getCheckInfo(info) {
      let list = [];
      let checkInfo = {
        checkInTime: info.clockBeginDate,
        positionName: info.postionId,
        checkInFlag: "up",
        alreadyCheckIn: ""
      };
      list.push(checkInfo);
      // list[1].checkInTime = info.clockEndDate;
      // list[1].positionName = info.postionId;
      // list[1].checkInFlag = "down";
      // list[1].alreadyCheckIn = "";
      return list;
    },
    goPunchList() {
      this.$router.push({
        path: "/punchList"
      });
    },
    checkIn() {
      clockInOrSignOut({
        merchId: this.merchId,
        postionId: this.postionId,
        postionApplyId: this.postionApplyId,
        clockType: "2", // 1上班 2下班
        clockAddr: "112312", // 经纬度
        currentDay: "20200107" // new Date();
      });
    }
  }
};
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
  width: 130px;
  height: 40px;
  background: @chooseColor;
  border-radius: 5px;
  font-size: 18px;
  font-family: @pfSC;
  line-height: 23px;
  color: @jobTitleBgColor;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
