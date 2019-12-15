<template>
  <div class="job-header">
    {{title}}
  </div>
</template>

<script>
export default {
  name: "commonHeader",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
  .job-header {
    height: 58px;
    background: @jobTitleBgColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @fs18;
    font-family: @pfSC;
    font-weight: bold;
    color: @chooseColor;
  }
</style>
