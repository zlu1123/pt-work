<template>
  <div>
    <common-header title="身份证认证"></common-header>
    <div class="detail-info">
      <common-content-header title-value="基本信息"></common-content-header>
      <div class="info">
        <van-cell-group>
          <van-field
            v-model="username"
            clearable
            label="姓      名："
            placeholder="请输入姓名"
            :label-class="`label-class`"
          />
          <van-field
            v-model="idCard"
            label="身份证号："
            clearable
            maxlength="18"
            placeholder="请输入身份证号"
            :label-class="`label-class`"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="info-img-upload">
      <common-content-header title-value="上传身份证"></common-content-header>
      <div class="upload">
        <uploadItem upload-height="140px" img-tip-name="请上传身份证正面照片"></uploadItem>
        <uploadItem upload-height="140px" img-tip-name="请上传身份证背面照片"></uploadItem>
      </div>
    </div>
    <div class="id-submit">
      认证
    </div>
  </div>
</template>

<script>
import commonHeader from "../components/commonHeader";
import commonContentHeader from "../components/commonContentHeader";
import uploadItem from "./common/uploadItem";
import { Field, CellGroup } from "vant"
export default {
  name: "idCertification",
  components: {
    commonHeader,
    commonContentHeader,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    uploadItem
  },
  data() {
    return {
      username: "",
      idCard: ""
    }
  }
}
</script>

<style lang="less" scoped>
.detail-info {
  margin: 9px 15px 0 15px;
  border-radius: 5px;
  .info {
    border-radius:0 0 5px 5px;
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
