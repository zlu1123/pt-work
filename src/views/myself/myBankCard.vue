<template>
  <div>
    <card-list-item
      v-for="(item, index) of cardList"
      :key="index"
      :last-end="index + 1 === cardList.length"
    ></card-list-item>
    <div class="btn__lsg" @click="addCard">银行卡绑定</div>
  </div>
</template>

<script>
import cardListItem from "./common/cardListItem";
import { cardQuery } from "../../service/api";
export default {
  name: "myBankCard",
  components: {
    cardListItem
  },
  data() {
    return {
      cardList: [0, 1]
    };
  },

  mounted() {
    this.getCardList();
  },

  methods: {
    getCardList() {
      cardQuery().then(res => {
        if (res && res.data.retCode === "00000") {
          // this.cardList = res.data.data;
        }
      });
    },

    addCard() {
      this.$router.push({
        path: "/addBankCard"
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
