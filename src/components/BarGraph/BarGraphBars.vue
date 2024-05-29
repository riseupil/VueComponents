<template>
  <div class="bar-container" tabindex="-1">
    <div v-for="(value, i) of values" :key="i" class="bar-box" :style="`--value: ${absValue(value)}`">
      <div v-if="hasValue(value)"
           :class="['bar', {
             positive: value.value >= 0, negative: value.value < 0, zero: value.value === 0,
             first: i === 0,  last: i === values.length - 1,
             'edge-circle': edgeMarks,
           }]"
           :style="adaptedStyles(value)">
        <div class="label ri-label">{{ labelFormatter(value.value) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'BarGraphBars',
  props: {
    values: { // array of objects: { value: number, style: object}
      type: Array,
      required: true,
    },
    labelFormatter: { // (value: number) => string;
      type: Function,
      required: true,
    },
    edgeMarks: {
      type: Boolean,
      required: false,
      default: true,
    },
    barStyles: {
      type: Object,
      required: false,
    },
  },
  methods: {
    hasValue(bar) {
      return !_.isNil(bar?.value);
    },
    absValue(bar) {
      return Math.abs(bar?.value ?? 0);
    },
    adaptedStyles(bar) {
      const { borderRadius, ...otherStyles } = this.barStyles || { borderRadius: 0 };
      const styles = { ...otherStyles, ...bar.style };
      return {
        ...styles,
        '--bar-border-radius': borderRadius,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";
@import "../../scss/spacings";
@import "bar-graph.styles";

$bar-width: 2px;
$bar-circle-size: 8px;
$bar-min-height: 10px;
$separator-height: 1px;

@mixin barEdgeCircle() {
  content: '';
  position: absolute;
  width: $bar-circle-size;
  height: $bar-circle-size;
  border-radius: 50%;
  background-color: $riseup_blue;
  left: -3px;
}

.bar-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .bar-box {
    position: relative;
    flex: 1;
    background: transparent;
    .bar {
      $height: calc(var(--value) / var(--values-range) * 100%);
      position: absolute;
      width: $bar-width;
      height: $height;
      min-height: $bar-min-height;
      left: 0;
      right: 0;
      margin: auto;
      background-color: $riseup_blue;
      z-index: $bar-z-index;
      transition: all 0.3s ease-in-out;
      &:hover {
        opacity: 1;
      }
      &.positive {
        border-top-left-radius: var(--bar-border-radius);
        border-top-right-radius: var(--bar-border-radius);
        top: calc((var(--zero-y-position) * 100%) - max($height, $bar-min-height) + $separator-height);
        &.edge-circle::after {
          @include barEdgeCircle();
          top: 0;
        }
      }
      &.zero {
        height: 0;
        min-height: 0;
        top: calc(var(--zero-y-position) * 100%);
        &.edge-circle::after {
          top: -3px;
        }
      }
      &.negative {
        border-bottom-left-radius: var(--bar-border-radius);
        border-bottom-right-radius: var(--bar-border-radius);
        top: calc(var(--zero-y-position) * 100%);
        &.edge-circle::before {
          @include barEdgeCircle();
          bottom: 0;
        }
      }
      .label {
        background-color: $riseup_light_blue;
        color: $riseup_dark_blue_2;
        top: -$label-height - $ri-spacing-xxs;
        transform: translateX(50%);
      }
      &.first .label {
        transform: translateX(20%);
      }
      &.last .label {
        transform: translateX(80%);
      }
    }
    &:hover {
      z-index: $hovered-bar-z-index;
      .label {
        visibility: visible;
      }
    }
  }
  &:hover {
    .bar {
      opacity: 0.5;
    }
  }
}
</style>
