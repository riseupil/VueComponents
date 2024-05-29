import TabbedSection from '@/components/Tabs/TabbedSection';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/TabbedSection',
  component: TabbedSection,
  parameters: {
    layout: 'fullscreen',
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const actionsData = {
  tabClick: action('tab-clicked'),
};

const Template = (args, { argTypes }) => {
  return {
    components: {
      TabbedSection,
    },
    props: Object.keys(argTypes),
    data() {
      return {
        selectedTab: 'tab1',
        actionsData,
        ContainerStyles,
      };
    },
    methods: {
      onTabClick(key, index) {
        this.actionsData.tabClick(key, index);
        this.selectedTab = key;
      },
    },
    template: `
      <tabbed-section v-bind="$props" @tab-click="onTabClick">
      <div :style="ContainerStyles + 'background-color: #CFEADD'" v-if="selectedTab === 'tab1'">
        Tab 1 content
      </div>
      <div :style="ContainerStyles + 'background-color: #ECD8E9'" v-else-if="selectedTab === 'tab2'">
        Tab 2 content
      </div>
      <div :style="ContainerStyles + 'background-color: #DCE8F6'" v-else>
        Tab 3 content
      </div>
      </tabbed-section>`,
  };
};

const ContainerStyles = 'height: 400px; display: flex; justify-content: center; align-items: center; ';
export const TwoTabs = Template.bind({});
TwoTabs.args = {
  tabs: [
    {
      key: 'tab1',
      text: 'כמה שמתי',
    },
    {
      key: 'tab2',
      text: 'על מה הוצאתי',
    },
  ],
};
// add gray background to the story
TwoTabs.decorators = [
  () => {
    return {
      template: '<div style="height: 100vh;"><story/></div>',
    };
  },
];

export const OverflowingTabs = Template.bind({});
OverflowingTabs.args = {
  tabs: [
    {
      key: 'tab1',
      text: 'הכנסות משתנות',
    },
    {
      key: 'tab2',
      text: 'הוצאות קבועות ומשתנות',
    },
    {
      key: 'tab3',
      text: 'הכנסות קבועות',
    },
    {
      key: 'tab4',
      text: 'חיסכון',
    },
    {
      key: 'tab5',
      text: 'לא תזרימי',
    },
  ],
};
OverflowingTabs.decorators = [
  () => {
    return {
      template: '<div style="height: 100vh;"><story/></div>',
    };
  },
];
