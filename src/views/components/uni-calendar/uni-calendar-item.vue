<template>
  <div class="uni-calendar-item__weeks-box"
       :class="{
      'uni-calendar-item--disable': weeks.disable,
      'uni-calendar-item--isDay':
        calendar.fullDate === weeks.fullDate && weeks.isDay,
      'uni-calendar-item--checked':
        calendar.fullDate === weeks.fullDate && !weeks.isDay,
      'uni-calendar-item--multiple': weeks.multiple
    }"
       @click="choiceDate(weeks)">
    <div class="uni-calendar-item__weeks-box-item">
      <span v-if="selected && weeks.extraInfo"
            class="uni-calendar-item__weeks-box-circle"></span>
      <span class="uni-calendar-item__weeks-box-span"
            :class="{
          'uni-calendar-item--isDay-span': weeks.isDay,
          'uni-calendar-item--isDay':
            calendar.fullDate === weeks.fullDate && weeks.isDay,
          'uni-calendar-item--checked':
            calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--disable': weeks.disable
        }">{{ weeks.date }}</span>
      <span v-if="!lunar && !weeks.extraInfo && weeks.isDay"
            class="uni-calendar-item__weeks-lunar-span"
            :class="{
          'uni-calendar-item--isDay-span': weeks.isDay,
          'uni-calendar-item--isDay':
            calendar.fullDate === weeks.fullDate && weeks.isDay,
          'uni-calendar-item--checked':
            calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--multiple': weeks.multiple
        }">今天</span>
      <span v-if="lunar && !weeks.extraInfo"
            class="uni-calendar-item__weeks-lunar-span"
            :class="{
          'uni-calendar-item--isDay-span': weeks.isDay,
          'uni-calendar-item--isDay':
            calendar.fullDate === weeks.fullDate && weeks.isDay,
          'uni-calendar-item--checked':
            calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--disable': weeks.disable
        }">{{
          weeks.isDay
            ? "今天"
            : weeks.lunar.IDayCn === "初一"
            ? weeks.lunar.IMonthCn
            : weeks.lunar.IDayCn
        }}</span>
      <span v-if="weeks.extraInfo && weeks.extraInfo.info"
            class="uni-calendar-item__weeks-lunar-span"
            :class="{
          'uni-calendar-item--extra': weeks.extraInfo.info,
          'uni-calendar-item--isDay-span': weeks.isDay,
          'uni-calendar-item--isDay':
            calendar.fullDate === weeks.fullDate && weeks.isDay,
          'uni-calendar-item--checked':
            calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--disable': weeks.disable
        }">{{ weeks.extraInfo.info }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weeks: {
      type: Object,
      default() {
        return {};
      }
    },
    calendar: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    choiceDate(weeks) {
      this.$emit("change", weeks);
    }
  }
};
</script>

<style lang="less" scoped>
.uni-calendar-item__weeks-box {
  flex: 1;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.uni-calendar-item__weeks-box-span {
  font-size: @uni-font-size-base;
  color: @uni-text-color;
}

.uni-calendar-item__weeks-lunar-text {
  font-size: @uni-font-size-sm;
  color: @uni-text-color;
}

.uni-calendar-item__weeks-box-item {
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
}

.uni-calendar-item__weeks-box-circle {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: @uni-color-error;
}

.uni-calendar-item--disable {
  background-color: rgba(249, 249, 249, @uni-opacity-disabled);
  color: @uni-text-color-disable;
}

.uni-calendar-item--isDay-span {
  color: @uni-color-primary;
}

.uni-calendar-item--isDay {
  background-color: @uni-color-primary;
  opacity: 0.8;
  color: #fff;
}

.uni-calendar-item--extra {
  color: @uni-color-error;
  opacity: 0.8;
}

.uni-calendar-item--checked {
  background-color: @uni-color-primary;
  color: #fff;
  opacity: 0.8;
}

.uni-calendar-item--multiple {
  background-color: @uni-color-primary;
  color: #fff;
  opacity: 0.8;
}
</style>
