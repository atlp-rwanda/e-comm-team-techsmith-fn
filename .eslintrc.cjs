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
    'spaced-comment': 'off',

    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    ' import/no-unresolved': 'off',
    'react/button-has-type': 'off',
    'no-use-before-define': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'react/prop-types': 'warn',
    'default-param-last': 'off',
    'no-self-compare': 'off',
    'eact/jsx-filename-extension': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-unused-vars': 'warn',
    'no-useless-escape': 'off',
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-quotes': 'off',
    'react/forbid-prop-types': ['error', { forbid: [] }],
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
    'react/no-unescaped-entities': 'off',
    'no-nested-ternary': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ]
  }
};
