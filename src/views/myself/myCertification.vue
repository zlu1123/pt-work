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
import { mapGetters } from "vuex";
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
          isCertification: 0,
          waitApply: 0,
          personalInfo: {}
        },
        {
          name: "健康认证",
          path: "healthCertification",
          isCertification: 0,
          waitApply: 0,
          personalInfo: {}
        }
      ]
    };
  },
  mounted() {
    if (Object.keys(this.getPersonalInfo).length > 0) {
      if (this.getPersonalInfo.isCert === "1") {
        this.certificationList[0].isCertification = 1;
        this.certificationList[0] = Object.assign(
          this.certificationList[0],
          this.getPersonalInfo
        );
      } else {
        if (this.getPersonalInfo.custName && this.getPersonalInfo.certNo) {
          this.certificationList[0].isCertification = 0;
          this.certificationList[0].waitApply = 1;
        }
      }
      if (this.getPersonalInfo.healthImageAddr) {
        this.certificationList[1].isCertification = 1;
        this.certificationList[1] = Object.assign(
          this.certificationList[1],
          this.getPersonalInfo
        );
      }
    }
  },
  methods: {
    goToApprove(item) {
      this.$router.push({
        path: `/${item.path}`
      });
    }
  },

  computed: {
    ...mapGetters(["getPersonalInfo"])
  }
};
</script>

<style lang="less" scoped></style>
