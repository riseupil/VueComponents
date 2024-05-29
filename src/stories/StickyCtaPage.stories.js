import StickyCtaPage from '@/components/StickyCtaPage';
import { action } from '@storybook/addon-actions';
import { RISEUP_BUTTON_COLORS } from '@/components/RiseupButton/RiseupButton.consts';

export default {
  title: 'Components/StickyCtaPage',
  component: StickyCtaPage,
  parameters: {
    layout: 'fullscreen',
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onButtonClicked: action('button-clicked'),
};

const Template = (args, { argTypes }) => {
  return {
    components: { StickyCtaPage },
    props: Object.keys(argTypes),
    methods: actionsData,
    template: `${'<sticky-cta-page v-bind="$props">'
      + '<template>'}${
      Array.from({ length: 25 }, (_, i) => '<div class="padding-sm">תוכן דף</div>').join(' ')
    }</template>`
      + '</sticky-cta-page>',
  };
};

export const Default = Template.bind({});
Default.args = {
  ctaProps: {
    buttonProps: {
      title: 'קריאה לפעולה',
      color: RISEUP_BUTTON_COLORS.DARK_GREEN,
    },
    backgroundColor: 'white',
  },
  pageBackgroundColor: 'white',
};
Default.decorators = [
  () => {
    return {
      template: '<div style="height: 100vh"><story/></div>',
    };
  },
];
