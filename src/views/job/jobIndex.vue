<template>
  <div>
    <van-tabs type="card" v-model="chooseIndex">
      <van-tab name="accepted" title="已录取">内容 1</van-tab>
      <van-tab name="settled" title="已结算">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant"
export default {
  name: "",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: "chooseIndex"
    }
  }
}
</script>

<style lang="less" scoped>
</style>
