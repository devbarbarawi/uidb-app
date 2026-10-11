import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),

  // TypeScript + React: recommended presets, type-aware.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.strict,
    ],
    plugins: { 'simple-import-sort': simpleImportSort },
    languageOptions: {
      globals: globals.browser,
      // Lets rules use TypeScript's type information.
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // Packages first, then aliases, then relative imports (auto-fixable).
      'simple-import-sort/imports': [
        'error',
        { groups: [['^\\u0000'], ['^react', '^@?\\w'], ['^@/'], ['^\\.']] },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'react/prop-types': 'off', // TypeScript checks props.
      'react/self-closing-comp': 'error',
      eqeqeq: ['error', 'smart'],
    },
  },

  // Our conventions, for application code.
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Arrow functions everywhere.
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      // One React component per file.
      'react/no-multi-comp': ['error', { ignoreStateless: false }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ClassDeclaration, ClassExpression',
          message: 'Use functions and plain objects instead of classes.',
        },
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Use named exports: they keep names consistent across imports.',
        },
      ],
      // Consistent keyword and block spacing.
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
    },
  },

  // Must stay last: turns off rules that conflict with Prettier.
  prettier,
])
