<template>
  <div>
    <div class="company-info">
      <div class="name">
        西安顺丰有限责任公司
      </div>
      <div class="scale">
        民营 1000-9999人
      </div>
      <div class="des">
        货运/物流仓储，咨询服务，民航/铁路/公路/水路客运
      </div>
      <div class="logo">
        <img v-lazy="'https://img.yzcdn.cn/vant/apple-1.jpg'" alt="" />
      </div>
    </div>
    <div class="job-info">
      <div class="location" @click="goMapPage">
        <div class="left">
          <div class="choose-location">
            <img :src="locationImgUrl" alt="" />
          </div>
          <div class="location-name">
            公司地址：陕西省西安市雁塔区沣惠南路27号
          </div>
        </div>
        <div class="right">
          <img :src="defaultImgUrl" alt="" />
        </div>
      </div>
      <div class="job-img">
        <van-image
          height="150px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          lazy-load
          contain
        />
      </div>
      <div class="required">
        <detail-title title-name="福利及要求"></detail-title>
        <div class="welfare">
          <detail-welfare-require
            v-for="(item, index) of welfareList"
            :key="index"
            :welfare-name="item"
          ></detail-welfare-require>
        </div>
        <div class="require">
          <detail-welfare-require
            v-for="(item, index) of requireList"
            :key="index"
            :require-name="item"
          ></detail-welfare-require>
        </div>
      </div>
      <div class="work-time">
        <detail-title title-name="工作时间"></detail-title>
        <div class="interval">2019-11-21 至 2019-11-25<span>共5天</span></div>
        <div class="interval">上班时间9:00-19:00</div>
      </div>
      <div class="work-info">
        <detail-title title-name="职位信息"></detail-title>
        <div class="list">
          <detail-work-info
            v-for="(item, index) of workInfoList"
            :key="index"
            :work-info="item"
          ></detail-work-info>
        </div>
      </div>
      <div class="work-des">
        <detail-title title-name="职位描述"></detail-title>
        <div v-for="(item, index) of workDesList" :key="index">{{ item }}</div>
      </div>
    </div>
    <div class="btn-sign-up" @click="applyWork" v-if="!isNotShowBtn">
      立即报名
    </div>
  </div>
</template>

<script>
import { Image } from "vant";
import detailTitle from "./common/detailTitle";
import detailWelfareRequire from "./common/detailWelfareRequire";
import detailWorkInfo from "./common/detailWorkInfo";
import { enRoll, positionInfo } from "../../service/api";
export default {
  name: "jobDetail",
  components: {
    [Image.name]: Image,
    detailTitle,
    detailWelfareRequire,
    detailWorkInfo
  },
  data() {
    return {
      locationImgUrl: "./img/job/dingwei@2x.png",
      defaultImgUrl: "./img/myself/fanhui@2x.png",
      welfareList: ["提供工作餐", "提供住宿", "提供工作服"],
      requireList: ["实名认证", "年龄限制：16-25岁"],
      workInfoList: [
        {
          label: "职位名称",
          value: "顺丰快递分拣员"
        },
        {
          label: "职位单价",
          value: "13元/小时"
        },
        {
          label: "需      求",
          value: "共10人，还需3人，男1人，女2人 "
        },
        {
          label: "结算方式",
          value: "周结"
        }
      ],
      workDesList: [
        "分拣拣货工作内容: ",
        "1、核对货物品种、数量、规格、等级、型号；",
        "2、按照凭单提取货物，并进行复核；",
        "3、检验货物包装、标志，对出库待运货物进行包装、拼装、改装或加固包装，对经拼装、改装和换装的货物填写装箱单，并在出库货物外包装上写好收货人；",
        "4、按货物的运输方式、流向和收货地点将出库货物分类集中，填写货物启运单，通知运输部门提货发运；",
        "5、搬运、整理、堆码货物；",
        "6、鉴定货运质量，分析货物残损原因，划分事故责任；",
        "7、办理货物交接手续。"
      ],
      postionId: "",
      releasEmerch: "",
      isNotShowBtn: false
    };
  },
  async mounted() {
    this.postionId = this.$route.query.postionId;
    this.isNotShowBtn = this.$route.query.isNotShowBtn;
    await positionInfo({ postionId: this.postionId }).then(res => {
      this.releasEmerch = res.data.data.releasEmerch;
    });
  },
  methods: {
    goMapPage() {
      this.$router.push({
        path: "/routeNavigation"
      });
    },

    applyWork() {
      this.$dialog.confirm({
        title: "提醒",
        message: `确认申请该职位吗？`,
        beforeClose: this.applyRoll
      });
    },

    applyRoll(action, done) {
      if (action === "confirm") {
        enRoll({
          merchId: this.releasEmerch,
          postionId: this.postionId
        }).then(res => {
          done();
          if (res.data.retCode === "00000") {
            this.$toast("您已经报名成功");
            this.$router.go(-1);
          } else {
            this.$toast(res.data.retInfo);
          }
        });
      } else {
        done();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.company-info {
  background: @chooseColor;
  padding: 0 17px 22px 19px;
  position: relative;
  color: @itemColor;
  font-family: @pfSC;
  .name {
    padding-top: 40px;
    font-size: @fs18;
    font-weight: bold;
    line-height: 25px;
  }
  .scale {
    margin-top: 18px;
    font-size: 12px;
    line-height: 17px;
  }
  .des {
    margin-top: 5px;
  }
  .logo {
    position: absolute;
    right: 17px;
    top: 40px;
    img {
      width: 54px;
      height: 54px;
    }
  }
}
.job-info {
  background: @itemColor;
  padding: 0 20px 40px;
  border-radius: 10px 10px 0px 0px;
  .location {
    height: 55px;
    border-bottom: 1px solid @dividerBgColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .choose-location {
        width: 16px;
        height: 16px;
      }
      .location-name {
        font-size: 12px;
        font-family: @pfSC;
        line-height: 17px;
        color: @chooseColor;
      }
    }
    .right {
      width: 14px;
      height: 14px;
    }
  }
  .job-img {
    height: 150px;
  }
  .required {
    margin-top: 12px;
    .welfare {
      margin-top: 12px;
      div:not(:first-of-type) {
        margin-left: 5px;
      }
    }
    .require {
      margin-top: 12px;
      div:not(:first-of-type) {
        margin-left: 5px;
      }
    }
  }
  .work-time {
    margin-top: 17px;
    .interval {
      margin-top: 3px;
      font-size: 12px;
      font-family: @pfSC;
      line-height: 17px;
      color: @titleColor;
      span {
        margin-left: 10px;
        color: @detailIntervalColor;
      }
    }
  }
  .work-info {
    margin-top: 17px;
    .list {
      margin-top: 5px;
    }
  }
  .work-des {
    div:first-child {
      margin: 17px 0 5px;
    }
    div:not(:first-of-type) {
      font-size: @fs12;
      font-family: @pfSC;
      line-height: 17px;
      color: @titleColor;
      text-align: justify;
    }
  }
}
.btn-sign-up {
  margin: 30px 15px 27px 15px;
  height: 52px;
  text-align: center;
  line-height: 52px;
  background: @myselfListTitleColor;
  border-radius: 5px;
  font-size: @fs18;
  font-family: @yhUI;
  color: @myselfNameColor;
}
</style>
