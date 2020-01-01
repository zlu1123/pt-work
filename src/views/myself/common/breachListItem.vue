<template>
  <div class="brean__item">
    <div class="first">
      <div>
        违约时间：2020年1月1日
      </div>
      <div>
        违约职位：顺风速递职位
      </div>
    </div>
    <div class="second">
      违约信息：报名成功，未按照规定到达指定地点上班
    </div>
    <div class="third">
      <div>
        处理状态：<span
          :class="breachItem.status === 1 ? 'alreadyColor' : 'notColor'"
          >{{ breachItem.status === 1 ? "已处理" : "未处理" }}</span
        >
      </div>
      <div v-show="breachItem.status !== 1" class="breach__btn">
        <div>去处理</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breachItem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.brean__item {
  background: @itemColor;
  padding: 0 10px 10px;
  margin-bottom: 10px;
  font-size: @fs12;
  .first {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .second {
    padding-top: 10px;
  }
  .third {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .breach__btn {
      border: 1px solid @chooseRedColor;
      border-radius: 2px;
      color: @chooseRedColor;
      div {
        padding: 2px 5px;
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
