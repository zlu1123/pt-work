<template>
  <div class="position__content">
    <form action="/">
      <van-search
        v-model="merchName"
        @search="queryList"
        placeholder="搜索用人单位"
      >
        <div slot="label" class="location">
          <img :src="locationImgUrl" alt="" />
          <div>{{ getLocationName }}</div>
        </div>
      </van-search>
    </form>
    <!-- 滑动页面 -->
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in adImagesList" :key="index">
          <img v-lazy="getImgUrl(item.imgUrl)" class="swipe-img-position" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="filter-list">
      <van-dropdown-menu class="filter-content" active-color="#21A675">
        <van-dropdown-item
          v-model="composite"
          :options="sortList"
          @change="changeComposite"
        />
        <van-dropdown-item
          v-model="chooseDate"
          title="日期选择"
          @open="openCalendar"
          class="filter-container"
        />
        <van-dropdown-item
          v-model="billType"
          title="结算方式"
          :options="linkList"
          @change="changeBillType"
        />
        <van-dropdown-item
          v-model="positionType"
          title="职业类型"
          :options="jobList"
          @change="changePositionType"
        />
      </van-dropdown-menu>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <position-list-item
        class="van-clearfix"
        v-for="(item, index) of positionData"
        :key="index"
        :listItem="item"
        @goJobDetail="goJobDetail(item)"
      ></position-list-item>
    </van-list>
    <van-calendar
      v-model="showCalendar"
      color="#21a675"
      show-confirm
      @confirm="chooseSelectDate"
    />
  </div>
</template>
<script>
import positionListItem from "./common/positionListItem";
import { queryPosition, noticeAdPage } from "../../service/api";
import { getUserLocation } from "../../plugins/wechatUtil";
import { gettersName } from "../../common/constants";
import { mapGetters } from "vuex";
import { formatDate } from "../../plugins/util";
import { baseUrlConfig } from "../../service/baseUrl";
export default {
  name: "positionIndex",

  components: {
    positionListItem
  },
  data() {
    return {
      adImagesList: [],
      sortList: [
        { text: "综合排序", value: "create_time" },
        { text: "离我最近", value: "" },
        { text: "价格最高", value: "price" },
        { text: "时间最长", value: "work_time" }
        // { text: "日期最长", value: 4 }
      ],
      linkList: [
        { text: "全部", value: "" },
        { text: "完工结", value: "01" },
        { text: "次日结", value: "02" },
        { text: "周结", value: "03" },
        { text: "半月结", value: "04" },
        { text: "月结", value: "05" }
      ],
      jobList: [
        { text: "全部", value: "" },
        { text: "餐饮", value: "01" },
        { text: "快递", value: "02" },
        { text: "客房", value: "03" },
        { text: "其他", value: "04" }
      ],
      titleClass: "filter-title",
      positionData: [],
      loading: false,
      finished: false,
      locationImgUrl: "./img/job/dingwei@2x.png",
      chooseDate: "",
      showCalendar: false,
      minDate: new Date(),
      currentDate: new Date(),
      composite: "create_time", // 综合排序    1.PRICE 价格最高 2.WORK_TIME 时间最长 3.CREATE_TIME 综合排序
      timeChose: "", // 时间筛选
      billType: "", // 结算方式
      positionType: "", // 职位筛选
      merchName: "", // 公司名称
      location: "", // 距离
      pageSize: 20,
      pageNum: 1
    };
  },
  mounted() {
    this.getAdList();
    getUserLocation();
  },
  methods: {
    queryList() {
      this.pageNum = 1;
      this.positionData = [];
      this.onLoad();
    },

    changeComposite(val) {
      this.composite = val;
      this.queryList();
    },
    changeBillType(val) {
      this.billType = val;
      this.queryList();
    },
    changePositionType(val) {
      this.positionType = val;
      this.queryList();
    },
    onLoad() {
      queryPosition({
        // searchType: "", // 01-默认查询；02-企业搜索；03-日期；04-结算方式；05-职位类型；06-距离
        // searchName: "",
        composite: this.composite, // 综合排序    1.PRICE 价格最高 2.WORK_TIME 时间最长 3.CREATE_TIME 综合排序
        timeChose: this.timeChose, // 时间筛选
        billType: this.billType, // 结算方式
        positionType: this.positionType, // 职位筛选
        merchName: this.merchName, // 公司名称
        location: this.location, // 距离
        pageSize: this.pageSize.toString(),
        pageNum: this.pageNum.toString()
      }).then(res => {
        const resData = res.data.data;
        if (resData.list) {
          this.positionData = this.positionData.concat(resData.list);
          if (!resData.hasNextPage) {
            this.finished = true;
          } else {
            this.pageNum++;
          }
        }
        this.loading = false;
      });
    },
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    openCalendar() {
      this.showCalendar = true;
    },
    chooseSelectDate(value) {
      this.showCalendar = false;
      this.timeChose = formatDate(value);
      this.queryList();
    },
    goJobDetail(item) {
      this.$router.push({
        path: "/jobDetail",
        query: {
          postionId: item.postionId
        }
      });
    },
    getAdList() {
      noticeAdPage({
        // info: "",
        // seq: "",
        pageSize: "20",
        pageNum: "1"
      }).then(res => {
        if (res && res.data.retCode === "00000") {
          this.adImagesList = res.data.data.list;
        }
      });
    },
    getImgUrl(postionImg) {
      return baseUrlConfig.imgUrl + postionImg;
    }
  },

  computed: {
    ...mapGetters([gettersName.getLocationInfo]),
    getLocationName() {
      let info = this[gettersName.getLocationInfo];
      if (info && Object.keys(info).length > 0) {
        return info.detail ? info.detail.addressComponents.street : "获取中";
      }
      return "获取中";
    }
  }
};
</script>
<style lang="less" scoped>
.position__content {
  .swipe-img-position {
    height: 150px;
  }

  /deep/ .van-search__content {
    padding-left: 0;
    .van-search__label {
      padding-left: 0;
    }
  }

  .location {
    padding-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @fs12;
    font-family: Microsoft YaHei UI;
    color: @chooseColor;
    background: @itemColor;
    padding-right: 10px;
    img {
      width: 16px;
      height: 16px;
    }
    div {
      max-width: 36px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .filter-list {
    margin: 10px 0;
    .filter-content-left {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-weight: bold;
      font-size: 15px;
      color: #21a675;
      background: @itemColor;
    }
  }

  .filter-content {
    height: 40px;
  }

  .filter-title {
    font-weight: bold !important;
    font-size: 100px !important;
  }

  .pop {
    width: 100%;
  }
}
</style>
