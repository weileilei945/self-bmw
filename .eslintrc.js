module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-mixed-spaces-and-tabs': 0,
    'no-extra-semi': 2,
    'no-unused-vars': 0,
    'no-unreachable': 0,
    'no-useless-escape': 0,
    'no-prototype-builtins':0,
    'no-undef':0
  },
  "globals": {
    "WwLogin": true
  }
}