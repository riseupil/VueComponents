import BottomTabsPage from '@/components/Tabs/BottomTabsPage';
import BottomTabsPageBus from '@/components/Tabs/BottomTabsPageBus';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/BottomTabsPage',
  component: BottomTabsPage,
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
      BottomTabsPage,
    },
    props: Object.keys(argTypes),
    data() {
      return {
        actionsData,
        selectedTab: 'tab1',
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
      <bottom-tabs-page v-bind="$props" @tab-click="onTabClick">
      <div :style="ContainerStyles + 'background-color: #CFEADD'" v-if="selectedTab === 'tab1'">
        Tab 1 content
      </div>
      <div :style="ContainerStyles + 'background-color: #ECD8E9'" v-else-if="selectedTab === 'tab2'">
        Tab 2 content
      </div>
      <div :style="ContainerStyles + 'background-color: #DCE8F6'" v-else>
        Tab 3 content
      </div>
      </bottom-tabs-page>`,
  };
};

const ContainerStyles = 'height: 100%; display: flex; justify-content: center; align-items: center; ';
export const TwoTabs = Template.bind({});
TwoTabs.args = {
  tabs: [
    {
      key: 'tab1',
      text: 'Tab 1',
    },
    {
      key: 'tab2',
      text: 'Tab 2',
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

export const ThreeTabs = Template.bind({});
ThreeTabs.args = {
  tabs: [
    {
      key: 'tab1',
      text: 'Tab 1',
    },
    {
      key: 'tab2',
      text: 'Tab 2',
    },
    {
      key: 'tab3',
      text: 'Tab 3',
    },
  ],
};
ThreeTabs.decorators = [
  () => {
    return {
      template: '<div style="height: 100vh;"><story/></div>',
    };
  },
];

const HideOnScrollTemplate = (args, { argTypes }) => {
  return {
    components: {
      BottomTabsPage,
    },
    props: Object.keys(argTypes),
    data() {
      return {
        actionsData,
        selectedTab: 'tab1',
        ContainerStyles,
        BottomTabsPageBus,
      };
    },
    methods: {
      onTabClick(key, index) {
        this.actionsData.tabClick(key, index);
        this.selectedTab = key;
      },
      onScroll(e) {
        BottomTabsPageBus.$emit('scroll', e.target);
      },
    },
    template: `
      <div style="height: 100%; overflow-y: auto; background-color: #CFEADD;" @scroll="onScroll">
      <bottom-tabs-page v-bind="$props" @tab-click="onTabClick" hide-on-scroll style="height: unset; width: 100%">
        <div :style="ContainerStyles + ' display: flex; flex-direction: column;width: 100%; '
        + (selectedTab === 'tab1' ? '' : 'background-color: #ECD8E9')">
          <div v-for="a in Array(200)" style="padding: 8px">
            Tab {{ selectedTab === 'tab1' ? '1' : '2' }} content
          </div>
        </div>
      </bottom-tabs-page>
      </div>`,
  };
};

export const HideOnScroll = HideOnScrollTemplate.bind({});
HideOnScroll.args = {
  hideOnScroll: true,
  tabs: [
    {
      key: 'tab1',
      text: 'Tab 1',
    },
    {
      key: 'tab2',
      text: 'Tab 2',
    },
  ],
};
HideOnScroll.decorators = [
  () => {
    return {
      template: '<div style="height: 100vh;width: 100vw;"><story/></div>',
    };
  },
];
