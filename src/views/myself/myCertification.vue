<template>
  <div>
    <common-header title="我的认证"></common-header>
    <certification-list-item v-for="(item, index) of certificationList" :my-item="item" :key="index"></certification-list-item>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import certificationListItem from "./common/certificationListItem";
export default {
  name: "myCertification",
  components: {
    commonHeader,
    certificationListItem
  },
  data() {
    return {
      certificationList: [
        {
          name: "实名认证",
          isCertification: 1
        },
        {
          name: "健康认证"
        }
      ]
    }
  }
};
</script>

<style lang="less" scoped></style>
