<template>
  <text-input
    :label="label"
    :value="value"
    @input="onInputInternal"
    input-type="email"
    :error="error"
    :error-message="emailErrorLabel" />
</template>

<script>
import _ from 'lodash';
import TextInput from './TextInput.vue';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w\w+$/;

export default {
  name: 'EmailInput',
  components: {
    TextInput,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    emailErrorLabel() {
      return this.error ? 'האימייל שהזנת לא תקין' : undefined;
    },
  },
  mounted() {
    this.calcEmailError();
  },
  methods: {
    onInputInternal(value) {
      this.$emit('input', value);
      this.calcEmailError();
    },
    calcEmailError() {
      if (_.isEmpty(this.value)) {
        this.error = false;
        this.$emit('error', false);
      } else {
        this.error = !emailRegex.test(this.value);
      }
      this.$emit('error', this.error);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
