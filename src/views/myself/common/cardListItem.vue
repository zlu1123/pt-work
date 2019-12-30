<template>
  <div class="card__list__item" v-if="!lastEnd">
    <van-image width="80px" height="80px" class="image" src="" alt="" />
    <div class="info">
      <div class="title">银行卡号</div>
      <div class="card__No">6225 **** **** 8888</div>
    </div>
  </div>
  <div v-else class="card__add">
    请绑卡
  </div>
</template>

<script>
export default {
  props: {
    lastEnd: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style lang="less" scoped>
.card__list__item {
  background: @itemColor;
  height: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 10px 10px 10px;
  border-radius: 10px;
  .image {
    margin-left: 10px;
  }
  .info {
    margin-left: 10px;
  }
}
.card__add {
  background: @itemColor;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 10px 10px;
  border-radius: 10px;
}
</style>
