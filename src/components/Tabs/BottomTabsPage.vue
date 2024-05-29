<template>
  <div class="bottom-tabs-page">
    <slot/>
    <div class="tabs" :class="{ hidden: hideTabs }">
      <div class="tab-buttons">
        <tab-button v-for="(tab, index) in tabs" :key="tab.key"
                    :text="tab.text" :selected="selectedTab === index" @click="() => tabClicked(tab.key, index)"/>
      </div>
      <div class="tabs-selection-indicator">
        <div class="selection-indicator" :style="selectionIndicatorStyles"/>
      </div>
    </div>
  </div>
</template>

<script>
import TabButton from './TabButton.vue';
import BottomTabsPageBus from './BottomTabsPageBus';

export default {
  name: 'BottomTabsPage',
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
    hideOnScroll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      selectedTab: this.selectedTabIndex,
      hideTabs: false,
      previousScrollTop: 0,
    };
  },
  mounted() {
    if (this.hideOnScroll) {
      BottomTabsPageBus.$on('scroll', this.onScroll);
    }
  },
  destroyed() {
    if (this.hideOnScroll) {
      BottomTabsPageBus.$off('scroll', this.onScroll);
    }
  },
  computed: {
    selectionIndicatorStyles() {
      return {
        '--tabs-count': this.tabs.length,
        transform: `translateX(calc(-${this.selectedTab}00%))`,
      };
    },
  },
  methods: {
    tabClicked(key, index) {
      this.selectedTab = index;
      this.$emit('tab-click', key, index);
    },
    onScroll(element) {
      const currentScrollTop = element.pageYOffset || element.scrollTop;
      this.hideTabs = currentScrollTop > this.previousScrollTop;
      this.previousScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    },
  },
  watch: {
    selectedTabIndex(newValue) {
      this.selectedTab = newValue;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/riseup-colors";
@import "../../scss/riseup-z-index";

@keyframes slide-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  99% {
    transform: translateY(60px);
    opacity: 1;
  }
  100% {
    transform: translateY(60px);
    opacity: 0;
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  1% {
    transform: translateY(60px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.bottom-tabs-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;

  .tabs {
    position: sticky;
    bottom: 0;
    height: 60px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: $bottom-tabs-page-tabs;
    &.hidden {
      animation: slide-out 0.3s 1 ease-in-out forwards;
    }
    &:not(.hidden) {
      animation: slide-in 0.3s 1 ease-in-out forwards;
    }

    .tab-buttons {
      display: flex;
      flex-direction: row;
      flex: 1;
    }

    .tabs-selection-indicator {
      width: 100%;
      height: 6px;
      background: white;

      .selection-indicator {
        height: 100%;
        width: calc(100% / var(--tabs-count));
        background: $riseup_blue;
        transition: transform 0.4s cubic-bezier(0.35, 1.10, 0.61, 1.04); // (overshoot the slide a little bit, and retract)
        border-radius: 2px 2px 0 0;
      }
    }
  }
}
</style>
