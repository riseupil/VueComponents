<template>
  <div class="ri-text-input"
       :class="{ empty: empty && !disableLabelAnimation && !large, error: error || errorMessage, disabled, readOnly, large }">
    <div class="input-container" @click="$refs.input.focus()">
      <input ref="input"
             class="ri-title"
             :class="{ ltr: inputType === 'number', 'no-label': !label }"
             @input="onInputInternal"
             @blur="onBlur"
             @focus="onFocus"
             :value="value"
             :disabled="disabled"
             :readonly="readOnly"
             :autofocus="autofocus"
             :type="inputType"
             :pattern="inputPattern"
             :maxlength="maxLength"
             :placeholder="placeholder"
             :autocomplete="autocomplete"
      />
      <slot class="symbol"/>
      <label class="label ri-title" :class="{ disabled }">{{ label }}</label>
    </div>
    <label v-if="errorMessage || hint" class="bottom-hint ri-label">{{ errorMessage || hint }}</label>
  </div>
</template>

<script>

import _ from 'lodash';
import { formatAmount, unformatAmount } from '../../utils/formatters';

export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      required: false,
    },
    value: {
      required: false,
    },
    maxLength: {
      type: Number,
      default: 1000,
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
      default: 'text',
    },
    inputPattern: {
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
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    disableLabelAnimation: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
    }
    if ((this.inputType === 'number' || this.inputType === 'tel') && !_.isEmpty(this.value)) {
      this.$refs.input.value = formatAmount(_.round(this.value, 1));
    }
  },
  computed: {
    empty() {
      return _.isEmpty(this.value) && _.isEmpty(this.placeholder);
    },
  },
  methods: {
    onInputInternal(event) {
      const { value } = event.target;
      if (this.inputType === 'number' || this.inputType === 'tel') {
        const unformattedValue = this.removeLeadingZerosAndNonNumericValues(unformatAmount(value));
        this.$emit('input', _.round(unformattedValue, 1));
        this.$nextTick(() => { // to make sure the value prop is updated before formatting it again
          this.$refs.input.value = formatAmount(unformattedValue);
        });
        return;
      }
      this.$emit('input', event.target.value);
    },
    removeLeadingZerosAndNonNumericValues(value) {
      const onlyDigits = value.replace(/[^0-9.]/g, '');
      if (onlyDigits === '') {
        return '';
      }
      const number = Number(onlyDigits);
      if (_.isNaN(number)) {
        return '';
      }
      return onlyDigits;
    },
    onBlur(event) {
      this.$emit('blur', event);
    },
    onFocus(event) {
      this.$emit('focus', event);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/riseup-colors';
@import '../../scss/border-radius';
@import '../../scss/spacings';
@import '../../scss/typography';

$input-field-height: 62px;
$input-field-font-size: 20px;
$label-right-space: 16px;
$top-label-right-space: 16px;
$input-vertical-padding: 8px;

//Remove arraows from input type number

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.ri-text-input {
  overflow: hidden;
  .input-container {
    position: relative;
    width: 100%;
    height: $input-field-height;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    transition: 300ms ease all;
    border-radius: $input-field-border-radius;
    border: 1px solid $riseup_gray_40;

    input {
      width: 100%;
      color: $riseup_black;
      padding-right: $label-right-space;
      transform: translateY(-$input-vertical-padding);
      line-height: 0;
      direction: rtl;
      border: none;
      background: none;
      &.no-label {
        transform: translateY(- calc($input-vertical-padding + ($input-field-font-size / 2)));
      }
      &:focus {
        outline: none;
      }
      &.ltr {
        direction: ltr;
        text-align: right;
      }
      &::placeholder {
        opacity: 1;
        color: $riseup_gray_40;
      }
    }

    .label {
      position: absolute;
      height: 100%;
      transform: translateY(calc(50% - ($input-field-font-size / 2))); // font size is 20px, so 50% - 10px centers the text vertically
      color: $riseup_gray_80;
      transition: 300ms ease all;
      right: $label-right-space;
      top: 0;
    }

  }
  .bottom-hint {
    display: flex;
    width: 100%;
    color: $riseup_gray_60;
    margin-right: 4px;
    margin-top: 4px;
  }

  &.large .input-container {
    height: 78px;
    input {
      font-size: $ri-font-size-32;
    }
  }

  &:focus-within:not(.readOnly):not(.disabled) .input-container {
    border: 1px solid $riseup_blue;
  }
  &:focus-within, &:not(.empty) .input-container {
    .label {
      transform: translateY($input-vertical-padding);
      right: $top-label-right-space;
      @extend .ri-label;

    }
  }
  &.error {
    .input-container {
      border: 1px solid $riseup_danger_red;
    }
    .bottom-hint {
      color: $riseup_danger_red;
    }
  }
  &.readOnly {
    .input-container {
      background: $riseup_gray_10;
      .label, input {
        color: $riseup_gray_60;
      }
    }
    .bottom-hint {
      color: $riseup_gray_40;
    }
  }
  &.disabled {
    .input-container {
      border-color: $riseup_gray_20;
      cursor: not-allowed;
    }
    .label, input, .bottom-hint {
      color: $riseup_gray_40;
      cursor: not-allowed;
    }
  }
}

</style>
