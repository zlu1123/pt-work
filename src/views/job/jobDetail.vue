<template>
  <div>
    <!-- <div class="company-info">
      <div class="name">
        {{ jobDetailInfo.releasEmerchName }}
      </div>
      <div class="scale">
        民营 1000-9999人
      </div>
      <div class="des">
        {{ jobDetailInfo.postionInfo }}
      </div>
      <div class="logo">
        <img v-lazy="getImgUrl(jobDetailInfo.releasEmerchImg)" alt="" />
      </div>
    </div> -->
    <div class="company-info-content">
      <div class="name">
        {{ jobDetailInfo.releasEmerchName }}
      </div>
      <div class="merch-logo">
        <img v-lazy="getImgUrl(jobDetailInfo.releasEmerchImg)" alt="" />
      </div>
    </div>
    <div class="job-info">
      <div class="location" @click="goMapPage">
        <div class="left">
          <div class="choose-location">
            <img :src="locationImgUrl" alt="" />
          </div>
          <div class="location-name">
            职位地址：{{ jobDetailInfo.postionAddr }}
          </div>
        </div>
        <div class="right">
          <img :src="defaultImgUrl" alt="" />
        </div>
      </div>
      <div class="job-img">
        <!-- <van-image
          height="150px"
          :src="postionImgUrl"
          :lazy-load="true"
          contain
        /> -->
        <img v-lazy="getImgUrl(jobDetailInfo.postionImg)" alt="" />
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
        <div class="interval">
          {{
            getWorkDate(jobDetailInfo.workBeginDate, jobDetailInfo.workEndDate)
          }}<span
            >共{{
              getWorkNum(
                jobDetailInfo.workBeginDate,
                jobDetailInfo.workEndDate
              )
            }}天</span
          >
        </div>
        <div class="interval">
          上班时间{{ jobDetailInfo.clockBeginDate }}-{{
            jobDetailInfo.clockEndDate
          }}
        </div>
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
        <div v-for="(item, index) of workDesList" :key="index">
          {{ item }}
        </div>
        <!-- <div>{{ jobDetailInfo.positiondes }}</div> -->
      </div>
    </div>
    <div class="btn-sign-up" @click="applyWork" v-if="!isNotShowBtn">
      立即报名
    </div>
    <van-dialog
      v-model="dialogShow"
      title="提醒"
      show-cancel-button
      confirm-button-color="#21A675"
      @confirm="applyRoll"
    >
      <div class="dialog-style">
        <div>1、报名后用人单位未批准前可随时取消报名；</div>
        <div>2、用人单位批准通过后不能取消报名；</div>
        <div>3、用人单位批准通过，逾期未到岗者，再次报名将缴纳违约金20元。</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Image } from "vant";
import detailTitle from "./common/detailTitle";
import detailWelfareRequire from "./common/detailWelfareRequire";
import detailWorkInfo from "./common/detailWorkInfo";
import { enRoll, positionInfo } from "../../service/api";
import { welfareName, requireName, billTypeName } from "../../common/constants";
import { formatYYYYMMDD, dateDiff } from "../../plugins/util";
import { baseUrlConfig } from "../../service/baseUrl";
import { mapGetters, mapActions } from "vuex";
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
      welfareList: [],
      requireList: [],
      workInfoList: [],
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
      jobDetailInfo: "",
      postionImgUrl: "",
      isNotShowBtn: false,
      dialogShow: false
    };
  },
  async mounted() {
    this.postionId = this.$route.query.postionId;
    this.isNotShowBtn = this.$route.query.isNotShowBtn;
    await positionInfo({ postionId: this.postionId }).then(res => {
      if (res.data.retCode === "00000") {
        this.jobDetailInfo = res.data.data;
        this.releasEmerch = this.jobDetailInfo.releasEmerch;
        this.welfareList = this.getList(this.jobDetailInfo.postionWelfare, "1");
        this.requireList = this.getList(this.jobDetailInfo.postionRequire, "2");
        this.workInfoList = this.getWorkInfoList(this.jobDetailInfo);
        this.workDesList = this.getWorkDes(this.jobDetailInfo);
        this.postionImgUrl = this.jobDetailInfo.releasEmerchName;
      }
    });
  },
  methods: {
    ...mapActions(["requestPersonalInfo"]),

    getImgUrl(img) {
      return img && baseUrlConfig.imgUrl + img;
    },
    getWorkDes(info) {
      if (info && Object.keys(info).length > 0) {
        let list = info.positiondes.split("\n");
        list.unshift(info.postionName + "工作内容：");
        return list;
      }
    },
    getWorkInfoList(info) {
      let list = [
        {
          label: "职位名称"
        },
        {
          label: "职位单价"
        },
        {
          label: "需      求"
        },
        {
          label: "结算方式"
        }
      ];
      list[0].value = info.postionName;
      list[1].value = info.price + "元/小时";
      list[2].value = `共${info.workCount}，还需要?人，男1人，女2人`;
      list[3].value = billTypeName[info.billtype];
      return list;
    },
    getWorkNum(start, end) {
      if (start && end) {
        return dateDiff(start, end);
      }
    },
    getWorkDate(start, end) {
      if (start && end) {
        return formatYYYYMMDD(start) + "至" + formatYYYYMMDD(end);
      }
    },
    getList(info, flag) {
      let listInfo = info.split(",");
      let list = [];
      for (let item of listInfo) {
        list.push(flag === "1" ? welfareName[item] : requireName[item]);
      }
      return list;
    },
    goMapPage() {
      if (
        !this.jobDetailInfo.postionLngLat ||
        !this.jobDetailInfo.postionAddr
      ) {
        return;
      }
      if (Object.keys(this.getLocationInfo).length === 0) {
        return;
      }
      this.$router.push({
        path: "/routeNavigation",
        query: {
          postionLngLat: this.jobDetailInfo.postionLngLat,
          postionAddr: this.jobDetailInfo.postionAddr
        }
      });
    },

    async applyWork() {
      await this.requestPersonalInfo();
      if (this.getPersonalInfo.isCert !== "1") {
        this.$toast("您暂未进行身份证实名认证，请先认证");
        return;
      }
      if (this.jobDetailInfo.health && this.jobDetailInfo.health === "1") {
        if (!this.getPersonalInfo.healthImageAddr) {
          this.$toast("您暂未进行健康证认证，请先认证");
          return;
        }
      }
      this.dialogShow = true;
    },

    applyRoll() {
      enRoll({
        merchId: this.releasEmerch,
        postionId: this.postionId
      }).then(res => {
        if (res.data.retCode === "00000") {
          this.$toast("您已经报名成功");
          this.$store.commit("setRefreshList", true);
          this.$router.go(-1);
        } else {
          this.$toast(res.data.retInfo);
          this.$store.commit("setRefreshList", false);
        }
        this.dialogShow = false;
      });
    }
  },

  computed: {
    ...mapGetters(["getLocationInfo", "getPersonalInfo"])
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
.company-info-content {
  background: @chooseColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 17px 22px 20px;
  color: @itemColor;
  font-family: @pfSC;
  .name {
    flex: 6;
    font-size: @fs18;
    font-weight: bold;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .merch-logo {
    flex: 1;
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
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
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
    margin-top: 13px;
    img {
      height: 150px;
    }
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

.dialog-style {
  padding: 5px 20px;
  font-size: @fs12;
}
</style>
