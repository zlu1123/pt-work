module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": [2, {
      "anonymous": "always",
      "named": "never"
    }],
    "no-var": 0, // 禁用var，用let和const代替
    "quotes": [0, "double"],
    // "semi": [2, "always"],//语句强制分号结尾
    'semi': [0, "never"],
    "camelcase": ["error", {
      "allow": ["aa_bb"]
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  "globals": {
    "AMap": false
  }
}
