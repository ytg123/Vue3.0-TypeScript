module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': [
    //     // eslint校验不成功后，error或2则报错，warn或1则警告，off或0则无提示
    //     'error',
    //     {
    //       // 不要分号
    //       semi: false,
    //       // 设置单引号
    //       singleQuote: true,
    //       // 设置换行长度
    //       printWidth: 160
    //     }
    //   ]
  }
}
