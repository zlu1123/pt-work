<template>
  <div class="select-role-content">
    <div class="title">请选择您的角色</div>
    <role-item v-for="(item, index) of roleInfoList" :key="index" :role-info="item" @selectRole="selectRole(item)"></role-item>
  </div>
</template>

<script>
import roleItem from "./components/roleItem";
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
          name: "零活工"
        },
        {
          roleImg: "./img/home/company.png",
          name: "企业人员"
        },
        {
          roleImg: "./img/home/manager.png",
          name: "平台现场人员"
        }
      ]
    }
  },
  methods: {
    selectRole(item) {
      this.$dialog.confirm({
        title: '选择角色',
        message: `您确认选择${item.name}吗？`,
        beforeClose: this.beforeClose
      });
    },

    beforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000);
      } else {
        done();
      }
    }
  }
}
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
