<template>
  <div class="list__item">
    <div class="list__item__img">
      <img v-lazy="listItem.imgUrl"
           alt="">
    </div>
    <div class="list__item__content">
      <div class="list__item__content-tilte">
        <div>顺丰快递分派员（顺丰）</div>
        <div>1.5km</div>
      </div>
      <div class="list__item__content-time">
        <span>11月12日</span>
        <span>共一天</span>
        <span>9:00</span>
      </div>
      <div class="list__item__content-type">
        <div>次日结</div>
      </div>
      <div class="list__item__content-cast">
        12元/小时
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'positionListItem',
  props: {
    listItem: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.list__item {
  margin: 10px 0 0;
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
      div:last-child {
        font-size: 13px;
        line-height: 18px;
        color: @tipColor;
      }
    }
    .list__item__content-time {
      margin-top: 2px;
      font-size: 13px;
      color: @tipColor;
      text-align: left;
      span:nth-child(2){
        margin-left: 13px;
      }
      span:last-child {
        margin-left: 13px;
      }
    }
    .list__item__content-type {
      font-size:12px;
      color: @chooseRedColor;
      text-align: left;
      display: flex;
      div {
        border:1px solid @chooseRedColor;
        padding: 1px 3px;
        border-radius: 2px;
      }
    }
    .list__item__content-cast {
      margin-top: 7px;
      font-size:15px;
      color: @chooseRedColor
    }
  }
}
</style>
