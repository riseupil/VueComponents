import './src/scss/fonts.scss';

import RiseupButton from './src/components/RiseupButton/RiseupButton';
import Icon from './src/components/Icon.vue';
import ExpandableSection from './src/components/ExpandableSection.vue';
import Slider from './src/components/Slider.vue';
import SliderPagination from './src/components/SliderPagination.vue';
import Colors from './src/scss/riseup-js-colors.module.scss';
import * as Typography from './src/tokens/typography';
import * as Spacings from './src/tokens/spacings';
import * as BoxShadow from './src/tokens/box-shadows';
import * as BorderRadius from './src/tokens/border-radius';
import BottomTabsPage from './src/components/Tabs/BottomTabsPage';
import BottomTabsPageBus from './src/components/Tabs/BottomTabsPageBus';
import BottomSheet from './src/components/BottomSheet/BottomSheet';
import BottomSheetMenuItem from './src/components/BottomSheet/BottomSheetMenuItem';
import TabbedSection from './src/components/Tabs/TabbedSection';
import StickyCtaPage from 'src/components/StickyCtaPage';
import * as LayoutConsts from './src/utils/layout-consts';
import { RISEUP_BUTTON_VARIANT } from './src/components/RiseupButton/RiseupButton.consts';
import BarGraph from './src/components/BarGraph/BarGraph';
import TextInputV2 from './src/components/InputsV2/TextInput.vue';
import EmailInputV2 from './src/components/InputsV2/EmailInput.vue';
import AmountInputV2 from './src/components/InputsV2/AmountInput.vue';
import InputDropdownV2 from './src/components/InputsV2/InputDropdown.vue';


export default {
  RiseupButton,
  BottomTabsPage,
  BottomTabsPageBus,
  BottomSheet,
  BottomSheetMenuItem,
  StickyCtaPage,
  TextInputV2,
  EmailInputV2,
  AmountInputV2,
  InputDropdownV2,
  ExpandableSection,
  Icon,
  Slider,
  SliderPagination,
  TabbedSection,
  BarGraph,
  RiseupButtonVariant :RISEUP_BUTTON_VARIANT,
  Colors,
  LayoutConsts,
  ...Typography,
  ...Spacings,
  ...BoxShadow,
  ...BorderRadius,
};
