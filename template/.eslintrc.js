// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow extend-native
    'no-extend-native': 0,
    // 要求在语句末尾使用分号
    "semi": [1, "always", { "omitLastInOneLineBlock": true }],
    // 要求或禁止函数圆括号之前有一个空格
    "space-before-function-paren": [1, "never"],
    // 要求或禁止块内填充
    "padded-blocks": [0, { "blocks": "always" }],
    // 要求或禁止使用拖尾逗号
    "comma-dangle": [0, "always-multiline"],
    // 强制使用一致的缩进
    "indent": [1, 2],
    // 禁止使用 空格 和 tab 混合缩进
    "no-mixed-spaces-and-tabs": 2,
    // 强制操作符使用一致的换行符风格（操作符后面换行）
    "operator-linebreak": [2, "after"],
    // 强制js字符串使用单引号
    "quotes": [2, "single"],
    // 允许在正则表达式中出现控制字符
    "no-control-regex": 0,
  }
}