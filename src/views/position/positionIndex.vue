<template>
  <div>
    <van-cell value="单元格" icon="location-o" />
    <!-- 滑动页面 -->
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images"
                        :key="index">
          <img v-lazy="image" class="swipe-img-position"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
    <form action="/">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    </div>
  </div>
</template>
<script>
import { Cell, SwipeItem, Swipe, Search } from "vant";
export default {
  name: "positionIndex",

  components: {
    [Cell.name]: Cell,
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    [Search.name]: Search
  },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      searchValue: ""
    };
  },
  methods: {
    onSearch() {},
    onCancel() {}
  }
};
</script>
<style lang="less" scoped>
.swipe-img-position {
  width: auto;
  height: 5rem;
}
</style>
