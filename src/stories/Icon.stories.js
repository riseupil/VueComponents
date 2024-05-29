import Icon from '@/components/Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    variant: {
      options: ['outlined', 'rounded', 'sharp'],
      control: { type: 'inline-radio' },
    },
    weight: {
      options: ['normal', 'bold'],
      control: { type: 'inline-radio' },
    },
  },
};

const Template = (args, { argTypes }) => {
  return {
    components: { Icon },
    props: Object.keys(argTypes),
    template: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <icon v-bind="$props"/>
        <div style="margin-top: 32px;
                    font-size: 14px;
                    direction: ltr;
                    display: inline-block;
                    text-align: center;">
          The list of all icons is available
          <a style="display: inline-block" href="https://fonts.google.com/icons" target="_blank">here</a>
        </div>
      </div>
    `,
  };
};

export const Default = Template.bind({});
Default.args = {
  iconName: 'water_drop',
  size: '48px',
};
