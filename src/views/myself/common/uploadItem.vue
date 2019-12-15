<template>
  <div class="upload-item">
    <div class="upload-content">
      <van-uploader>
        <div class="upload-content-img" :style="{height: uploadHeight}">
          <van-icon size="25px" color="#21A675" name="plus" />
        </div>
      </van-uploader>
    </div>
    <div class="img-tip">
      {{imgTipName}}
    </div>
  </div>
</template>

<script>
import { Uploader, Icon } from "vant"
export default {
  name: "uploadItem",
  props: {
    uploadHeight: {
      type: String,
      default: ""
    },
    imgTipName: {
      type: String,
      default: ""
    }
  },
  components: {
    [Uploader.name]: Uploader,
    [Icon.name]: Icon
  }
}
</script>

<style lang="less" scoped>
  .upload-item {
    display: inline-block;
    .upload-content {
      text-align: center;
      margin-top: 17px;
      .upload-content-img {
        height: 180px;
        width: 155px;
        background: @myselfListTitle;
        border-radius:5px 5px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .img-tip {
      width: 155px;
      height:25px;
      margin: 0 auto;
      border-radius: 0 0 5px 5px;
      font-size: @fs13;
      font-family: @pfSC;
      background: @myselfListTitleColor;
      color: @itemColor;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>
