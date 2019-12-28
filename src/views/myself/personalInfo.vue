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
        <div class="name">微信用户45565</div>
      </div>
    </div>
    <div class="myself-info-list">
      <div class="info-list">
        <div class="list-title"><span>个人信息</span></div>
        <list-item
          v-for="(item, index) of infoList"
          :key="index"
          :item-data="item"
        ></list-item>
      </div>
      <div class="person-img-content">
        <div class="img-title">
          人员照片
        </div>
        <upload-item
          img-tip-name="请上传真实人员照片"
          upload-height="180px"
        ></upload-item>
        <div class="img-size">
          大小3M以内
        </div>
      </div>
      <div class="person-tip">
        提示：<span>姓名、性别、年龄，</span>如果是未知，请在我的认证，身份证认证中实名认证！
      </div>
      <div class="person-submit">
        提交
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Image, Cell, Uploader, Icon } from "vant";
import listItem from "./common/listItem.vue";
import uploadItem from "./common/uploadItem";
export default {
  name: "personalInfo",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    listItem,
    uploadItem
  },
  data() {
    return {
      infoList: [
        {
          name: "姓名",
          value: "涛涛"
        },
        {
          name: "性别",
          value: "男"
        },
        {
          name: "年龄",
          value: "30"
        },
        {
          name: "身高",
          value: "180"
        },
        {
          name: "鞋码",
          value: "42"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.myself-content {
  position: relative;
  .myself-info {
    background: @chooseColor;
    padding: 35px 18px 64px 28px;
    div {
      text-align: center;
      color: @myselfNameColor;
      .name {
        margin-top: 9px;
        font-weight: bold;
        line-height: 25px;
        font-size: 18px;
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
    .person-img-content {
      margin-top: 11px;
      background: @itemColor;
      border-radius: 10px;
      text-align: center;
      .img-title {
        height: 37px;
        border-radius: 10px 10px 0px 0px;
        border-bottom: 1px solid @dividerBgColor;
        display: flex;
        align-items: center;
        font-size: @fs15;
        font-family: @pfSC;
        font-weight: bold;
        color: @myselfListTitleColor;
        padding-left: 20px;
      }
      .upload-item {
        display: inline-block;
      }
      .img-size {
        margin: 12px 0 7px;
        font-size: @fs12;
        font-family: @pfSC;
        color: @chooseRedColor;
      }
    }
    .person-tip {
      margin-top: 16px;
      font-size: @fs9;
      font-family: @pfSC;
      color: @personTipColor;
      span {
        color: @chooseRedColor;
      }
    }
    .person-submit {
      margin: 30px 0 27px;
      height: 52px;
      text-align: center;
      line-height: 52px;
      background: @myselfListTitleColor;
      border-radius: 5px;
      font-size: @fs18;
      font-family: @yhUI;
      color: @myselfNameColor;
    }
  }
}
</style>
