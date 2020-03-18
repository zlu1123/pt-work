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
        <punch-info-list-item
          v-for="(item, index) of isCheckInList"
          :key="index"
          :listItem="item"
          :isCheckIn="false"
          @checkInPunchInfo="checkIn(item)"
        ></punch-info-list-item>
      </van-list>
      <van-list
        slot="lastList"
        v-model="settledLoading"
        :finished="settledFinished"
        finished-text="没有更多了"
        @load="settledOnLoad"
      >
        <punch-info-list-item
          v-for="(item, index) of settledList"
          :key="index"
          :listItem="item"
          :isCheckIn="true"
        ></punch-info-list-item>
      </van-list>
    </common-list-header>
    <van-dialog
      v-model="showDialogFlag"
      title="打卡审核"
      show-cancel-button
      class="dialog__radio"
      @confirm="examTheRecord"
      @cancel="quitExam"
      confirmButtonColor="#21A675"
    >
      <van-radio-group v-model="radio" class="dialog_radio_select">
        <van-radio name="1" checked-color="#21A675">通过</van-radio>
        <van-radio name="2" checked-color="#F23800 ">驳回</van-radio>
      </van-radio-group>
      <van-cell-group v-if="radio === '2'" class="dialog_reject">
        <van-field
          v-model="reasonForRejection"
          rows="1"
          autosize
          label="驳回原因"
          type="textarea"
          placeholder="驳回原因"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import commonListHeader from "../components/commonListHeader";
import punchInfoListItem from "./components/punchInfoListItem";
import {
  enterpisePunchCardRecord,
  examCardRecordList
} from "../../service/api";
import { flatten } from "underscore";

export default {
  name: "checkIn",
  components: {
    commonListHeader,
    punchInfoListItem
  },
  data() {
    return {
      showData: {
        title: "零活工",
        firstName: "待审核",
        lastName: "已审核"
      },
      isCheckInList: [],
      acceptedLoading: false,
      acceptedFinished: false,
      settledList: [],
      settledLoading: false,
      settledFinished: false,
      showDialogFlag: false,
      radio: "",
      reasonForRejection: "",
      checkInItem: {}
    };
  },
  methods: {
    acceptedOnLoad() {
      enterpisePunchCardRecord({
        examStat: "01"
      }).then(res => {
        if (res.data.retCode === "00000") {
          this.isCheckInList = this.flattenArray(res.data.data);
          this.acceptedFinished = true;
        }
      });
    },
    settledOnLoad() {
      enterpisePunchCardRecord({
        examStat: "02"
      }).then(res => {
        if (res.data.retCode === "00000") {
          this.settledList = this.flattenArray(res.data.data);
          this.settledFinished = true;
        }
      });
    },

    checkIn(item) {
      this.showDialogFlag = true;
      this.checkInItem = item;
      this.reasonForRejection = "";
    },

    /**
     * 将多维数组转换成一维数组
     */
    flattenArray(arr) {
      return [].concat(...arr.map(x => (Array.isArray(x) ? flatten(x) : x)));
    },

    quitExam() {
      this.showDialogFlag = false;
      this.checkInItem = {};
      this.reasonForRejection = "";
    },

    examTheRecord() {
      if (this.radio === "2") {
        if (!this.reasonForRejection) {
          this.$notify({ type: "danger", message: "请填写驳回原因" });
          return;
        }
      }
      examCardRecordList({
        postionApplyId: this.checkInItem.postionApplyId,
        currentDay: this.checkInItem.clockTime,
        clockType: this.checkInItem.clockType,
        platformExamStat: this.radio === "1" ? "02" : "03", // 02 通过，03 不通过
        refuseMsg: this.reasonForRejection
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          this.$toast("审核完成");
        }
      });
    }
  },
  watch: {
    radio(val) {
      if (!val || val === "1") {
        this.reasonForRejection = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.dialog__radio {
  .dialog_radio_select {
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .dialog_reject {
    margin: 20px;
  }
}
</style>
