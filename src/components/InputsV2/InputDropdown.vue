<template>
  <v-select class="input-dropdown" :class="{ disabled }" ref="select" :value="selected" @input="onChange"
            :searchable="false" :clearable ="false" :options="options" :placeholder="placeholder" :disabled="disabled">
    <template slot="selected-option" slot-scope="option">
      <span class="label" :style="{color: option.color}">{{option.selectedLabel || option.label }}</span>
    </template>
    <template slot="option" slot-scope="option">
      <span class="label" :style="{color: option.color}">{{option.label}}</span>
    </template>
    <template slot="open-indicator" slot-scope="indicatorProps">
      <icon icon-name="expand_more" :class="indicatorProps.attributes.class"/>
    </template>
  </v-select>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import Icon from '../Icon';

Vue.component('v-select', vSelect);

export default {
  name: 'InputDropdown',
  components: {
    Icon,
    vSelect,
  },
  props: {
    firstSelected: {
      type: Object,
      require: true,
    },
    options: {
      type: Array,
      require: true,
    },
    onSelect: {
      type: Function,
      require: true,
    },
    placeholder: {
      type: String,
      require: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.firstSelected,
    };
  },
  methods: {
    onChange(value) {
      this.selected = value;
      this.onSelect(value);
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/riseup-colors';
@import '../../scss/spacings';
@import '../../scss/border-radius';
@import '~vue-select/dist/vue-select.css';
@import "../../scss/mixins";

.input-dropdown {
  position: relative;
  color: $riseup_black;
  font-size: 18px;
  line-height: 18px;
  direction: rtl;

  .vs__search {
    color: $riseup_gray_2;
  }

  &.vs--open {
    .vs__dropdown-toggle {
      border: 1px solid $riseup_blue;
      border-radius: $input-field-border-radius $input-field-border-radius 0 0;
      border-bottom: none;
    }
  }

  .label {
    font-size: 16px;
    @include ellipsis-text;
  }

  .vs__dropdown-toggle {
    border: 1px solid $riseup_black;
    border-radius: $input-field-border-radius;
    height: 58px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $riseup_black;
    background-color: $riseup_white;
    z-index: 1000;
    position: sticky;

    .vs__actions {
      // every element in the select input is getting a margin-top 4px but the actions,
      // adding it so it the actions will be cented like other components
      margin-top: 4px;
      padding: 0 0 0 20px;

      .vs__open-indicator {
        display: flex;
        font-size: 25px;
        transition: transform 0.5s cubic-bezier(0.5, 1.65, 0.41, 0.8); /* bounce effect */
      }
    }

  }

  .vs__dropdown-menu {
    position: relative;
    border: 1px solid $riseup_blue;
    border-bottom-left-radius: $input-field-border-radius;
    border-bottom-right-radius: $input-field-border-radius;
    box-shadow: none;
    padding: 0;
    z-index: 1;
    top: 100%;
  }

  .vs__dropdown-option {
    display: flex;
    align-items: center;
    padding: $ri-spacing-xs $ri-spacing-sm;

    &:first-child {
      padding-top: $ri-spacing-sm;
    }

    &:last-child {
      padding-bottom: $ri-spacing-sm;
    }

    &.vs__dropdown-option--highlight  {
      background: #f6f6f6;
      color: $riseup_black;
    }
  }

  .vs__selected-options {
    flex-wrap: nowrap;
    padding: $ri-spacing-sm;
    overflow: hidden;
    .vs__selected {
      // remove the default padding
      margin-right: 0;
      margin-left: 0;
      padding-right: 0;
      padding-left: 0;
      overflow: hidden;
    }
  }

  &.vs--open {
    .vs__open-indicator {
      transform: rotate(180deg) scale(1);
    }
    .vs__selected {
      opacity: 1;
    }
  }

  &.disabled {
    .vs__dropdown-toggle {
      color: $riseup_gray_2;
      border: 1px solid $riseup_gray_2;
      background-color: $riseup_gray_4;
      cursor: default;
    }

    .vs__selected {
      color: $riseup_gray_2;
    }

    .vs__search {
      background-color: $riseup_gray_4;
      color: $riseup_gray_2;
    }

    .vs__open-indicator {
      background-color: $riseup_gray_4;
    }
  }
}
</style>
