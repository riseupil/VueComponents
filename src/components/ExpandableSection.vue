<template>
  <div class="expandable-section" :class="{'disabled': disabled, 'expanded': expanded }">
    <button class="sections-label" v-on:click="toggleExpend()" :disabled="disabled" :style="{ color: textColor }">
      <slot name="header">
        <span class="header-text" v-if="headerText">{{ headerText }}</span>
      </slot>
      <expand-arrow v-if="!hasCustomIcon" :expanded="expanded" :disabled="disabled"/>
      <slot name="icon" :expanded="expanded" :disabled="disabled"/>
    </button>
    <collapse-transition>
      <div v-show="expanded">
        <slot name="content"/>
      </div>
    </collapse-transition>
  </div>
</template>

<script>

import Colors from '../scss/riseup-js-colors.module.scss';
import ExpandArrow from './ExpandArrow.vue';
import CollapseTransition from './CollapseTransition.vue';

export default {
  name: 'ExpandableSection',
  components: {
    ExpandArrow,
    CollapseTransition,
  },
  props: {
    headerText: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: Colors.riseupBlack,
    },
  },
  data() {
    return {
      expanded: this.initiallyExpanded,
    };
  },
  computed: {
    hasCustomIcon() {
      return !!this.$slots.icon;
    },
  },
  methods: {
    toggleExpend() {
      this.$emit('expand-change', !this.expanded);
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/riseup-colors';

.expandable-section {
  display: flex;
  flex-direction: column;

  .sections-label {
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    padding: 16px 0;
    font-size: 16px;
    font-family: SimplerPro, sans-serif;
  }

  &.disabled {
    opacity: 0.6;

    button {
      cursor: default;
    }
  }
}

</style>
