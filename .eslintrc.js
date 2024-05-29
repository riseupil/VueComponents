module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  plugins: [
    'vue'
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"]
        ],
        extensions: [".js", ".vue"]
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off'
  }
};
