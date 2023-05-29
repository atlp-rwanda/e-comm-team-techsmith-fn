module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'default-param-last': 'off',
    'eact/jsx-filename-extension': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': ['error', 'always'],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
  }
};