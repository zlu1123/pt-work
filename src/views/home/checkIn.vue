<template>
  <div>
    <div class="login-out" @click="loginOut">
      退出登录
    </div>
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
      @confirm="confirmType"
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
  enterpiseExamCardRecordList,
  platformerPunchCardRecord,
  examCardRecordList,
  userLoginOut
} from "../../service/api";
import { localData } from "../../plugins/local";
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
      checkInItem: {},
      userType: ""
    };
  },
  mounted() {
    this.userType = this.$route.query.userType;
  },
  methods: {
    confirmType() {
      if (this.userType === "03") {
        this.examEnterpiseRecord();
      } else {
        this.examTheRecord();
      }
    },

    acceptedOnLoad() {
      if (this.userType === "03") {
        enterpisePunchCardRecord({
          merchExamStat: "01"
        }).then(res => {
          if (res.data.retCode === "00000") {
            this.isCheckInList = this.flattenArray(res.data.data);
            this.acceptedFinished = true;
          }
        });
      } else {
        platformerPunchCardRecord({
          plaformExamStat: "01"
        }).then(res => {
          if (res.data.retCode === "00000") {
            this.isCheckInList = this.flattenArray(res.data.data);
            this.acceptedFinished = true;
          }
        });
      }
    },

    settledOnLoad() {
      if (this.userType === "03") {
        enterpisePunchCardRecord({
          merchExamStat: "02"
        }).then(res => {
          if (res.data.retCode === "00000") {
            this.settledList = this.flattenArray(res.data.data);
            this.settledFinished = true;
          }
        });
      } else {
        platformerPunchCardRecord({
          plaformExamStat: "02"
        }).then(res => {
          if (res.data.retCode === "00000") {
            this.settledList = this.flattenArray(res.data.data);
            this.settledFinished = true;
          }
        });
      }
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

    /**
     * 企业审核
     */
    examEnterpiseRecord() {
      if (this.radio === "2") {
        if (!this.reasonForRejection) {
          this.$notify({ type: "danger", message: "请填写驳回原因" });
          return;
        }
      }
      let param = {
        id: this.checkInItem.id,
        refuseMsg: this.reasonForRejection,
        merchExamStat: this.radio === "1" ? "02" : "03" // 02 通过，03 不通过
      };
      enterpiseExamCardRecordList(param).then(res => {
        if (res && res.data.retCode === "00000") {
          this.$toast("审核完成");
          this.acceptedOnLoad();
        }
      });
    },

    /**
     * 平台审核
     */
    examTheRecord() {
      if (this.radio === "2") {
        if (!this.reasonForRejection) {
          this.$notify({ type: "danger", message: "请填写驳回原因" });
          return;
        }
      }
      let param = {
        postionApplyId: this.checkInItem.postionApplyId,
        currentDay: this.checkInItem.clockTime,
        clockType: this.checkInItem.clockType,
        refuseMsg: this.reasonForRejection,
        platformExamStat: this.radio === "1" ? "02" : "03"
      };
      examCardRecordList(param).then(res => {
        if (res && res.data.retCode === "00000") {
          this.$toast("审核完成");
        }
      });
    },

    loginOut() {
      this.$dialog.confirm({
        title: "提醒",
        message: `您确认退出当前角色吗？`,
        confirmButtonColor: "#21A675",
        beforeClose: this.userLoginOutMethod
      });
    },

    userLoginOutMethod(action, done) {
      if (action === "confirm") {
        userLoginOut().then(res => {
          if (res && res.data.retCode === "00000") {
            localData("clean", "userInfo");
            done();
            this.$router.replace("/selectRole");
          }
        });
      } else {
        done();
      }
    },

    /**
     * 查询平台待审核列表
     */
    getPlatformerWait() {
      platformerPunchCardRecord({
        merchExamStat: "02",
        plaformExamStat: "01"
      }).then(res => {
        if (res.data.retCode === "00000") {
          this.settledList = this.flattenArray(res.data.data);
          this.settledFinished = true;
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
.login-out {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 52px;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  font-size: @fs18;
  font-family: @pfSC;
  text-align: center;
  line-height: 52px;
}
</style>
