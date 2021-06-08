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
    },
    {
      files: ['*.stories.{ts,tsx}'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'import/no-anonymous-default-export': 0
      }
    }
  ],
  rules: {
    '@typescript-eslint/naming-convention': 0
  }
};
