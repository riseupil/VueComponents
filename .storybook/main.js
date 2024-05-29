const path = require('path');

module.exports = {
  "stories": [
    "../src/stories/Welcome.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    '@storybook/addon-a11y',
    "storybook-addon-rtl",
    "storybook-css-modules-preset"
  ],
  staticDirs: [{ from: '../src/assets', to: '/src/assets' }],
  managerWebpack: async (config, options) => { // applied to the manager config
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?modules&importLoaders', 'sass-loader'],
    });
    return config;
  },
  webpackFinal: async (config, { }) => { // applied to the preview config after all user presets have been applied
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.resolve.alias = {
      "@": path.resolve(__dirname, "..", "src"),
      "vue$": "vue/dist/vue.esm.js",
    }

    return config;
  },
};
