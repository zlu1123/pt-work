module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": [2, {"anonymous": "never", "named": "never"}],
    "no-var": 0,//禁用var，用let和const代替
    "quotes": [0, "double"]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
