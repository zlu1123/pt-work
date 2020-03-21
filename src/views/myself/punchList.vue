<template>
  <div>
    <uni-calendar
      :insert="true"
      :lunar="false"
      @change="change"
      @monthSwitch="monthSwitch"
      :selected="getSelectInfo"
    ></uni-calendar>
    <div class="punch-info">
      <div>
        上下班打卡
      </div>
      <div class="last">工作时长：{{ getWorkTime }}</div>
    </div>
    <div class="punch-list">
      <div class="left">
        <div>
          {{ postionInfo.clockBeginDate }}
        </div>
        <div class="divider"></div>
        <div>
          {{ postionInfo.clockEndDate }}
        </div>
      </div>
      <div class="right">
        <div class="in">
          <div>上班</div>
          <div class="last">上班打卡：{{ getStartTime }}</div>
        </div>
        <div class="out">
          <div>下班</div>
          <div class="last">下班打卡：{{ getEndTime }}</div>
        </div>
      </div>
    </div>
    <div class="position">
      <div>职位：{{ postionInfo.postionName }}</div>
    </div>
  </div>
</template>

<script>
import uniCalendar from "../components/uni-calendar/uni-calendar";
import { queryCurrentDayClock } from "../../service/api";
import {
  formatDateNormalyyyyMMdd,
  formatDatemmss,
  dateDiffHour
} from "../../plugins/util";
export default {
  name: "punchList",
  components: {
    uniCalendar
  },
  data() {
    return {
      postionInfo: {
        clockBeginDate: "--",
        clockEndDate: "--",
        postionName: "--"
      },
      clockInfo: [],
      currentMonth: formatDateNormalyyyyMMdd(new Date()),
      startTime: "",
      endTime: ""
    };
  },
  mounted() {
    this.getCheckInfoFormonth();
  },
  methods: {
    monthSwitch(e) {
      this.currentMonth =
        e.year + "-" + (e.month > 10 ? e.month : "0" + e.month) + "-" + "01";
      this.getCheckInfoFormonth();
    },
    change(e) {
      if (!e.backtoday) {
        if (
          e &&
          Object.keys(e).length > 0 &&
          Object.keys(e.extraInfo).length > 0 &&
          e.extraInfo.showInfo.length > 0
        ) {
          let list = e.extraInfo.showInfo;
          let tempObj = this.getFixListData(list, "clockType");
          for (const [key, value] of Object.entries(tempObj)) {
            let items = value.items;
            if (key === "1") {
              this.startTime = items[items.length - 1].createTime;
            } else {
              this.endTime = items[items.length - 1].createTime;
            }
          }
        } else {
          this.$toast("当天无打卡记录");
          this.startTime = "";
          this.endTime = "";
        }
      } else {
        this.currentMonth = e.year + "-" + e.month + "-" + "01";
        this.getCheckInfoFormonth();
      }
    },

    getFixListData(list, flag) {
      let obj = list.reduce((prev, item) => {
        if (prev[item[flag]] && prev[item[flag]].flag === item.flag) {
          prev[item[flag]].items.push({ ...item });
        } else {
          prev[item[flag]] = { ...item };
          prev[item[flag]].items = [{ ...item }];
        }
        return prev;
      }, {});
      return obj;
    },

    getCheckInfoFormonth() {
      queryCurrentDayClock({
        selectFlag: "02", // 当月查询
        currentMonth: this.currentMonth
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          if (res.data.data) {
            this.postionInfo = res.data.data.postionInfo;
            this.clockInfo = res.data.data.clockInfo;
            let nowDate = formatDateNormalyyyyMMdd(new Date());
            this.clockInfo.forEach(item => {
              item.clockTime = formatDateNormalyyyyMMdd(item.clockTime);
              if (nowDate === item.clockTime) {
                if (item.clockType === "1") {
                  this.startTime = item.createTime;
                } else {
                  this.endTime = item.createTime;
                }
              }
            });
          }
        }
      });
    }
  },
  computed: {
    getSelectInfo() {
      let list = this.clockInfo;
      let tempSelect = [];
      if (list && list.length > 0) {
        let tempArray = this.getFixListData(list, "clockTime");
        for (const [key, value] of Object.entries(tempArray)) {
          tempSelect.push({
            date: key,
            showInfo: value.items
          });
        }
      }
      return tempSelect;
    },

    getWorkTime() {
      return (
        (this.startTime && this.endTime
          ? dateDiffHour(this.startTime, this.endTime)
          : "--") + "小时"
      );
    },

    getStartTime() {
      return this.startTime ? formatDatemmss(this.startTime) : "--";
    },

    getEndTime() {
      return this.endTime ? formatDatemmss(this.endTime) : "--";
    }
  }
};
</script>

<style lang="less" scoped>
.punch-info {
  margin-top: 10px;
  background: @myselfNameColor;
  height: 50px;
  padding: 0 15px;
  font-size: @fs13;
  border-bottom: 1px solid @dividerBgColor;
  div {
    line-height: 25px;
  }
}
.punch-list {
  background: @myselfNameColor;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .right {
    margin-left: 20px;
    width: 100%;
    line-height: 25px;
    > div {
      height: 50px;
      width: 100%;
      &:first-child {
        border-bottom: 1px solid @dividerBgColor;
      }
    }
  }
}
.position {
  background: @myselfNameColor;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid @dividerBgColor;
}
.last {
  color: @tipColor;
}
</style>
