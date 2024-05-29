<template>
  <splide class="riseup-slider-pagination" :options="splideOptions" ref="sliderRef" @splide:click="_onClick">
    <splide-slide class="riseup-slider-pagination-slide" v-for="page in pages" :key="page">
      <div class="riseup-slider-pagination-dot" :class="{ 'active': page === currentPage, 'scaled-down' : shouldScaleDown(page) }"/>
    </splide-slide>
  </splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
  name: 'SliderPagination',
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    pages: {
      type: Array,
      required: true,
    },
    maxDots: {
      type: Number,
      required: false,
      default: 11,
      validator: maxDots => maxDots > 2 && maxDots % 2 === 1, // uneven number
    },
    direction: {
      type: String,
      required: false,
      default: 'rtl',
      validator: direction => ['ltr', 'rtl'].includes(direction),
    },
    currentPage: {
      type: Number,
      required: true,
    },
    onPaginationClick: {
      type: Function,
      required: true,
    },
  },
  computed: {
    splideOptions() {
      const dotSize = 8;
      const dotMargin = 6 * 2;
      const perPage = this.maxDots > this.pagesCount ? this.pagesCount : this.maxDots;
      return {
        type: 'slider',
        perPage,
        direction: this.direction,
        start: this.currentPage,
        width: (dotSize + dotMargin) * perPage,
        focus: 'center',
        padding: 4,
        arrows: false,
        trimSpace: true,
        drag: false,
        pagination: false,
      }; // https://splidejs.com/v3/guides/options
    },
    pagesCount() {
      return this.pages.length;
    },
  },
  methods: {
    _onClick(_, { index }) {
      this.onPaginationClick(index);
    },
    shouldScaleDown(page) {
      if (this.pagesCount <= this.maxDots) {
        return false;
      }
      const isCurrentPageCloseToStart = this.currentPage < this.maxDots / 2;
      if (isCurrentPageCloseToStart) {
        return page > this.maxDots - 2; // only scale the last dot
      }
      const isCurrentPageCloseToEnd = this.currentPage > (this.pagesCount - this.maxDots / 2 - 1);
      if (isCurrentPageCloseToEnd) {
        return page < this.pagesCount - this.maxDots + 1; // only scale the first dot
      }
      const distanceFromCurrentPage = Math.abs(this.currentPage - page);
      return distanceFromCurrentPage > (this.maxDots / 2 - 1);
    },
  },
  watch: {
    currentPage(newPage) {
      this.$refs.sliderRef.go(newPage);
    },
  },
};
</script>

<style lang="scss">
@import '~@splidejs/splide/dist/css/themes/splide-default.min.css';
@import '../scss/riseup-colors';

.riseup-slider-pagination {
  margin: auto;
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .riseup-slider-pagination-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .riseup-slider-pagination-dot {
      opacity: .7;
      margin: 0 6px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $riseup_gray_0;
      transition: background-color 0.2s, transform 0.5s;
      cursor: pointer;
      &.active {
        background-color: $riseup_blue;
      }
      &.scaled-down {
        transform: scale(0.5);
      }
    }
  }
}
</style>
