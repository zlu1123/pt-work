<template>
  <div>
    <common-header title="健康证认证"></common-header>
    <div class="info-img-upload">
      <common-content-header title-value="上传健康证"></common-content-header>
      <div class="upload">
        <uploadItem
          upload-height="140px"
          img-tip-name="请上传健康证照片"
          @getUploadImgUrl="uploadFrontImg"
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
export default {
  name: "idCertification",
  components: {
    commonHeader,
    commonContentHeader,
    uploadItem
  },
  data() {
    return {
      username: "",
      idCard: "",
      idCardFrontImg: "",
      idCardBackImg: ""
    };
  },
  methods: {
    uploadFrontImg(url) {
      this.idCardFrontImg = url;
    },

    authenticate() {
      updateUserInfoMath().then(res => {
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
    justify-content: center;
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
