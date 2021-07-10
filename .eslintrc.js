module.exports = {
  extends: ['./node_modules/@tkvlnk/configs/eslint/react.js'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    project: './tsconfig.json'
  },
  overrides: [
    {
      files: ['*.spec.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
      env: {
        jest: true
      },
      globals: {
        fetchMock: 'readonly'
      }
    }
  ],
  rules: {
    '@typescript-eslint/naming-convention': 0,
    'no-void': [2, { allowAsStatement: true }],
    'import/prefer-default-export': 0,
    'import/no-default-export': 2
  }
};
