<template>
  <ul id="bottom-sheet-menu" class="bottom-sheet-menu" aria-label="menu" role="menu">
    <slot name="menuItems"/>
  </ul>
</template>

<script>
export default {
  name: 'BottomSheetMenu',
};
</script>

<style lang="scss" scoped>
@import "../../scss/riseup-colors";
@import "../../scss/spacings";

.bottom-sheet-menu {
  display: flex;
  flex-direction: column;
  row-gap: $ri-spacing-ml;
  list-style: none;
  padding: $ri-spacing-ml;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;

  &.disabled {
    ::v-deep .bottom-sheet-menu-item {
      cursor: default;
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
