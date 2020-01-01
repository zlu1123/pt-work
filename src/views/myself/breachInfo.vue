<template>
  <div>
    <breach-list-item
      v-for="(item, index) of breachList"
      :key="index"
      :breach-item="item"
    ></breach-list-item>
  </div>
</template>

<script>
import breachListItem from "./common/breachListItem";
export default {
  components: {
    breachListItem
  },
  data() {
    return {
      breachList: [{ status: 1 }, { status: 2 }]
    };
  }
};
</script>

<style></style>
