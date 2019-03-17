module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    fetch: true,
    require: true,
    toast: true,
    loading: true,
    actionSheet: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: [
    'react',
  ],
  rules: {
    'arrow-parens': 0,
    'no-console': 0,
    // no-var
    'no-var': 'error',
    // 强制使用单引号
    'quotes': ['error', 'single'],
    // 禁止使用分号
    'semi': ['error', 'never'],
    // 禁止不必要的分号
    'no-extra-semi': 'error',
    // 强制使用一致的换行风格
    'linebreak-style': 0, // ['error', 'unix']
    // 空格2个
    'indent': ['error', 2, {'SwitchCase': 1}],
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    'comma-dangle': [2, 'never'],
    // 控制逗号前后的空格
    'comma-spacing': [2, {'before': false, 'after': true}],
    // 不允许在大括号之间留出空格
    'object-curly-spacing': ['error', 'never'],
    'react/prefer-stateless-function': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': ['error', {'extensions': ['.js', '.jsx']}],
    'react/forbid-prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/no-string-refs': 0,
    'max-len': ['error', 200],
    'global-require': 0,
    'no-return-await': 0,
    'eslint arrow-parens': 0,
    'react/no-access-state-in-setstate': 0,
    'import/prefer-default-export': 0,
    'react/no-array-index-key': 0,
    'import/no-unresolved': 0
  },
};
