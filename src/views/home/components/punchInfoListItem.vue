<template>
  <div class="check__list__item">
    <div class="title">
      <div class="left">{{ listItem.postionId }}</div>
      <div
        class="right"
        @click.stop="checkInPunchInfo"
        :style="{ color: isCheckIn ? '#F23800' : '#21A675' }"
      >
        {{ isCheckIn ? "已" : "" }}审核
      </div>
    </div>
    <div class="content" v-for="(item, index) of getWorkInfo()" :key="index">
      {{ item.label }}：<span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
import { formatDatehhmmss } from "../../../plugins/util";
export default {
  name: "punchInfoListItem",
  props: {
    listItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    isCheckIn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkInPunchInfo() {
      if (!this.isCheckIn) {
        this.$emit("checkInPunchInfo");
      }
    },
    getWorkInfo() {
      let workInfo = [
        {
          label: "打 卡 人",
          value: this.listItem.userId
        },
        {
          label: "打卡类型",
          value: this.listItem.clockType === "1" ? "上班" : "下班"
        },
        {
          label: "打卡时间",
          value: formatDatehhmmss(this.listItem.clockTime)
        }
      ];
      return workInfo;
    }
  }
};
</script>

<style lang="less" scoped>
.check__list__item {
  background: @itemColor;
  padding: 0 15px 10px;
  margin-top: 10px;
  .title {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid @dividerBgColor;
    .left {
      font-size: @fs15;
      font-family: @pfSC;
      font-weight: bold;
      color: @titleColor;
    }
    .right {
      font-size: @fs12;
      font-family: @pfSC;
      color: @chooseColor;
    }
  }
  .content {
    white-space: pre-wrap;
    font-size: @fs12;
    font-family: @pfSC;
    color: @titleColor;
    margin-top: 7px;
  }
}
</style>
