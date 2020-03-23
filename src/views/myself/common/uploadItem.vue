<template>
  <div class="upload-item">
    <div class="upload-content">
      <div v-if="!imgUrl">
        <input
          type="file"
          class="upload-img-el"
          name="files"
          accept="image/*"
          ref="imagefile"
          @change="afterRead($event)"
        />
        <div class="upload-content-img" :style="{ height: uploadHeight }">
          <van-icon size="25px" color="#21A675" name="plus" />
        </div>
      </div>
      <div v-else class="img-content">
        <van-icon
          size="20px"
          class="img-van-icon"
          @click="clearImg"
          name="clear"
        />
        <img
          class="upload-content-img"
          :style="{ height: uploadHeight }"
          :src="getImgUrl"
          lazy-load
        />
      </div>
    </div>
    <div class="img-tip">
      {{ imgTipName }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { baseUrlConfig } from "../../../service/baseUrl";
import lrz from "lrz";
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

    beforeRead(file) {
      console.log(file);
    },
    afterRead(e) {
      let files = this.$refs.imagefile.files[0];
      if (!files) return;
      if (!/image\/\w+/.test(files.type)) {
        this.$toast("请确保文件为图像文件");
        return false;
      }
      if (files.size > 3145728) {
        this.$toast("图片最大为3M");
        return false;
      }
      if (files.size > 1048576) {
        lrz(e.target.files[0])
          .then(res => {
            console.log(res);
            this.uploadImg(res, true);
          })
          .catch()
          .always();
      } else {
        this.uploadImg(e.target.files[0]);
      }
    },

    uploadImg(data, flag) {
      let file = { file: flag ? data.file : data };
      // 此时可以自行将文件上传至服务器
      this.uploadImagePublic(file).then(res => {
        if (res && res.retCode === "00000") {
          file.content = res.data[0].imgUrl;
          this.$emit("getUploadImgUrl", res.data[0].imgUrl);
        }
      });
    },

    clearImg() {
      this.$emit("getUploadImgUrl", "");
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
    .upload-img-el {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      cursor: pointer;
      width: 155px;
      height: 140px;
      transform: translate(-50%, -50%);
      z-index: 3;
      // &:hover + div {
      //   display: block;
      // }
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
  .img-content {
    position: relative;
    .img-van-icon {
      position: absolute;
      right: 0;
    }
  }
}
</style>
