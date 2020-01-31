<template>
  <div>
    <common-header title="我的认证"></common-header>
    <certification-list-item
      v-for="(item, index) of certificationList"
      :my-item="item"
      :key="index"
      @goCertification="goToApprove"
    ></certification-list-item>
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
          path: "idCertification",
          isCertification: 0
        },
        {
          name: "健康认证",
          path: "healthCertification",
          isCertification: 0
        }
      ]
    };
  },
  methods: {
    goToApprove(item) {
      this.$router.push({
        path: `/${item.path}`
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
