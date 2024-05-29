<template>
  <text-input v-bind="$props" @input="v => $emit('input', v)" input-type="tel" disable-label-animation>
    <div class="padding-vertical-xs padding-horizontal-sm" :class="{ large }">₪</div>
  </text-input>
</template>
<script>
import TextInput from './TextInput.vue';

export default {
  name: 'AmountInput',
  components: {
    TextInput,
  },
  props: {
    label: {
      type: String,
      default: 'סכום',
    },
    value: {
      required: false,
    },
    maxLength: {
      type: Number,
      required: false,
    },
    autofocus: {
      type: Boolean,
      required: false,
    },
    error: {
      type: Boolean,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    inputType: {
      type: String,
      required: false,
    },
    autocomplete: {
      type: String,
      required: false,
    },
    hint: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/typography';

.large {
  font-size: $ri-font-size-32;
}
</style>
