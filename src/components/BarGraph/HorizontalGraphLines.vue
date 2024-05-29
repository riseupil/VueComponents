<template>
  <div class="horizontal-graph-lines">
    <div v-for="(line, i) in horizontalLines" :key="i" :class="getLineClasses(line)" :style="`--y: ${line.y};`">
      <div class="label ri-label" v-if="!line.noLabel">{{ line.formatter(line.value) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalGraphLines',
  components: {},
  props: {
    /*
     * {
     * value: number;
     * index: number;
     * formatter: (value) => string;
     * variant?: 'red' | 'green' | 'blue' | 'hidden';
     * noLabel?: boolean'
     * }[]
     */
    horizontalLines: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getLineClasses({
      value,
      variant,
    }) {
      const zero = value === 0;
      return {
        line: true,
        [variant]: !!variant,
        zero,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";
@import "../../scss/spacings";
@import "bar-graph.styles";

$label-offset: $ri-spacing-xxs;
$line-width: 1px;
$h-line-colors: (
    "red": [$riseup_danger_red, $riseup_danger_light_red],
    "green": [$riseup_green, $riseup_light_green],
    "blue": [$riseup_dark_blue_2, $riseup_light_blue],
    "gray": [$riseup_gray_60, $riseup_gray_20],
    "hidden": [transparent, transparent],
);

.horizontal-graph-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .line {
    width: 100%;
    position: absolute;
    top: calc(var(--y) * 100%);
    border-top: $line-width dashed $riseup_gray_20;
    transition: top 0.3s ease-in-out;
    &.zero {
      border-top-style: solid;
    }
    &:hover {
      .label {
        visibility: visible;
      }
    }
    .label {
      top: $label-offset;
      right: $label-offset;
      background-color: nth(map-get($h-line-colors, "gray"), 2);
      color: nth(map-get($h-line-colors, "gray"), 1);
    }

    @each $name, $colors in $h-line-colors {
      &.#{$name} {
        border-color: nth($colors, 2);
        &:hover {
          border-color: nth($colors, 1);
        }
        .label {
          background-color: nth($colors, 2);
          color: nth($colors, 1);
        }
      }
    }
  }
}
</style>
