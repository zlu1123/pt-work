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
        <div class="name">微信昵称：{{ getPersonalInfo.userName }}</div>
      </div>
    </div>
    <div class="myself-info-list">
      <div class="info-list">
        <div class="list-title"><span>个人信息</span></div>
        <van-cell-group>
          <van-field
            v-for="(item, index) of infoList"
            :key="index"
            size="large"
            :required="item.required"
            v-model="item.value"
            :label="item.name"
            :border="false"
            :readonly="item.readonly"
            :placeholder="item.placeholder"
            input-align="right"
          />
        </van-cell-group>
        <!-- <person-list-item
          v-for="(item, index) of infoList"
          :key="index"
          :item-data="item"
        ></person-list-item> -->
      </div>
      <div class="person-img-content">
        <div class="img-title">
          人员照片
        </div>
        <upload-item
          img-tip-name="请上传真实人员照片"
          @getUploadImgUrl="uploadLogoAddr"
          upload-height="180px"
        ></upload-item>
        <div class="img-size">
          大小3M以内
        </div>
      </div>
      <div class="person-tip">
        提示：<span>姓名、性别、年龄，</span>如果是未知，请在我的认证，身份证认证中实名认证！
      </div>
      <div class="person-submit" @click="updatedPersonInfo">
        提交
      </div>
    </div>
  </div>
</template>

<script>
// import personListItem from "./common/personListItem.vue";
import uploadItem from "./common/uploadItem";
import { mapGetters } from "vuex";
import { updateUserInfoMath } from "../../service/api";
export default {
  name: "personalInfo",
  components: {
    // personListItem,
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
          value: "",
          placeholder: "请输入身高",
          required: true
        },
        {
          name: "鞋码",
          value: "",
          placeholder: "请输入鞋码",
          required: true
        },
        {
          name: "手机号码",
          value: "",
          placeholder: "请输入手机号码",
          required: true
        }
      ],
      logoAddr: ""
    };
  },

  mounted() {
    if (Object.keys(this.getPersonalInfo).length > 0) {
      if (this.getPersonalInfo.isCert === "1") {
        this.infoList[0].value = this.getPersonalInfo.custName;
        this.infoList[0].readonly = true;
        this.infoList[1].value =
          this.getPersonalInfo.userSex === "1" ? "男" : "女";
        this.infoList[1].readonly = true;
        this.infoList[2].value = this.getPersonalInfo.certNo;
        this.infoList[2].readonly = true;
      }
    }
  },

  methods: {
    uploadLogoAddr(url) {
      this.logoAddr = url;
    },
    updatedPersonInfo() {
      updateUserInfoMath({
        mobileNo: "18629512681",
        logoAddr: this.logoAddr,
        shoeSize: "42",
        stature: "175"
      }).then(res => {
        console.log(res);
      });
    }
  },

  computed: {
    ...mapGetters(["getPersonalInfo"])
  }
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
        .left-class {
          font-size: @fs15;
          color: @titleColor;
          font-family: @pfSC;
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
