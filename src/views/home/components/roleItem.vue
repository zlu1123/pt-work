<template>
  <div class="role__item" @click.stop="selectRole">
    <div class="left">
      <div>
        <van-image
          round
          width="80px"
          height="80px"
          :src="roleInfo.roleImg"
        />
      </div>
      <span>
        {{roleInfo.name}}
      </span>
    </div>
    <div class="right">
      <img :src="defaultImgUrl" alt="">
    </div>
  </div>
</template>

<script>
import { Image } from "vant"
export default {
  name: "roleItem",
  props: {
    roleInfo: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  components: {
    [Image.name]: Image
  },
  data() {
    return {
      defaultImgUrl: './img/myself/fanhui@2x.png'
    }
  },
  methods: {
    selectRole() {
      this.$emit("selectRole")
    }
  }
}
</script>

<style lang="less" scoped>
.role__item {
  background: @itemColor;
  margin: 0 15px 10px 15px;
  border-radius:5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    >div {
      margin: 15px 30px 15px 21px;
    }
    span {
      font-size: @fs18;
      font-family: @pfSC;
      font-weight:bold;
      line-height:25px;
      color: @selectRoleColor;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 11px;
    img {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
