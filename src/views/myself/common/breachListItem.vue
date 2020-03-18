<template>
  <div>
    <common-list-des :showDes="false">
      <div v-show="breachItem.status === 1" class="breach__btn">
        <div>去处理</div>
      </div>
    </common-list-des>
    <div class="brean__item">
      <div
        class="content"
        v-for="(item, index) of getBreachInfo()"
        :key="index"
      >
        <span>{{ item.label }}：</span><span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import commonListDes from "../../components/commonListDes";
export default {
  props: {
    breachItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  components: {
    commonListDes
  },
  methods: {
    getBreachInfo() {
      let breachInfo = [
        {
          label: "违约时间",
          value: "2018年10月8号"
        },
        {
          label: "违约信息",
          value: "报名成功，未按照规定到达指定地点上班11111111"
        }
      ];
      return breachInfo;
    }
  }
};
</script>

<style lang="less" scoped>
.breach__btn {
  border: 1px solid @chooseRedColor;
  border-radius: 2px;
  color: @chooseRedColor;
  div {
    padding: 2px 5px;
  }
}
.brean__item {
  background: @itemColor;
  padding: 0 15px 10px;
  .content {
    white-space: pre-wrap;
    font-size: @fs15;
    font-family: @pfSC;
    color: @titleColor;
    padding-top: 7px;
    display: flex;
    justify-content: flex-start;
    span {
      &:first-child {
        flex: 2;
      }
      &:last-child {
        flex: 5;
      }
    }
  }
}

.alreadyColor {
  color: @chooseColor;
}
.notColor {
  color: @chooseRedColor;
}
</style>
