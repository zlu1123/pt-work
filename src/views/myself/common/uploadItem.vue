<template>
  <div class="upload-item">
    <div class="upload-content">
      <van-uploader
        v-if="!imgUrl"
        :after-read="afterRead"
        :max-size="maxSize"
        :max-count="maxCount"
      >
        <div class="upload-content-img" :style="{ height: uploadHeight }">
          <van-icon size="25px" color="#21A675" name="plus" />
        </div>
      </van-uploader>
      <img
        v-else
        class="upload-content-img"
        :style="{ height: uploadHeight }"
        :src="getImgUrl"
        lazy-load
      />
    </div>
    <div class="img-tip">
      {{ imgTipName }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { baseUrlConfig } from "../../../service/baseUrl";
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
    },
    imgUrl: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      maxSize: 1048576,
      maxCount: 1
    };
  },

  methods: {
    ...mapActions(["uploadImagePublic"]),

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.uploadImagePublic(file).then(res => {
        file.content = res.data[0].imgUrl;
        this.$emit("getUploadImgUrl", res.data[0].imgUrl);
      });
    }
  },

  computed: {
    getImgUrl() {
      return baseUrlConfig.imgUrl + this.imgUrl;
    }
  }
};
</script>

<style lang="less" scoped>
.upload-item {
  display: inline-block;
  .upload-content {
    text-align: center;
    margin-top: 17px;
    position: relative;
    .upload-content-img {
      height: 180px;
      width: 155px;
      background: @myselfListTitle;
      border-radius: 5px 5px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .img-tip {
    width: 155px;
    height: 25px;
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
