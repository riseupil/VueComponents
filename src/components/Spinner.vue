<template>
  <div class="loader" :style="loaderStyles"/>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    size: {
      type: String,
      require: false,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value),
    },
    color: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      sizeNameToDimensions: {
        small: { size: '16px', thickness: '3px' },
        medium: { size: '24px', thickness: '3px' },
        large: { size: '48px', thickness: '6px' },
      },
    };
  },
  computed: {
    loaderStyles() {
      const { size, thickness } = this.sizeNameToDimensions[this.size];
      return {
        '--spinner-size': size,
        '--spinner-thickness': thickness,
        '--spinner-color': this.color,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/riseup-colors';

$spinner-default-color: $riseup-blue;
$spinner-border: var(--spinner-thickness) solid var(--spinner-color, $riseup-blue);

.loader,
.loader:after {
  border-radius: 50%;
  width: var(--spinner-size);
  height: var(--spinner-size);
  min-width: var(--spinner-size);
  min-height: var(--spinner-size);
}

.loader {
  font-size: 10px;
  position: relative;
  border: $spinner-border;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  -webkit-animation: load 1s infinite linear;
  animation: load 1s infinite linear;
}

@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
