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
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'arrow-parens': ['error', 'as-needed']
  }
};
