module.exports = {
  '*.{js,ts,tsx}': [
      'eslint --fix',
      'git add'
  ],
  '*.{css,scss}': [
      'stylelint --fix',
      'git add'
  ],
  '*.{json,graphql}': [
      'prettier --write'
  ]
}
