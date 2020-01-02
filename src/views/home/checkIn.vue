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
          v-for="(item, index) of acceptedList"
          :key="index"
          :listItem="item"
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
        ></punch-info-list-item>
      </van-list>
    </common-list-header>
    <van-dialog
      v-model="showDialogFlag"
      title="打卡审核"
      show-cancel-button
      class="dialog__radio"
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
      settledFinished: false,
      showDialogFlag: false,
      radio: "",
      reasonForRejection: ""
    };
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
    },
    checkIn(item) {
      this.showDialogFlag = true;
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
