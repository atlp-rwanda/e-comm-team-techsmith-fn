module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react-refresh", "react", "react-hooks", "jsx-a11y", "prettier"],
  rules: {
    "react-refresh/only-export-components": "warn",
    quotes: "off",
    semi: ["error", "always"],
    "no-console": "warn",
    "one-var": 1,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 0,
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": 1,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },

};
