module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',

    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    quotes: 'off',
    semi: ['error', 'always'],
    'no-console': 'warn',
    'one-var': 1,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  ignorePatterns: ['node_modules/'],
};
