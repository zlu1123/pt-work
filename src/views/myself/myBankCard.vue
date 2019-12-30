<template>
  <div>
    <card-list-item
      v-for="(item, index) of cardList"
      :key="index"
      :last-end="index + 1 === cardList.length"
    ></card-list-item>
    <div class="add-card"></div>
  </div>
</template>

<script>
import cardListItem from "./common/cardListItem";
export default {
  name: "myBankCard",
  components: {
    cardListItem
  },
  data() {
    return {
      cardList: [0, 1, 2]
    };
  }
};
</script>

<style lang="less" scoped>
.add-card {
}
</style>
