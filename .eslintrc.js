module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/max-attributes-per-line': [2, {
      'singleline': 20,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'no-param-reassign': 0,
    "no-underscore-dangle": 'off',
    "indent": "off",


  },
};
