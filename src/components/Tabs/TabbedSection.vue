<template>
  <div class="tabbed-section">
    <div class="tabs">
      <div class="tab-buttons">
        <tab-button class="tabbed-section-button" v-for="(tab, index) in tabs" :key="tab.key" :ref="`tab_${index}`"
                    :text="tab.text" :selected="selectedTab === index" @click="() => tabClicked(tab.key, index)"/>
      </div>
      <div class="tabs-selection-indicator">
        <div class="selection-indicator" :style="selectionIndicatorStyles"/>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script>
import _ from 'lodash';
import TabButton from './TabButton';

export default {
  name: 'TabbedSection',
  components: {
    TabButton,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selectedTabIndex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selectedTab: this.selectedTabIndex,
      indicatorsWidths: [],
      tabsCumulativeSumWidths: [0],
      previousScrollTop: 0,
      debouncedResizeHandler: _.debounce(this.resizeHandler, 250),
      resizeObserver: null,
    };
  },
  mounted() {
    this.resizeHandler();
    this.resizeObserver = new ResizeObserver(this.debouncedResizeHandler);
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
  },
  computed: {
    selectionIndicatorStyles() {
      return {
        '--tabs-count': this.tabs.length,
        width: `${this.indicatorsWidths[this.selectedTab]}px`,
        transform: `translateX(calc(-${this.tabsCumulativeSumWidths[this.selectedTab] + TABS_GAP / 2}px))`,
      };
    },
  },
  methods: {
    tabClicked(key, index) {
      this.selectedTab = index;
      this.$emit('tab-click', key, index);
      this.scrollToSelectedTabCenter();
    },
    scrollToSelectedTabCenter() {
      this.$refs[`tab_${this.selectedTab}`][0].$el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    },
    resizeHandler() {
      this.$nextTick(() => {
        this.indicatorsWidths = [];
        this.tabsCumulativeSumWidths = [0];
        _.times(this.tabs.length, index => {
          const tabWidth = this.$refs[`tab_${index}`][0].$el.clientWidth;
          this.indicatorsWidths.push(tabWidth - TABS_GAP);
          this.tabsCumulativeSumWidths[index + 1] = this.tabsCumulativeSumWidths[index] + tabWidth;
        });
      });
    },
  },
};

const TABS_GAP = 24;

</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";
@import "../../scss/spacings";
@import "../../scss/mixins";

.tabbed-section {
  .tabs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    @include hide-scrollbar;

    .tab-buttons {
      display: flex;
      flex-direction: row;
      flex: 1;

      .tabbed-section-button {
        width: inherit;
        white-space: nowrap;
        padding: $ri-spacing-xs $ri-spacing-sm;
        color: $riseup_gray_2;
        &.selected {
          color: $riseup_black;
        }
      }
    }

    .tabs-selection-indicator {
      width: 100%;
      height: 2px;
      background: white;

      .selection-indicator {
        height: 100%;
        background: $riseup_black;
        transition: transform 0.5s cubic-bezier(0.21, 0.73, 0.69, 1.05), width 0.1s linear;
      }
    }
  }
}
</style>
