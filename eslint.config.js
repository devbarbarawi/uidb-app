import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import jest from 'eslint-plugin-jest'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import testingLibrary from 'eslint-plugin-testing-library'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'coverage', '.yarn']),

  // Code style in every file, JavaScript config files included.
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: { 'simple-import-sort': simpleImportSort, '@stylistic': stylistic },
    rules: {
      // Packages first, then aliases, then relative imports.
      'simple-import-sort/imports': [
        'error',
        { groups: [['^\\u0000'], ['^react', '^@?\\w'], ['^@/'], ['^\\.']] },
      ],
      'simple-import-sort/exports': 'error',
      // One import statement per module (a separate `import type` is allowed).
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      // A blank line before every `return` that follows other statements.
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },

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
    languageOptions: {
      globals: globals.browser,
      // Lets rules use TypeScript's type information.
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: {
      react: { version: 'detect' },
      // Tells jsx-a11y which HTML element each interactive styled component renders.
      'jsx-a11y': {
        components: {
          StyledSearchField: 'input',
          StyledSuggestions: 'ul',
          StyledSuggestion: 'li',
          StyledToggleButton: 'button',
          StyledFilterButton: 'button',
          StyledResetButton: 'button',
          StyledLines: 'fieldset',
        },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // Generic array syntax everywhere: Array<T> and ReadonlyArray<T>, never T[] or readonly T[].
      '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'react/prop-types': 'off', // TypeScript checks props.
      'react/self-closing-comp': 'error',
      // ARIA in HTML allows lists as listboxes and their items as options (as jsx-a11y's
      // recommended preset does; the strict preset forbids it).
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        { ul: ['listbox'], ol: ['listbox'], li: ['option'] },
      ],
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
        // styled-components: every styled component is named Styled<Name>.
        ...[
          'TaggedTemplateExpression > MemberExpression.tag[object.name="styled"]',
          'TaggedTemplateExpression > CallExpression.tag[callee.name="styled"]',
          'TaggedTemplateExpression > Identifier.tag[name="createGlobalStyle"]',
        ].map((tag) => ({
          selector: `VariableDeclarator[id.name!=/^Styled[A-Z]/] > ${tag}`,
          message: 'Name styled components Styled<Name>, e.g. StyledButton.',
        })),
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Use named exports: they keep names consistent across imports.',
        },
      ],
      // Outside the design system, import its barrel, never a file inside it.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: 'design-system/.+',
              message: "Import from the design system's barrel ('./design-system'), not its files.",
            },
          ],
        },
      ],
      // Consistent keyword and block spacing.
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
    },
  },

  // Unit tests.
  {
    files: ['**/*.test.{ts,tsx}'],
    extends: [jest.configs['flat/recommended'], testingLibrary.configs['flat/react']],
    languageOptions: { globals: globals.jest },
  },

  // Must stay last: turns off rules that conflict with Prettier.
  prettier,
])
