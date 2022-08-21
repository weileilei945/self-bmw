module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true, // 单引号
  trailingComma: 'none', // 行尾逗号,默认none,可选 none|es5|all
  semi: false, // 末尾是否自动加上分号
  arrowParens: 'avoid', // 箭头函数参数括号 默认avoid 可选 avoid| always
  vueIndentScriptAndStyle: true, //缩进Vue文件中
  quoteProps: 'as-needed',
  bracketSpacing: true,
  jsxSingleQuote: false,
  jsxBrackets: false,
  insertPragma: false, //在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了
  requirePragma: false, //严格按照文件顶部的一些特殊的注释格式化代码
  proseWrap: 'always', //文本样式进行折行
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto' //设置统一的行结尾样式
}
