<template>
  <div class="myself-content">
    <div class="myself-info">
      <div>
        <van-image
          round
          fit
          width="70"
          height="70"
          lazy-load
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="myself-detail">
        <div class="name-verified">
          <div class="name">微信用户45565</div>
          <div class="verified">已认证</div>
        </div>
        <div class="tel-num">电话号码：15509186643</div>
        <div>用户姓名：谢明刚</div>
      </div>
    </div>
    <div class="myself-info-list">
      <div class="info-list">
        <div class="list-title"><span>个人信息</span></div>
        <list-item
          v-for="(item, index) of infoList"
          :key="index"
          :item-data="item"
          @goToNextPage="goToNextPage(item)"
        ></list-item>
      </div>
      <div class="login-out" @click="test">
        退出登录
      </div>
      <!-- <div class="login-out" @click="test1">
        职位申请维护-职位申请人列表
      </div>
      <div class="login-out" @click="test2">
        职位申请维护-职位申请人审核
      </div>
      <div class="login-out" @click="test3">
        本人打卡ID
      </div>
      <div class="login-out" @click="test4">
        本人打卡信息查询
      </div>
      <div class="login-out" @click="test5">
        发工资
      </div> -->
    </div>
  </div>
</template>

<script>
import { Row, Col, Image, Cell } from "vant";
import listItem from "./common/listItem.vue";
import {
  applyList,
  applyExam,
  queryCurrentDayClock,
  clockInOrSignOut,
  getPayRoll
} from "../../service/api";
export default {
  name: "",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Cell.name]: Cell,
    listItem
  },
  data() {
    return {
      infoList: [
        {
          name: "工资单",
          path: "/payRoll"
        },
        {
          name: "我的认证",
          // path: "/myCertification"
          path: "/idCertification"
        },
        {
          name: "银行卡信息"
        },
        {
          name: "个人信息维护",
          path: "/personalInfo"
        },
        {
          name: "保险"
        },
        {
          name: "违约记录"
        },
        {
          name: "打卡情况",
          path: "/checkInSituation"
        }
      ]
    };
  },
  methods: {
    goToNextPage(item) {
      this.$router.push({
        path: item.path
      });
    },
    test() {},
    test1() {
      applyList({
        merchId: "001",
        postionId: "001",
        pageNum: 1,
        pageSize: 20
      });
    },
    test2() {
      applyExam({
        merchId: "001",
        postionId: "001",
        postionApplyId: "20191229165145001001"
      });
    },
    test3() {
      queryCurrentDayClock({
        merchId: "001",
        postionId: "001"
      });
      // {"retCode":"00000","retInfo":"操作成功","data":"20191229165145001001"}  申请ID
    },
    test4() {
      clockInOrSignOut({
        postionApplyId: "20191227103521001001",
        clockType: "2",
        clockAddr: "112312",
        postionId: "001",
        merchId: "001",
        currentDay: "20191229"
      });
    },
    test5() {
      getPayRoll({ payType: "2" });
    }
  }
};
</script>

<style lang="less" scoped>
.myself-content {
  position: relative;
  .myself-info {
    display: flex;
    background: @chooseColor;
    padding: 35px 18px 64px 28px;
    .myself-detail {
      margin-left: 18px;
      color: @myselfNameColor;
      width: -webkit-fill-available;
      .name-verified {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 18px;
          font-family: @pfSC;
          font-weight: bold;
        }
        .verified {
          font-size: 12px;
          border: 1px solid @myselfNameColor;
          padding: 1px 2px;
          border-radius: 1px;
        }
      }
      .tel-num {
        margin-top: 11px;
        font-size: 15px;
        font-family: @pfSC;
      }
    }
  }
  .myself-info-list {
    position: absolute;
    top: 153px;
    left: 15px;
    right: 15px;
    .info-list {
      border-radius: 10px;
      background: @itemColor;
      .list-title {
        height: 50px;
        background: @myselfListTitle;
        border-radius: 10px 10px 0px 0px;
        display: flex;
        align-items: center;
        span {
          opacity: 1;
          font-size: 15px;
          margin-left: 20px;
          font-family: @yhUI;
          font-weight: bold;
          color: @myselfListTitleColor;
        }
      }
    }
  }
  .login-out {
    margin-top: 98px;
    margin-bottom: 50px;
    height: 52px;
    border: 2px solid #d2d2d2;
    border-radius: 5px;
    font-size: @fs18;
    font-family: @pfSC;
    text-align: center;
    line-height: 52px;
  }
}
</style>
