<template>
  <div class="sticky-cta-footer" :style="styles">
    <riseup-button v-if="buttonProps" @click="$emit('click')" v-bind="buttonProps"/>
  </div>
</template>

<script>
import RiseupButton from './RiseupButton/RiseupButton';
import Colors from '../scss/riseup-js-colors.module.scss';

export default {
  name: 'StickyCtaFooter',
  components: {
    RiseupButton,
  },
  props: {
    buttonProps: {
      type: Object,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: Colors.riseupWhite,
    },
  },
  computed: {
    styles() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/spacings";
@import "../scss/box-shadow";

.sticky-cta-footer {
  display: flex;
  padding: $ri-spacing-m;
}
</style>
