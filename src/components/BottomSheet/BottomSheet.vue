<template>
  <transition appear appear-class="invisible">
    <div class="overlay" :class="overlayClasses" @click.stop="onOutsideClick" tabindex="-1">
      <transition appear appear-class="before-enter" appear-active-class="transition-transform">
        <div class="bottom-sheet" ref="sheet" :style="sheetCssVars" @click.stop tabindex="-1">
          <!-- @click.stop prevents dismissing the sheet on inside click, when dismissOnClickOutside is true -->
          <div class="sheet-header-container" :class="[variant]" @mousedown="startPan" @touchstart="startPan">
            <div class="handle" ref="handle"
                 role="button"
                 tabindex="0"
                 @keyup.enter.stop.prevent="handleClick"
                 @keyup.esc.stop="closeSheet"
                 @keyup.delete.stop="closeSheet">
              <div class="handle-bar" tabindex="-1"/>
            </div>
            <div class="padding-horizontal-ml padding-bottom-ml" v-if="hasHeader">
              <slot name="header"></slot>
            </div>
          </div>
          <slot></slot>
          <bottom-sheet-menu v-if="hasMenu" :class="{'small-top-padding' : !hasHeader, disabled}">
            <template v-slot:menuItems><slot name="menuItems"/></template>
          </bottom-sheet-menu>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash';
import {
  ANIMATION_DURATION, BOTTOM_SHEET_VARIANT, VARIANTS,
  DEBOUNCE_RESIZE_MS, LONG_PAN_PAGE_RATIO,
  PAN_DIRECTION, SIGNIFICANT_MOVEMENT_MIN_DISTANCE,
} from './BottomSheet.consts';
import BottomSheetMenu from './BottomSheetMenu';

export default {
  name: 'BottomSheet',
  components: { BottomSheetMenu },
  data() {
    return {
      /* the height of the sheet */
      height: 'auto',
      /* The height of the container within which the bottom sheet operates */
      containerHeight: null,
      /* the offset of the container within which the bottom sheet operates, from the top left corner of the screen.
      (usually 0 in mobile, and > 0 in desktop) */
      containerOffset: 0,
      /* the distance in pixels of the sheet from the top of the container */
      shiftY: undefined,
      /* the initial value of shiftY, the sheet in its neutral, partially open position */
      initialShift: undefined,
      /* used to conserve the shiftY value at the start of a pan gesture */
      shiftAtPanStart: null,
      /* used for disabling transform animations during panning. */
      blockAnimations: false,
      /* is the sheet in full page mode */
      isFullPage: false,
      /* the distance between the point on the screen where the pan motion began, and the top of the sheet */
      panDelta: null,
      /* is the sheet being closed - for animation purposes */
      isClosing: false,
      debouncedResizeHandler: _.debounce(this.resizeHandler, DEBOUNCE_RESIZE_MS),
    };
  },
  mounted() {
    this.containerHeight = this.getScreenHeight();
    this.height = this.containerHeight;
    const sheetHeight = this.$refs.sheet.clientHeight;
    const parentHeight = this.$el.clientHeight;
    if (sheetHeight > parentHeight) {
      this.height = parentHeight;
      this.initialShift = 0;
      this.isFullPage = true;
    } else {
      this.initialShift = this.containerHeight - sheetHeight;
    }
    this.shiftY = this.initialShift;
    window.addEventListener('resize', this.debouncedResizeHandler);
    setTimeout(this.postTransitionSetup, ANIMATION_DURATION);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedResizeHandler);
  },
  props: {
    variant: {
      type: String,
      default: BOTTOM_SHEET_VARIANT.WHITE,
      validator: value => VARIANTS.includes(value),
    },
    blockContent: {
      type: Boolean,
      default: true,
    },
    dismissOnClickOutside: {
      type: Boolean,
      default: true,
    },
    enableFullPage: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sheetCssVars() {
      return {
        height: `${this.height}px`,
        '--shift-y': `${this.shiftY}px`,
        '--border-radius': this.isFullPage ? '0' : undefined,
        '--animation-props': this.blockAnimations ? undefined : 'transform, border-radius',
      };
    },
    overlayClasses() {
      return {
        'block-content': this.blockContent,
        'animate-overlay': !this.blockAnimations,
        'pointer-events': this.dismissOnClickOutside || this.blockContent,
        invisible: this.isClosing,
      };
    },
    hasMenu() {
      return !!this.$slots.menuItems;
    },
    hasHeader() {
      return !!this.$slots.header;
    },
  },
  methods: {
    postTransitionSetup() {
      this.$refs.handle.focus();
      this.containerOffset = this.$el.getBoundingClientRect().y;
    },
    startPan(event) {
      if (this.disabled) {
        return;
      }
      this.blockAnimations = true;
      if (event.cancelable) {
        event.preventDefault();
      }
      this.shiftAtPanStart = this.shiftY;
      const isTouchEvent = event.type === 'touchstart';
      this.panDelta = (isTouchEvent ? event.touches[0].pageY : event.pageY) - this.shiftY;
      this.$el.addEventListener(isTouchEvent ? 'touchmove' : 'mousemove', this.pan);
      this.$el.addEventListener(isTouchEvent ? 'touchend' : 'mouseup', this.endPan);
    },
    pan(event) {
      const isTouchEvent = event.type === 'touchmove';
      this.shiftY = (isTouchEvent ? event.touches[0].pageY : event.pageY) - this.panDelta;
      const swipeAboveScreenTop = this.shiftY < 0;
      const swipeUnderScreenBottom = this.shiftY > this.containerHeight - this.panDelta - 2;
      if (swipeAboveScreenTop || swipeUnderScreenBottom) {
        this.endPan({ type: isTouchEvent ? 'touchend' : 'mouseup' });
      }
    },
    endPan(event) {
      const diff = this.shiftY - this.shiftAtPanStart;
      const panDirection = diff <= 0 ? PAN_DIRECTION.UP : PAN_DIRECTION.DOWN;
      const isSignificant = Math.abs(diff) > SIGNIFICANT_MOVEMENT_MIN_DISTANCE;
      if (panDirection === PAN_DIRECTION.DOWN) {
        if (this.isFullPage) {
          const isLongDownwardPan = Math.abs(diff) > (this.containerHeight * LONG_PAN_PAGE_RATIO);
          if (isLongDownwardPan || this.initialShift === 0) {
            this.closeSheet();
          } else {
            this.toInitialShift();
          }
        } else if (isSignificant) {
          this.closeSheet();
        } else {
          this.restoreShiftToStartPosition();
        }
      } else if (panDirection === PAN_DIRECTION.UP) {
        if (this.enableFullPage && isSignificant) {
          this.toFullPage();
        } else {
          this.restoreShiftToStartPosition();
        }
      }
      const isTouchEvent = event.type === 'touchend';
      this.$el.removeEventListener(isTouchEvent ? 'touchmove' : 'mousemove', this.pan);
      this.$el.removeEventListener(isTouchEvent ? 'touchend' : 'mouseup', this.endPan);
      this.blockAnimations = false;
    },
    handleClick() {
      if (this.disabled) {
        return;
      }
      if (this.isFullPage) {
        if (this.initialShift === 0) { // no initial shift state
          this.closeSheet();
        } else {
          this.toInitialShift();
        }
      } else if (this.enableFullPage) {
        this.toFullPage();
      } else {
        this.closeSheet();
      }
    },
    restoreShiftToStartPosition() {
      this.shiftY = this.shiftAtPanStart;
    },
    toInitialShift() {
      this.shiftY = this.initialShift;
      this.isFullPage = false;
      this.$emit('reduced');
    },
    toFullPage() {
      this.shiftY = 0;
      this.isFullPage = true;
      this.$emit('expanded');
    },
    onOutsideClick() {
      if (this.dismissOnClickOutside && !this.disabled) {
        this.closeSheet();
      }
    },
    closeSheet() {
      this.isClosing = true;
      this.shiftY = this.containerHeight;
      setTimeout(() => {
        this.$emit('close');
      }, ANIMATION_DURATION);
    },
    getScreenHeight() {
      return window.innerHeight || document.documentElement.clientHeight;
    },
    resizeHandler() {
      this.blockAnimations = true;
      const newHeight = this.getScreenHeight();
      const heightDiff = this.containerHeight - newHeight;
      this.containerHeight = newHeight;
      this.height = this.containerHeight;
      this.initialShift = Math.max(this.initialShift - heightDiff, 0);
      const containerTooShortForSheet = this.containerHeight - this.initialShift >= newHeight;
      if (containerTooShortForSheet) {
        this.isFullPage = true;
      }
      if (!this.isFullPage) {
        this.shiftY = this.initialShift;
      } else {
        this.shiftY = 0;
      }
      setTimeout(() => {
        this.blockAnimations = false;
      }, ANIMATION_DURATION);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'bottom-sheet';
@import '../../scss/riseup-colors';
@import '../../scss/spacings';
@import '../../scss/typography';
@import '../../scss/border-radius';

$sheet-shadow: 0 -4px 5px #9a9a9a66;
$sheet-border-radius: $card-border-radius $card-border-radius 0 0;
$animation-speed: 0.3s;

.overlay {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  flex: 1;
  width: 100%;
  pointer-events: none;

  &.block-content {
    background: rgba(0, 0, 0, 0.4);
    &.animate-overlay {
      transition: background $animation-speed ease;
    }
  }
  &:not(.block-content) {
    .bottom-sheet {
      box-shadow: $sheet-shadow;
    }
  }

  &.invisible {
    background: rgba(0, 0, 0, 0);
  }

  &.pointer-events {
    pointer-events: all;
  }
  &.v-leave-active {
    display: none;
    transition: none;
  }
}

.bottom-sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: $riseup_white;
  border-radius: $sheet-border-radius;
  transition-property: var(--animation-props, none);
  transition-duration: $animation-speed;
  transition-timing-function: ease;
  transform: translateY(var(--shift-y));
  pointer-events: all;

  &.transition-transform {
    transition-property: transform;
  }

  &.before-enter {
    transform: translateY(100%);
  }

  .sheet-header-container {
    width: 100%;
    border-radius: var(--border-radius, $sheet-border-radius);

    @each $variant, $color in $variant-to-color {
      &.#{$variant} {
        background-color: $color;
        // if the variant's in $dark-text-variants, use black, otherwise white
        color: if(index($dark-text-variants, $variant), $riseup_gray_80, $riseup_white);
        .handle {
          .handle-bar {
            background: if(index($light-handle-variants, $variant), rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.4));
          }
        }
      }
    }

    .handle {
      width: 100%;
      display: flex;
      justify-content: center;
      cursor: pointer;
      // disable selection
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      font-size: $ri-font-size-40;
      .handle-bar {
        height: 4px;
        width: 40px;
        border-radius: 20px;
        margin: $ri-spacing-sm 0;
      }
    }
  }

  .small-top-padding {
    padding-top: $ri-spacing-xs;
  }
}
</style>
