<template>
  <div>
    <uni-calendar
      :insert="true"
      :lunar="false"
      @change="change"
      :selected="punchList"
    ></uni-calendar>
    <div class="punch-info">
      <div>
        上下班打卡
      </div>
      <div class="last">
        工作时长：0
      </div>
    </div>
    <div class="punch-list">
      <div class="left">
        <div>09:00</div>
        <div class="divider"></div>
        <div>18:00</div>
      </div>
      <div class="right">
        <div class="in">
          <div>上班</div>
          <div class="last">上班打卡 8：50</div>
        </div>
        <div class="out">
          <div>下班</div>
          <div class="last">下班打卡：18：20</div>
        </div>
      </div>
    </div>
    <div class="position">
      <div>职位：顺风快递临时任务</div>
    </div>
  </div>
</template>

<script>
import uniCalendar from "../components/uni-calendar/uni-calendar";
export default {
  name: "punchList",
  components: {
    uniCalendar
  },
  data() {
    return {
      punchList: [
        {
          date: "2019-12-20",
          info: "签到"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    change(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less" scoped>
.punch-info {
  margin-top: 10px;
  background: @myselfNameColor;
  height: 50px;
  padding: 0 15px;
  font-size: @fs13;
  border-bottom: 1px solid @dividerBgColor;
  div {
    line-height: 25px;
  }
}
.punch-list {
  background: @myselfNameColor;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .right {
    margin-left: 20px;
    width: 100%;
    line-height: 25px;
    > div {
      height: 50px;
      width: 100%;
      &:first-child {
        border-bottom: 1px solid @dividerBgColor;
      }
    }
  }
}
.position {
  background: @myselfNameColor;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid @dividerBgColor;
}
.last {
  color: @tipColor;
}
</style>
