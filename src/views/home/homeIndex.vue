<template>
  <div class="home-index-content">
    <div>
      <position-index v-show="active === 'position'"></position-index>
      <job-index v-show="active === 'job'"></job-index>
      <myself-index v-show="active === 'myself'"></myself-index>
    </div>
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item name="position" icon="logistics">职位</van-tabbar-item>
      <van-tabbar-item name="job" icon="sign">工作</van-tabbar-item>
      <van-tabbar-item name="myself" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant"
import myselfIndex from "../myself/myselfIndex"
import positionIndex from "../position/positionIndex"
import jobIndex from "../job/jobIndex"
export default {
  name: "homeIndex",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    myselfIndex,
    positionIndex,
    jobIndex
  },
  data() {
    return {
      active: "myself"
    }
  }
}
</script>
<style lang="less" scoped>
  .home-index-content {
    overflow: hidden;
  }
</style>
