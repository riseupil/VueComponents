<template>
  <div>
    <splide class="riseup-slider" :options="splideOptions" @splide:move="_onMove" ref="sliderRef">
      <splide-slide v-for="slide in slidesData" :key="slide.key"
                    class="riseup-slider-slide" :style="{ '--pagination-padding': `${paginationPadding}px` }">
        <slot v-bind:slideData="slide"/>
      </splide-slide>
    </splide>
    <slider-pagination v-if="useCustomPagination"
                       :pages="customPaginationPages"
                       :current-page="currentPage"
                       :on-pagination-click="_onPaginationClick"
                       :direction="direction"
                       :max-dots="maxDots"/>
  </div>
</template>

<script>
import _ from 'lodash';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import SliderPagination from './SliderPagination.vue';

export default {
  name: 'Slider',
  components: {
    SliderPagination,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      currentPage: this.firstSlideIndex,
    };
  },
  props: {
    infinite: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    direction: {
      type: String,
      required: false,
      default: 'rtl',
      validator: direction => ['ltr', 'rtl'].includes(direction),
    },
    padding: {
      type: Number,
      required: false,
      default: 24,
    },
    paginationPadding: {
      type: Number,
      required: false,
      default: 16,
    },
    gap: {
      type: Number,
      required: false,
      default: 10,
    },
    firstSlideIndex: {
      type: Number,
      required: false,
    },
    slidesData: {
      type: Array,
      required: true,
      validator: data => data.length > 0 && data.every(slide => slide.key),
    },
    maxDots: {
      type: Number,
      required: false,
    },
    minDots: {
      type: Number,
      required: false,
    },
    disableDrag: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    splideOptions() {
      return {
        type: this.infinite ? 'loop' : 'slide',
        padding: this.padding,
        arrows: false,
        autoWidth: this.autoWidth,
        trimSpace: this.autoWidth,
        direction: this.direction,
        gap: this.gap,
        start: this.firstSlideIndex ?? 0,
        drag: !this.disableDrag,
        pagination: !this.useCustomPagination && !this.hidePagination,
        classes: { pagination: 'splide__pagination riseup-slider-pagination' },
      };
    },
    hidePagination() {
      return this.slidesData.length <= this.minDots;
    },
    useCustomPagination() {
      return _.isNumber(this.maxDots) && !this.hidePagination;
    },
    customPaginationPages() {
      return this.slidesData.map((_, index) => index);
    },
  },
  methods: {
    _onMove(_, newIndex, prevIndex) {
      this.currentPage = newIndex;
      this.$emit('on-slide', newIndex, prevIndex);
    },
    _onPaginationClick(page) {
      this.$refs.sliderRef.go(page);
    },
  },
};
</script>

<style lang="scss">
@import '~@splidejs/splide/dist/css/themes/splide-default.min.css';
@import '../scss/riseup-colors';

.riseup-slider {

  .riseup-slider-slide {
    padding-top: 2px;
    padding-bottom: var(--pagination-padding);
  }

  .riseup-slider-pagination {
    padding: 0 24px;
    bottom: unset;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    li > button {
      margin: 0 6px;
      width: 8px;
      height: 8px;
      background-color: $riseup_gray_0;
      transition: background-color 0.2s;
      cursor: pointer;
      &.is-active {
        transform: unset;
        background-color: var(--dot-color, $riseup_blue);
      }
    }
  }
}
</style>
