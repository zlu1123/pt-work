<template>
  <div class="home-index-content">
    <div>
      <position-index v-if="active === 'position'"></position-index>
      <job-index v-if="active === 'job'"></job-index>
      <myself-index v-if="active === 'myself'"></myself-index>
    </div>
    <van-tabbar
      v-model="active"
      active-color="#3B7960"
      inactive-color="#B3B3B3"
    >
      <van-tabbar-item name="position">
        <span>职位</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? positionIcon.active : positionIcon.inactive"
          class="position-img"
        />
      </van-tabbar-item>
      <van-tabbar-item name="job">
        <span>工作</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? jobIcon.active : jobIcon.inactive"
          class="job-img"
        />
      </van-tabbar-item>
      <van-tabbar-item name="myself">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? myIcon.active : myIcon.inactive"
          class="my-img"
      /></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import myselfIndex from "../myself/myselfIndex";
import positionIndex from "../position/positionIndex";
import jobIndex from "../job/jobIndex";
export default {
  name: "homeIndex",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    myselfIndex,
    positionIndex,
    jobIndex
  },
  mounted() {},
  data() {
    return {
      active: "myself",
      positionIcon: {
        active: "./img/home/position-img.png",
        inactive: "./img/home/position-img-unchoose.png"
      },
      jobIcon: {
        active: "./img/home/job-img.png",
        inactive: "./img/home/job-img-unchoose.png"
      },
      myIcon: {
        active: "./img/home/my-img.png",
        inactive: "./img/home/my-img-unchoose.png"
      }
    };
  },
  activated() {}
};
</script>
<style lang="less" scoped>
.position-img {
  width: 20px;
  height: 20px;
}

.job-img {
  width: 24px;
  height: 24px;
}

.my-img {
  width: 24px;
  height: 24px;
}
</style>
