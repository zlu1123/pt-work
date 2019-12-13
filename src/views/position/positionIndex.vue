<template>
  <div>
    <van-row>
      <van-col :span="6">
        <van-cell value="单元格"
                  icon="location-o"
                  class="location-content" />
      </van-col>
      <van-col :span="18">
        <form action="/">
          <van-search v-model="searchValue"
                      placeholder="搜索用人单位" />
        </form>
      </van-col>

    </van-row>
    <!-- 滑动页面 -->
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images"
                        :key="index">
          <img v-lazy="image"
               class="swipe-img-position" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-row>
        <van-col :span="6" class="filter-content-left">
          综合排序
        </van-col>
        <van-col :span="18">
          <van-dropdown-menu class="filter-content" active-color="#21A675">
            <van-dropdown-item v-model="value1"
                               :options="option1" :title-class="titleClass"/>
            <van-dropdown-item v-model="value2"
                               :options="option2" />
            <van-dropdown-item v-model="value3"
                               :options="option3" />
          </van-dropdown-menu>
        </van-col>
      </van-row>
    </div>
    <van-list v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
      <position-list-item v-for="(item, index) of positionData" :key="index" :listItem="item"></position-list-item>
    </van-list>
  </div>
</template>
<script>
import { Cell, SwipeItem, Swipe, Search, Row, Col, DropdownMenu, DropdownItem,
  List } from "vant";
import positionListItem from './common/postionListItem'
export default {
  name: "positionIndex",

  components: {
    [Cell.name]: Cell,
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    [Search.name]: Search,
    [Row.name]: Row,
    [Col.name]: Col,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [positionListItem.name]: positionListItem
  },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      searchValue: "",
      value1: 0,
      value2: 'a',
      value3: "A",
      option1: [
        { text: '日期选择', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '联系方式', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '职位类型', value: 'A' },
        { text: '好评排序', value: 'B' },
        { text: '销量排序', value: 'C' }
      ],
      titleClass: "filter-title",
      positionData: [
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.positionData.push(this.positionData[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.positionData.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.swipe-img-position {
  width: auto;
  height: 5rem;
}

.location-content {
  padding-right: 0;
}

.filter-content-left {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  color: #21A675
}

.filter-content {
  height: 40px;
}

.filter-title {
  font-weight: bold !important;
  font-size: 100px !important;
}
</style>
