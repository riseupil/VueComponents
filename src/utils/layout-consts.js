import _ from 'lodash';

export const BACKGROUND_POSITION = {
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_RIGHT: 'bottom right',
  TOP: 'top',
  TOP_LEFT: 'top left',
  TOP_RIGHT: 'top right',
};

export const BACKGROUND_POSITIONS = Object.values(BACKGROUND_POSITION);

export const DECLARATIVE_COLOR_VARIANT = {
  WHITE: 'white',
  BLUE: 'blue',
  GREEN: 'green',
  LIGHT_YELLOW: 'light-yellow',
  YELLOW: 'yellow',
  RED: 'red',
  ORANGE: 'orange',
  PINK: 'pink',
  NEUTRAL: 'neutral',
  LIGHT_BLUE: 'light-blue',
  LIGHT_GREEN: 'light-green',
  DARK_GREEN: 'dark-green',
  DARK_BLUE: 'dark-blue',
  BEIGE: 'beige',
  BLACK: 'black',
  SATURATED_RED: 'saturated-red',
};

export const SEMANTIC_COLOR_VARIANT = {
  PRIMARY: DECLARATIVE_COLOR_VARIANT.BLUE,
  TRACKING_CATEGORY: DECLARATIVE_COLOR_VARIANT.BLUE,
  SUCCESS: DECLARATIVE_COLOR_VARIANT.GREEN,
  WARNING: DECLARATIVE_COLOR_VARIANT.YELLOW,
  VARIABLE: DECLARATIVE_COLOR_VARIANT.YELLOW,
  WARM: DECLARATIVE_COLOR_VARIANT.ORANGE,
  SAVING: DECLARATIVE_COLOR_VARIANT.ORANGE,
  DANGER: DECLARATIVE_COLOR_VARIANT.RED,
  EXPENSE: DECLARATIVE_COLOR_VARIANT.RED,
  FIXED: DECLARATIVE_COLOR_VARIANT.PINK,
};

export const COLOR_VARIANT = {
  ...DECLARATIVE_COLOR_VARIANT,
  ...SEMANTIC_COLOR_VARIANT,
};

export const COLOR_VARIANTS = _.uniq(Object.values(COLOR_VARIANT));
