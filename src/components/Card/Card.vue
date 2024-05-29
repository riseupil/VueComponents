<template>
  <div class="card">
    <div class="content card-body" :class="{ 'card-padding': hasContentPadding }">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    hasContentPadding: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './card-styles';

</style>
