import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  typescript: {
    overrides: {
      'antfu/no-top-level-await': 'off',
      'node/prefer-global/process': 'off',
      'import-x/consistent-type-specifier-style': 'off',
      'no-console': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
    },
  },
  stylistic: {
    semi: true,
    overrides: {
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'style/brace-style': ['error', '1tbs'],
      'style/arrow-parens': ['error', 'always'],
      'style/comma-dangle': ['error', 'only-multiline'],
    },
  },
});
