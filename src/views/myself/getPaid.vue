<template>
  <div>
    <div class="pay__off">请选择到账方式</div>
    <div>
      <van-radio-group v-model="chooseType">
        <van-cell-group>
          <van-cell title="微信零钱" clickable @click="chooseType = '1'">
            <template slot="label">
              <span class="tip">提示：选择微信零钱实时到账</span>
            </template>
            <van-radio slot="right-icon" name="1" checked-color="#21A675" />
          </van-cell>
          <van-cell title="微信绑定银行卡" clickable @click="chooseType = '2'">
            <template slot="label">
              <span class="tip"
                >提示：选择微信绑定银行卡，工资到账时间24小时之内，并非实时到账</span
              >
            </template>
            <van-radio slot="right-icon" name="2" checked-color="#21A675" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div v-if="chooseType === '2'">
      <div class="pay__off">请选择银行卡</div>
      <van-radio-group v-model="chooseCardIndex">
        <van-cell-group>
          <van-cell
            v-for="(item, index) of cardList"
            :key="index"
            :title="item"
            clickable
            @click="chooseCardIndex = index"
          >
            <van-radio
              slot="right-icon"
              :name="index"
              checked-color="#21A675"
            />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="id-submit" @click.stop="getPaidOff">
      领取
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chooseType: "1",
      chooseCardIndex: "0",
      cardList: ["**** **** **** 0312", "**** **** **** 1234"]
    };
  },

  methods: {
    getPaidOff() {
      console.log("领取工资");
    }
  }
};
</script>

<style lang="less" scoped>
.pay__off {
  background: @jobTitleBgColor;
  font-size: @fs21;
  height: 40px;
  line-height: 40px;
  padding-left: 16px;
}
.tip {
  color: @chooseRedColor;
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
