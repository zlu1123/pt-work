<template>
  <div class="list__item" @click.stop="goJobDetail">
    <div class="list__item__img">
      <img v-lazy="getImgUrl" alt="" />
    </div>
    <div class="list__item__content">
      <div class="list__item__content-tilte">
        <div>{{ listItem.postionName }}({{ listItem.releasEmerchName }})</div>
        <div
          v-if="listItem.applyExemStat === '1'"
          class="cancel-registration"
          @click.stop="cancelRegistration"
        >
          取消报名
        </div>
        <div
          v-else-if="listItem.settled"
          class="cancel-registration"
          @click.stop="checkInDetail"
        >
          打卡详情
        </div>
        <div v-else-if="listItem.distance" class="distance">
          {{ (listItem.distance / 1000).toFixed(1) }}km
        </div>
      </div>
      <div class="list__item__content-time">
        <span>{{ getWorkBeginDate(listItem.workBeginDate) }}</span>
        <span
          >共{{
            getIntervalDays(listItem.workEndDate, listItem.workBeginDate)
          }}天</span
        >
        <span>{{ listItem.clockBeginDate }}</span>
      </div>
      <div class="list__item__content-type">
        <div>{{ getBillTypeName(listItem.billtype) }}</div>
      </div>
      <div class="list__item__content-cast">{{ listItem.price }}元/小时</div>
    </div>
  </div>
</template>

<script>
import { formatDateMMDD, dateDiff } from "../../../plugins/util";
import { billTypeName } from "../../../common/constants";
import { baseUrlConfig } from "../../../service/baseUrl";
export default {
  name: "positionListItem",
  props: {
    listItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    getWorkBeginDate(date) {
      return formatDateMMDD(date);
    },
    getIntervalDays(endDate, startDate) {
      return dateDiff(endDate, startDate);
    },
    getBillTypeName(billtype) {
      return billTypeName[billtype];
    },
    goJobDetail() {
      this.$emit("goJobDetail", this.listItem);
    },
    cancelRegistration() {
      // 取消报名
      this.$emit("cancelRegistration");
    },
    checkInDetail() {
      this.$emit("checkInDetail"); // 打卡详情
    }
  },

  computed: {
    getImgUrl() {
      return baseUrlConfig.imgUrl + this.listItem.postionImg;
    }
  }
};
</script>

<style lang="less" scoped>
.list__item {
  margin: 0 0 10px;
  background: @itemColor;
  padding: 0 15px;
  display: flex;
  justify-content: flex-start;
  .list__item__img {
    display: flex;
    padding: 10px 0;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .list__item__content {
    margin-left: 14px;
    width: -webkit-fill-available;
    .list__item__content-tilte {
      margin-top: 10px;
      font-size: 15px;
      font-weight: bold;
      color: @titleColor;
      opacity: 1;
      display: flex;
      justify-content: space-between;
      .cancel-registration {
        font-size: @fs12;
        font-family: @pfSC;
        color: @chooseColor;
      }
      .distance {
        font-size: @fs13;
        color: @tipColor;
      }
    }
    .list__item__content-time {
      margin-top: 2px;
      font-size: 13px;
      color: @tipColor;
      text-align: left;
      span:nth-child(2) {
        margin-left: 13px;
      }
      span:last-child {
        margin-left: 13px;
      }
    }
    .list__item__content-type {
      font-size: 12px;
      color: @chooseRedColor;
      text-align: left;
      display: flex;
      div {
        border: 1px solid @chooseRedColor;
        padding: 1px 3px;
        border-radius: 2px;
      }
    }
    .list__item__content-cast {
      margin-top: 7px;
      font-size: 15px;
      color: @chooseRedColor;
    }
  }
}
</style>
