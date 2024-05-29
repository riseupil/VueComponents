<template>
  <icon icon-name="expand_more" class="expand-arrow" weight="bold" size="24px" :class="{ 'expanded': expanded }"/>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'ExpandArrow',
  components: { Icon },
  // Internal, not exported
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>

.expand-arrow{
  transition: transform 0.5s cubic-bezier(0.5, 1.65, 0.41, 0.8); /* bounce effect */
}

.expanded{
  transform: rotate(-180deg)
}
</style>
