import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['tests/**/*.ts', 'pages/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      playwright: playwright,
    },
    rules: {
      'playwright/no-skipped-test': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-page-pause': 'error',
      'playwright/require-soft-assertions': 'warn',
    },
  },
];
