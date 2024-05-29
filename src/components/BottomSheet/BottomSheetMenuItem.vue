<template>
  <li class="bottom-sheet-menu-item" :class="{ disabled }"
      :key="text"
      @click.stop="itemClicked"
      @keyup.enter.stop="itemClicked"
      tabindex="0"
      role="menuitem"
      :aria-label="text">
    <icon v-if="!loading" v-bind="iconProps" :optical-size="24" />
    <spinner class="margin-left-xxs" size="small" :color="loaderColor" v-if="loading" />
    <span class="ri-bold-body">{{text}}</span>
  </li>
</template>

<script>
import Colors from '../../scss/riseup-js-colors.module.scss';
import Spinner from '../Spinner';
import Icon from '../Icon';

export default {
  name: 'BottomSheetMenuItem',
  components: { Spinner, Icon },
  props: {
    text: {
      type: String,
      required: true,
    },
    iconProps: { // Icon component props
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaderColor: Colors.riseupBlack,
    };
  },
  methods: {
    itemClicked() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/riseup-colors";
@import "../../scss/spacings";
@import "../../scss/typography";
@import "../../scss/border-radius";

.bottom-sheet-menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: $ri-spacing-s;
  border: 1px solid $riseup_gray_0;
  border-radius: $button-border-radius;
  background: transparent;
  cursor: pointer;
  padding: $ri-spacing-sm;
  font-size: $ri-font-size-20;
  color: $riseup_black;
  text-align: start;

  &.disabled {
    cursor: default;
    opacity: 0.5;
  }
}
</style>
