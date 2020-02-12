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
import { mapGetters } from "vuex";
import { gettersName } from "../../common/constants";
import { formatDate } from "../../plugins/util";
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
      merchId: ""
    };
  },
  mounted() {
    this.getCheckPostionInfo();
  },
  methods: {
    getCheckPostionInfo() {
      queryCurrentDayClock().then(res => {
        if (res && res.data.retCode === "00000") {
          this.postionApplyId = res.data.data.postionInfo[0].postionApplyId;
          this.postionId = res.data.data.postionInfo[0].postionId;
          this.merchId = res.data.data.postionInfo[0].merchId;
          this.checkInList = this.getCheckInfo(res.data.data.clockInfo);
        }
      });
    },
    getCheckInfo(info) {
      let list = [];
      if (info.length > 0) {
        let checkInfo = {
          checkInTime: info[0].clockBeginDate,
          positionName: info[0].postionName,
          checkInFlag: "up",
          alreadyCheckIn: true
        };
        list.push(checkInfo);
        if (info[1]) {
          list[1].checkInTime = info[1].clockEndDate;
          list[1].positionName = info[1].postionId;
          list[1].checkInFlag = "down";
          list[1].alreadyCheckIn = true;
        }
      } else {
      }
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
        clockType: this.checkInList.length === 0 ? "1" : "2", // 1上班 2下班
        clockAddr: this.getLocationAdrr.join(","), // 经纬度
        currentDay: formatDate(new Date()) // new Date();
      });
    }
  },

  computed: {
    ...mapGetters([gettersName.getLocationInfo]),

    getLocationAdrr() {
      let info = this[gettersName.getLocationInfo];
      if (info && Object.keys(info).length > 0) {
        if (info.detail) {
          let location = info.detail.addressComponents.location;
          return [location.lng, location.lat];
        }
      }
      return [108.93984, 34.34127];
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
