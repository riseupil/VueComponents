<template>
  <span :class="{ [`icon-${variant}`]: true, fill, 'icon': true }"
        :style="iconStyle"
        :aria-label="alt"
        v-on="$listeners">
    {{ iconName }}
  </span>

</template>

<script>

export default {
  name: 'Icon',
  props: {
    iconName: {
      type: String,
      required: false,
    },
    /**
     * use the filled variant of the icon
     */
    fill: {
      type: Boolean,
      default: false,
    },
    /**
     * One of "rounded", "outlined", "sharp". Default is outlined.
     */
    variant: {
      type: String,
      default: 'outlined',
      validator: val => ['rounded', 'outlined', 'sharp'].includes(val),
    },
    /**
     * Size of the icon, a string with a unit.
     */
    size: {
      type: String,
      default: 'auto',
    },
    /**
     * For a font-icon, this determines the font weight. Default is normal.
     */
    weight: {
      type: String,
      default: 'normal',
      validator: val => ['normal', 'bold', '400', '700'].includes(val),
    },
    /**
     * For a font-icon, this determines the font weight. Default is normal.
     */
    opticalSize: {
      type: Number,
      default: 48,
      validator: val => val >= 20 && val <= 48,
    },
    color: {
      type: String,
      required: false,
    },
    alt: String,
  },
  computed: {
    iconStyle() {
      return {
        fontSize: this.size,
        color: this.color,
        fontWeight: this.weight,
        '--optical-size': `${this.opticalSize}`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins";

img {
  @include disable-drag;
  @include disable-selection;
}
</style>
