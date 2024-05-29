<template>
  <div class="bar-graph" v-if="rawValues && rawValues.length" :class="{ 'share-variant': shareVariant }">
    <div class="graph-area" :style="`--zero-y-position: ${zeroYPosition}; --values-range: ${valuesRange}`">
      <bar-graph-bars :values="values" :label-formatter="labelFormatter" :bar-styles="barStyles" :edge-marks="barEdgeMarks"/>
      <horizontal-graph-lines :horizontal-lines="positionedHorizontalLines"/>
    </div>
    <graph-axis v-if="!shareVariant" axis="y" :ticks="yTicks" :formatter="yTickFormatter"/>
    <graph-axis axis="x" :ticks="rawValues" :formatter="xTickFormatter"/>
  </div>
</template>

<script>
import _ from 'lodash';
import BarGraphBars from './BarGraphBars.vue';
import HorizontalGraphLines from './HorizontalGraphLines.vue';
import GraphAxis from './GraphAxis.vue';

const DEFAULT_RANGE = 10000;

export default {
  name: 'BarGraph',
  components: {
    BarGraphBars,
    HorizontalGraphLines,
    GraphAxis,
  },
  props: {
    rawValues: { // any[]
      type: Array,
      required: true,
    },
    /*
     * {
     * value: number;
     * formatter?: (value) => string;
     * variant?: 'red' | 'green' | 'blue';
     * noLabel?: boolean'
     * }[]
     */
    horizontalLines: {
      type: Array,
      required: false,
      default: () => [],
    },
    valueFormatter: {
      type: Function,
      required: false,
      default: value => value,
    },
    xTickFormatter: {
      type: Function,
      required: false,
      default: value => value,
    },
    yTickFormatter: {
      type: Function,
      required: false,
      default: value => value,
    },
    labelFormatter: {
      type: Function,
      required: false,
      default: value => value,
    },
    barStyles: {
      type: Object,
      required: false,
    },
    barEdgeMarks: {
      type: Boolean,
      required: false,
    },
    shareVariant: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    orderedHorizontalLines() {
      const markLowestValue = this.lowestValue < 0;
      const markHighestValue = this.highestValue > 0;
      const allValuesUnderThousand = this.values.every(value => !value || !value.value || value.value < 1000);
      const precision = allValuesUnderThousand ? -2 : -3;
      const lines = _.chain([
        0,
        ...(markHighestValue ? [_.ceil(this.highestValue, precision)] : []),
        ...(markLowestValue ? [_.floor(this.lowestValue, precision)] : []),
        ...this.horizontalLines.map(({ value }) => value),
      ])
        .uniq()
        .orderBy(null, 'desc')
        .value();
      if (lines.length === 1) {
        return [-DEFAULT_RANGE, 0, DEFAULT_RANGE];
      }
      if (lines.length === 2) {
        const centerLine = (lines[0] + lines[1]) / 2;
        return [lines[0], centerLine, lines[1]];
      }
      return lines;
    },
    positionedHorizontalLines() {
      const topValue = this.orderedHorizontalLines[0];
      return this.orderedHorizontalLines.map((value, index) => {
        const y = Math.abs((topValue - value)) / this.valuesRange;
        const customLineDefinition = this.horizontalLines.find(g => g.value === value);
        return {
          value,
          index,
          y,
          variant: customLineDefinition?.variant ?? (this.shareVariant && value !== 0 ? 'hidden' : undefined),
          formatter: customLineDefinition?.formatter ?? this.labelFormatter,
          noLabel: !customLineDefinition || customLineDefinition.noLabel || value === 0,
        };
      });
    },
    values() {
      return this.rawValues.map(this.valueFormatter);
    },
    highestValue() {
      return _.chain(this.values).compact().map(item => item.value).max()
        .value();
    },
    lowestValue() {
      return _.chain(this.values).compact().map(item => item.value).min()
        .value();
    },
    zeroYPosition() {
      return _.find(this.positionedHorizontalLines, g => g.value === 0).y;
    },
    valuesRange() {
      return Math.abs(this.orderedHorizontalLines[0] - this.orderedHorizontalLines[this.orderedHorizontalLines.length - 1]);
    },
    yTicks() {
      if (this.orderedHorizontalLines.length === 3) {
        return this.orderedHorizontalLines;
      }
      return _.uniq([this.orderedHorizontalLines[this.orderedHorizontalLines.length - 1], 0, this.orderedHorizontalLines[0]]);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";
@import "../../scss/spacings";
@import "../../scss/typography";
@import "bar-graph.styles";

$default-graph-area-height: 280px;
$graph-area-margin: $ri-spacing-xs;

.bar-graph {
  display: grid;
  padding-top: $label-height;
  grid-template-columns: 1fr min-content;
  grid-template-rows: auto auto;
  color: $riseup_gray_60;
  &.share-variant {
    padding-top: $ri-spacing-xs;
    padding-right: $ri-spacing-xs;
    grid-template-columns: 100%;
    pointer-events: none;
    ::v-deep .tick {
      font-size: $ri-font-size-12;
    }
  }

  .graph-area {
    position: relative;
    flex: 1;
    margin-left: $graph-area-margin;
    margin-top: $graph-area-margin;
    margin-bottom: $graph-area-margin;
    height: var(--graph-height, $default-graph-area-height);
  }
}

.relative {
  position: relative;
}
</style>
