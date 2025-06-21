import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },

  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
]);
