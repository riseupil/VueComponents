import RiseupButton from '@/components/RiseupButton/RiseupButton';
import { action } from '@storybook/addon-actions';
import { RISEUP_BUTTON_COLORS, RISEUP_BUTTON_VARIANT } from '@/components/RiseupButton/RiseupButton.consts';

export default {
  title: 'Components/RiseupButton',
  component: RiseupButton,
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  argTypes: {
    variant: {
      options: RISEUP_BUTTON_VARIANT,
      control: { type: 'select' },
    },
    color: {
      options: RISEUP_BUTTON_COLORS,
      control: { type: 'select' },
    },
  },
};

export const actionsData = {
  onButtonClicked: action('button-clicked'),
};

const Template = (args, { argTypes }) => {
  return {
    components: { RiseupButton },
    props: Object.keys(argTypes),
    methods: actionsData,
    template: '<riseup-button v-bind="$props" @click="onButtonClicked" />',
  };
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'קריאה לפעולה',
  color: RISEUP_BUTTON_COLORS.BLUE,
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'קריאה לפעולה',
  variant: RISEUP_BUTTON_VARIANT.SECONDARY,
  color: RISEUP_BUTTON_COLORS.BLUE,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  title: 'קריאה לפעולה',
  variant: RISEUP_BUTTON_VARIANT.TERTIARY,
  color: RISEUP_BUTTON_COLORS.BLUE,
};

export const Loading = Template.bind({});
Loading.args = {
  title: 'קריאה לפעולה',
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: 'קריאה לפעולה',
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'קריאה לפעולה',
  iconProps: {
    iconName: 'settings',
    fill: true,
  },
};
