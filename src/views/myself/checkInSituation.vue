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
    <div class="check-in-btn" v-if="unPostion && !showTip" @click="checkIn">
      {{ getBtnshow }}
    </div>
    <div class="tip" v-if="showTip">
      {{ tip }}
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import checkInListItem from "./common/checkInListItem";
import { clockInOrSignOut, queryCurrentDayClock } from "../../service/api";
import { mapGetters, mapActions } from "vuex";
import { formatDate, formatDatemmss } from "../../plugins/util";

export default {
  name: "checkInSituation",
  components: {
    commonHeader,
    checkInListItem
  },
  data() {
    return {
      checkInList: [],
      unPostion: false, // 是否有可打卡职位
      positionInfo: {},
      showTip: false,
      tip: "您的下班打卡记录已经被审核，无法更新!!!"
    };
  },
  mounted() {
    this.getCheckPostionInfo();
  },
  methods: {
    ...mapActions(["requestPersonalInfo"]),
    getCheckPostionInfo() {
      queryCurrentDayClock({
        selectFlag: "01" // 当日查询
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          if (res.data.data) {
            let positonInfo = res.data.data.postionInfo;
            if (positonInfo && Object.keys(positonInfo).length > 0) {
              this.unPostion = true;
              this.positonInfo = positonInfo;
              this.checkInList = this.getCheckInfo(
                res.data.data.clockInfo,
                positonInfo
              );
            } else {
              this.unPostion = false;
            }
          } else {
            this.$toast("您当前无可打卡职位，请先报名");
          }
        }
      });
    },

    listSort(arr) {
      let sortArr = arr.sort((a, b) => {
        return a.clockType - b.clockType;
      });
      return sortArr;
    },

    getCheckInfo(info, positonInfo) {
      let clockList = this.listSort(info);
      let upList = clockList.filter(item => item.clockType === "1");
      let downList = clockList.filter(item => item.clockType === "2");
      let list = [];
      if (upList.length > 0) {
        let checkInfo = {
          checkInTime: positonInfo.clockBeginDate,
          positionName: positonInfo.postionName,
          checkInFlag: "up",
          alreadyCheckIn: formatDatemmss(upList[upList.length - 1].clockTime)
        };
        list.push(checkInfo);
        if (downList.length > 0) {
          let lastData = downList[downList.length - 1];
          let endClock = {
            checkInTime: positonInfo.clockEndDate,
            positionName: positonInfo.postionName,
            checkInFlag: "down",
            alreadyCheckIn: formatDatemmss(lastData.clockTime)
          };
          if (
            lastData.merchExamStat !== "01" ||
            lastData.platformExamStat !== "01"
          ) {
            this.showTip = true;
          }
          list.push(endClock);
        }
      }
      return list;
    },
    goPunchList() {
      this.$router.push({
        path: "/punchList"
      });
    },
    async checkIn() {
      if (!this.unPostion) {
        this.$toast("您当前无可打卡职位，请先报名");
        return;
      }
      if (Object.keys(this.getPersonalInfo).length === 0) {
        await this.requestPersonalInfo();
      }
      clockInOrSignOut({
        postionId: this.positonInfo.postionId,
        postionApplyId: this.positonInfo.postionApplyId,
        clockType: this.checkInList.length === 0 ? "1" : "2", // 1上班 2下班
        clockAddr: this.getLocationAdrr.join(","), // 经纬度
        currentDay: formatDate(new Date()), // new Date();
        postionName: this.positonInfo.postionName,
        workerName: this.getPersonalInfo.custName
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          this.$toast("打卡成功");
          this.getCheckPostionInfo();
        }
      });
    }
  },

  computed: {
    ...mapGetters(["getLocationInfo", "getPersonalInfo"]),

    getLocationAdrr() {
      let info = this.getLocationInfo;
      if (info && Object.keys(info).length > 0) {
        if (info.detail) {
          let location = info.detail.location;
          return [location.lng, location.lat];
        }
      }
      return [108.93984, 34.34127];
    },

    getBtnshow() {
      return this.checkInList && this.checkInList.length === 0
        ? "上班打卡"
        : "下班打卡";
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

.tip {
  padding: 10px;
  color: #f23800;
}
</style>
