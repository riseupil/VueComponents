import { create } from '@storybook/theming';
import Colors from '../src/scss/riseup-js-colors.module.scss';

export default create({
  base: 'light',
  colorPrimary: Colors.riseupWhite,
  colorSecondary: Colors.riseupYellow,

  // UI
  appBg: Colors.riseupGrayDisabled,
  appContentBg: 'white',

  // Typography
  fontCode: 'sans-serif',

  // Text colors
  textColor: Colors.riseupBlack,
  textInverseColor: Colors.riseupBlack,

  brandTitle: 'RiseUp Vue Components',
});
