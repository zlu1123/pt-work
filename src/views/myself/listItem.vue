<template>
  <div class="myself__list__item" @click.stop="goListPage">
    <div>{{itemData.name}}</div>
    <div v-if="itemData.value">
      {{itemData.value}}
    </div>
    <img v-else :src="defaultImgUrl" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    itemData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      defaultImgUrl: './img/myself/fanhui@2x.png'
    }
  },
  methods: {
    goListPage() {
      this.$emit('goToNextPage');
    }
  }
}
</script>

<style lang="less" scoped>
  .myself__list__item {
    padding: 0 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      font-size: @fs15;
      color: @titleColor;
      font-family: @pfSC;
    }
    img {
      width: 14px;
      height: 14px;
    }
  }
</style>
