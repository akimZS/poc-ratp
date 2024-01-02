/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier'
  ],
  ignorePatterns: ["*.json", "*.cjs"],
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": "off"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 'latest',
    project: ["./tsconfig.json"]
  }
}
