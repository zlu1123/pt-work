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
import { localData } from "../../plugins/local";
import { userLogin } from "../../service/api";
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
          loginType: "03"
        },
        {
          roleImg: "./img/home/manager.png",
          name: "平台现场人员",
          path: "/checkIn",
          loginType: "02"
        }
      ],
      chooseRole: {}
    };
  },
  methods: {
    ...mapActions(["requestUserInfo"]),
    selectRole(item) {
      this.chooseRole = item;
      this.$dialog.confirm({
        title: "选择角色",
        message: `您确认选择${item.name}吗？`,
        confirmButtonColor: "#21A675",
        beforeClose: this.userLoginOutMethod
      });
    },

    userLoginOutMethod(action, done) {
      let item = this.chooseRole;
      if (action === "confirm") {
        if (item.path !== "/home") {
          this.$router.replace({
            path: "/loginIndex",
            query: {
              roleInfo: item
            }
          });
        } else {
          this.getWorkInfo(item.path, done);
        }
      } else {
        done();
      }
    },

    async getWorkInfo(path, done) {
      let user = localData("get", "userInfo");
      userLogin({
        userName: user.nickname || "零活工",
        loginType: "01" // 01-个人；02-平台；03-商户（商户/平台）
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          localData("set", "lsgUserInfo", res.data.data);
          done();
          this.$router.push(path);
        }
      });
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
