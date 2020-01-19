<template>
  <div class="select-role-content">
    <div class="title">请选择您的角色</div>
    <role-item
      v-for="(item, index) of roleInfoList"
      :key="index"
      :role-info="item"
      @selectRole="selectRole(item)"
    ></role-item>
  </div>
</template>

<script>
import roleItem from "./components/roleItem";
import { mapActions } from "vuex";
export default {
  name: "selectRole",
  components: {
    roleItem
  },
  data() {
    return {
      roleInfoList: [
        {
          roleImg: "./img/home/worker.png",
          name: "零活工",
          path: "/home"
        },
        {
          roleImg: "./img/home/company.png",
          name: "企业人员",
          path: "/checkIn",
          loginType: "02"
        },
        {
          roleImg: "./img/home/manager.png",
          name: "平台现场人员",
          path: "/checkIn",
          loginType: "03"
        }
      ],
      chooseRole: {}
    };
  },
  methods: {
    ...mapActions(["requestUserInfo"]),
    selectRole(item) {
      this.$dialog
        .confirm({
          title: "选择角色",
          message: `您确认选择${item.name}吗？`
        })
        .then(() => {
          if (item.path !== "/home") {
            this.$router.replace({
              path: "/loginIndex",
              query: {
                roleInfo: item
              }
            });
          } else {
            this.getWorkInfo(item.path);
          }
        })
        .catch(() => {});
    },

    async getWorkInfo(path) {
      let userInfo = await this.requestUserInfo({
        userName: "最后变成如果",
        loginType: "01" // 01-个人；02-平台；03-商户（商户/平台）
      });
      if (userInfo.retCode === "00000") {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.select-role-content {
  .title {
    height: 33px;
    font-size: @fs12;
    font-family: @pfSC;
    color: @tipColor;
    background: @bgColor;
    padding-left: 15px;
    line-height: 31px;
  }
}
</style>
