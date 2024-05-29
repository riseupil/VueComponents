<template>
  <div class="sticky-cta-page">
    <div class="page-container">
      <slot class="flex-1"/>
      <div class="shadow"/>
      <div class="shadow-cover" :style="coverStyles"/>
    </div>
    <sticky-cta-footer class="footer" v-bind="ctaProps" @click="$emit('click')"/>
  </div>
</template>

<script>
import StickyCtaFooter from './StickyCtaFooter';
import Colors from '../scss/riseup-js-colors.module.scss';

export default {
  name: 'StickyCtaPage',
  components: { StickyCtaFooter },
  props: {
    ctaProps: {
      type: Object,
      required: true,
    },
    pageBackgroundColor: {
      type: String,
      default: Colors.riseupWhite,
    },
  },
  computed: {
    coverStyles() {
      return {
        backgroundColor: this.pageBackgroundColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/spacings';
@import '../scss/riseup-z-index';

.sticky-cta-page {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;

    .shadow {
      position: sticky;
      bottom: 90px;
      display: block;
      height: 2px;
      box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.25);
      width: 100%;
      white-space: pre;
      margin-top: $ri-spacing-xs;
      z-index: $sticky-cta;
    }

    .shadow-cover {
      position: absolute;
      bottom: -1px;
      width: 100%;
      height: 11px;
      z-index: $sticky-cta;
    }
  }

  .footer {
    position: sticky;
    bottom: 0;
    z-index: $sticky-cta;
  }
}
</style>
