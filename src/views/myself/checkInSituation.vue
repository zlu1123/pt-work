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
      {{ getBtnshow }}
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import checkInListItem from "./common/checkInListItem";
import { clockInOrSignOut, queryCurrentDayClock } from "../../service/api";
import { mapGetters } from "vuex";
import { gettersName } from "../../common/constants";
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
      postionApplyId: "",
      postionId: "",
      merchId: "",
      unPostion: false // 是否有可打卡职位
    };
  },
  mounted() {
    this.getCheckPostionInfo();
  },
  methods: {
    getCheckPostionInfo() {
      queryCurrentDayClock().then(res => {
        if (res && res.data.retCode === "00000") {
          let positonInfo = res.data.data.postionInfo;
          if (positonInfo && Object.keys(positonInfo).length > 0) {
            this.unPostion = true;
            this.postionApplyId = positonInfo.postionApplyId;
            this.postionId = positonInfo.postionId;
            // this.merchId = res.data.data.postionInfo.merchId;
            this.checkInList = this.getCheckInfo(
              res.data.data.clockInfo,
              positonInfo
            );
          } else {
            this.unPostion = false;
          }
        }
      });
    },
    getCheckInfo(info, positonInfo) {
      let list = [];
      if (info.length > 0) {
        let checkInfo = {
          checkInTime: positonInfo.clockBeginDate,
          positionName: positonInfo.postionName,
          checkInFlag: "up",
          alreadyCheckIn: formatDatemmss(info[0].clockTime)
        };
        list.push(checkInfo);
        if (info[1]) {
          let endClock = {
            checkInTime: positonInfo.clockEndDate,
            positionName: positonInfo.postionName,
            checkInFlag: "down",
            alreadyCheckIn: formatDatemmss(info[1].clockTime)
          };
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
    checkIn() {
      if (!this.unPostion) {
        this.$toast("您当前无可打卡职位，请先报名");
        return;
      }
      clockInOrSignOut({
        // merchId: this.merchId,
        postionId: this.postionId,
        postionApplyId: this.postionApplyId,
        clockType: this.checkInList.length === 0 ? "1" : "2", // 1上班 2下班
        clockAddr: this.getLocationAdrr.join(","), // 经纬度
        currentDay: formatDate(new Date()) // new Date();
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          this.$toast("打卡成功");
          this.getCheckPostionInfo();
        }
      });
    }
  },

  computed: {
    ...mapGetters([gettersName.getLocationInfo]),

    getLocationAdrr() {
      debugger;
      let info = this[gettersName.getLocationInfo];
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
</style>
