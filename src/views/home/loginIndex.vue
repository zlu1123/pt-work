<template>
  <div class="page">
    <van-cell-group class="login">
      <van-field
        v-model="username"
        required
        clearable
        label="账号"
        right-icon="question-o"
        placeholder="请输入用户名"
        maxlength="18"
        @click-right-icon="$toast('默认身份证号码')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button
      type="primary"
      block
      class="button__login"
      @click="userLoginMethod"
      >登 录</van-button
    >
  </div>
</template>

<script>
import { userLogin } from "../../service/api";
import { localData } from "../../plugins/local";
import md5 from "js-md5";
export default {
  data() {
    return {
      username: "",
      password: "",
      userType: ""
    };
  },
  beforeMount() {
    this.userType = this.$route.query.roleInfo;
  },
  methods: {
    userLoginMethod() {
      userLogin({
        loginId: this.username,
        pwd: md5(this.password),
        loginType: this.userType.loginType // 02 企业人员  03 平台人员
      }).then(res => {
        localData("set", "merchChargeId", res.data.data.merchChargeId);
        this.$router.push({
          path: "/checkIn"
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  padding: 0 20px;
  .login {
    margin-top: 100px;
  }
  .button__login {
    margin-top: 30px;
  }
}
</style>
