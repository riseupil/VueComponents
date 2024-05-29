import BottomSheet from '@/components/BottomSheet/BottomSheet';
import RiseupButton from '@/components/RiseupButton/RiseupButton';
import { action } from '@storybook/addon-actions';
import BottomSheetMenuItem from '@/components/BottomSheet/BottomSheetMenuItem';
import { BOTTOM_SHEET_VARIANT } from '@/components/BottomSheet/BottomSheet.consts';

export default {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const actionsData = {
  option1Clicked: action('option1-clicked'),
  option2Clicked: action('option2-clicked'),
  option3Clicked: action('option3-clicked'),
};

const Template = (args, { argTypes }) => {
  return {
    components: {
      BottomSheet,
      RiseupButton,
      BottomSheetMenuItem,
    },
    props: Object.keys(argTypes),
    data() {
      return {
        actionsData,
        showBottomSheet: false,
        randomNum: '',
        loading: false,
      };
    },
    methods: {
      openBottomSheet() {
        this.showBottomSheet = true;
      },
      closeBottomSheet() {
        this.showBottomSheet = false;
      },
      randomizeNumber() {
        this.randomNum = Math.random();
      },
      load() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },
    },
    template: `
      <div class="flex-column align-center" style="height: 100vh; padding: 0 16px">
      <riseup-button class="margin-vertical-m" @click="openBottomSheet" title="Open bottom sheet"/>
      <riseup-button @click="randomizeNumber" title="Content blocking test - click me!"/>
      {{ randomNum }}
      <div v-if="showBottomSheet" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; pointer-events: none;" tabindex="-1"
           aria-hidden="true">
        <bottom-sheet v-bind="$props" @close="closeBottomSheet" :disabled="loading">
          <template v-slot:header>
            <div class="flex-column" style="row-gap: 4px">
              <div class="ri-bold-body">WOLT</div>
              <div class="ri-medium-display"><span class="ri-title">₪</span>1,352</div>
              <div class="ri-label">כרטיס 7803, 15.10.21</div>
            </div>
          </template>
          <template v-slot:menuItems>
            <bottom-sheet-menu-item text="חודשים קודמים" @click="actionsData.option1Clicked()" :showNewBadge="true"
                                    :icon-props="{iconName: 'bar_chart', fill: true, weight: 'bold'}"/>
            <bottom-sheet-menu-item text="לערוך את הצפי" @click="actionsData.option2Clicked()"
                                    :icon-props="{iconName: 'edit', fill: true, weight: 'bold'}"/>
            <bottom-sheet-menu-item text="אפשרות לא זמינה" @click="actionsData.option3Clicked()" disabled
                                    :icon-props="{iconName: 'comment'}"/>
            <bottom-sheet-menu-item text="אפשרות אסינכרונית" @click="load" :loading="loading" :icon-props="{iconName: 'pets'}"/>
          </template>
        </bottom-sheet>
      </div>
      </div>`,
  };
};

export const Default = Template.bind({});
Default.args = {
  variant: BOTTOM_SHEET_VARIANT.PRIMARY,
};
