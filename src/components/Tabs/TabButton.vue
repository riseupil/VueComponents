<template>
  <button class="tab-button" :class="{ selected }" @click.stop="$emit('click')" :tabindex="0">
    <span class="ri-bold-label">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'TabButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";

.tab-button {
  display: flex;
  border: none;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: $riseup_white;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
