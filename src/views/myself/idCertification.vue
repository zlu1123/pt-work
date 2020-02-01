<template>
  <div>
    <common-header title="身份证认证"></common-header>
    <div class="detail-info">
      <common-content-header title-value="基本信息"></common-content-header>
      <div class="info">
        <van-cell-group>
          <van-field
            v-model="custName"
            clearable
            label="姓      名："
            placeholder="请输入姓名"
          />
          <van-field
            v-model="certNo"
            label="身份证号："
            clearable
            maxlength="18"
            placeholder="请输入身份证号"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="info-img-upload">
      <common-content-header title-value="上传身份证"></common-content-header>
      <div class="upload">
        <uploadItem
          upload-height="140px"
          img-tip-name="请上传身份证正面照片"
          @getUploadImgUrl="uploadFrontImg"
        ></uploadItem>
        <uploadItem
          upload-height="140px"
          img-tip-name="请上传身份证背面照片"
          @getUploadImgUrl="uploadBackImg"
        ></uploadItem>
      </div>
    </div>
    <div class="id-submit" @click="authenticate">
      认证
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import commonContentHeader from "../components/commonContentHeader";
import uploadItem from "./common/uploadItem";
import { updateUserInfoMath } from "../../service/api";
import { checkID } from "../../plugins/util";
export default {
  name: "idCertification",
  components: {
    commonHeader,
    commonContentHeader,
    uploadItem
  },
  data() {
    return {
      custName: "",
      certNo: "",
      identImageAddr: "",
      idCardBackImg: ""
    };
  },
  methods: {
    uploadFrontImg(url) {
      this.identImageAddr = url;
    },

    uploadBackImg(url) {
      this.idCardBackImg = url;
    },

    authenticate() {
      if (!this.custName) {
        this.$toast("请输入姓名");
        return;
      }
      if (!this.certNo) {
        this.$toast("请输入身份证号码");
        return;
      }
      if (!checkID(this.certNo)) {
        this.$toast("请输入正确的身份证号码");
        return;
      }
      if (!checkID(this.identImageAddr)) {
        this.$toast("请上传身份证正面照片");
        return;
      }
      if (!checkID(this.idCardBackImg)) {
        this.$toast("请上传身份证反面照片");
        return;
      }
      updateUserInfoMath({
        custName: this.custName,
        certNo: this.certNo,
        identImageAddr: this.identImageAddr
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.detail-info {
  margin: 9px 15px 0 15px;
  border-radius: 5px;
  .info {
    border-radius: 0 0 5px 5px;
    /deep/ .label-class {
      white-space: pre-wrap;
      color: @chooseColor;
      font-family: @pfSC;
    }
    /deep/ .van-cell:not(:last-child)::after {
      border-bottom: none;
    }
  }
}
.info-img-upload {
  margin: 14px 15px 0;
  padding-bottom: 14px;
  border-radius: 5px;
  background: @itemColor;
  .upload {
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
  }
}
.id-submit {
  margin: 30px 15px 27px;
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
