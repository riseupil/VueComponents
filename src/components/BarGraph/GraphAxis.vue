<template>
  <div class="x-axis ri-small-body" v-if="axis === 'x'">
    <div class="ticks">
      <div class="tick" v-for="(xTick, i) of xTicks" :key="i" :class="{ disabled: xTick.disabled }" :style="`--ticks-count: ${xTicks.length}`">
        {{ xTick.value ? xTick.value : xTick }}
        <icon class="mark" v-if="xTick.mark" icon-name="star" />
      </div>
    </div>
  </div>
  <div class="y-axis ri-small-body" v-else>
    <div class="tick" v-for="(yTick, i) of yTicks" :key="i" :style="`--weight: ${yTick.weight}`">
      <div>{{ formatter(yTick.value) }}</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Icon from '../Icon';

export default {
  name: 'GraphAxis',
  components: {
    Icon,
  },
  props: {
    axis: {
      type: String,
      required: true,
      validator: value => ['x', 'y'].includes(value),
    },
    ticks: {
      type: Array, // ({ disabled?: boolean;} & any)[];
      required: true,
    },
    formatter: {
      type: Function, // (any) => string;
      required: false,
      default: value => value,
    },
  },
  computed: {
    yTicks() {
      if (this.axis === 'x') {
        return null;
      }
      const sortedLabels = _.orderBy(this.ticks, null, 'desc');
      const range = sortedLabels[0] - sortedLabels[sortedLabels.length - 1];
      return sortedLabels.map((value, i) => {
        const labelContainerWeight = i === 0 ? 0 : ((sortedLabels[i - 1] - sortedLabels[i]) / range);
        return {
          value,
          weight: labelContainerWeight,
        };
      });
    },
    xTicks() {
      if (this.axis === 'y') {
        return null;
      }
      return this.ticks.map(this.formatter);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";

.y-axis {
  color: $riseup_gray_80;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  .tick {
    display: flex;
    flex: var(--weight);
    align-items: flex-end;
  }
}

.x-axis {
  color: $riseup_gray_80;
  .ticks {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: 8px;
    .tick {
      width: 1px;
      overflow: visible;
      white-space: nowrap;
      transform: rotate(270deg);
      &.disabled {
        color: $riseup_gray_40;
      }
    }
    .mark {
      position: absolute;
      top: 2px;
      font-size: 10px;
      left: -32px;
    }
  }
}
</style>
