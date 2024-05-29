<template>
  <button class="riseup-button ri-large-bold-body"
          @click.stop="onClick"
          :class="[variant, color, loading ? 'loading' : '']"
          :disabled="disabled || loading">
    <spinner v-if="loading"/>
    <slot v-else-if="hasSlot" class="button-title"></slot>
    <span v-else class="flex-row align-center">
      <icon class="margin-left-s" v-if="iconProps" v-bind="iconProps" />
      <img v-else-if="icon" :src="icon" class="button-icon margin-left-s" alt="button icon"/>
      <div class="button-titles">
        <span>{{ title }}</span>
        <span v-if="subtitle" class="ri-body">{{ subtitle }}</span>
      </div>
    </span>
  </button>
</template>

<script>
import Colors from '../../scss/riseup-js-colors.module.scss';
import { VARIANTS, RISEUP_BUTTON_VARIANT, COLORS, RISEUP_BUTTON_COLORS } from './RiseupButton.consts';
import Icon from '../Icon';
import Spinner from '../Spinner';

export default {
  name: 'RiseupButton',
  components: {
    Icon,
    Spinner,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    variant: {
      type: String,
      default: RISEUP_BUTTON_VARIANT.PRIMARY,
      validator: val => VARIANTS.includes(val),
    },
    color: {
      type: String,
      default: RISEUP_BUTTON_COLORS.BLUE,
      validator: val => COLORS.includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    iconProps: {
      type: Object,
      required: false,
    },
    /**
     * @deprecated use @click instead
     */
    action: {
      type: Function,
      required: false,
    },
    /**
     * @deprecated use iconProps instead
     */
    icon: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      spinnerColor: Colors.riseupWhite,
    };
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
  },
  methods: {
    onClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click');
        if (this.action) {
          console.warn('RiseupButton: action prop is deprecated, use @click instead');
          this.action(event);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/riseup-colors';
@import "../../scss/border-radius";
@import "../../scss/typography";
@import "../../scss/spacings";
@import "riseup-button";

$ri-button-height: 54px;

.riseup-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: $ri-button-height;
  width: 100%;
  border-radius: $button-border-radius;
  cursor: pointer;
  border: none;
  padding: 0 24px;

  &:disabled {
    opacity: 0.5;
  }
  &:disabled, &.loading {
    cursor: default;
  }
  &:not(:disabled,.loading):active {
    -webkit-filter: brightness(85%);
  }

  @each $name, $colors in $button-colors {
    // $colors: [background, text]
    &.#{$name} {
      &.primary {
        color: nth($colors, 2);
        background: nth($colors, 1);
        --spinner-color: #{nth($colors, 2)};
      }
      &.secondary {
        background: none;
        color: nth($colors, 1);
        border: 1px solid nth($colors, 1);
        --spinner-color: #{nth($colors, 1)};
      }
      &.tertiary {
        background: none;
        color: nth($colors, 1);
        --spinner-color: #{nth($colors, 1)};
      }
    }
  }

  .button-titles {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button-icon {
    height: 20px;
    width: 20px;
  }
}
</style>
