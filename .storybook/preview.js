import { initializeRTL } from 'storybook-addon-rtl';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
initializeRTL();

// Necessary for successfully rendering lottie animations
import '@lottiefiles/lottie-player';
import '../src/scss/fonts.scss';
import '../src/scss/icons-font-classes.scss';
import './global-styles.scss';

const customViewports = {
  iphone13: {
    name: 'Iphone 13',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
};

export const parameters = {
  viewMode: 'story',
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: { ...customViewports, ...MINIMAL_VIEWPORTS },
    defaultViewport: "iphone13"
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
