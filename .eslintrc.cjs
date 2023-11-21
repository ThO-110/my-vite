module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    // "ban-ts-ignore": false,

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true, // Allow `const { props, state } = this`
        allowedNames: ['vm'] // Allow `const vm= this`
      }
    ],

    'prefer-const': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
    'no-loss-of-precision': 'off',
    'no-nonoctal-decimal-escap': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-useless-backreference': 'off'
  },
  plugins: ['html']
}
