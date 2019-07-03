module.exports = {
  plugins: ['react', 'jsdoc', 'css-modules', 'prettier'],
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    // 'plugin:flowtype/recommended',
    'plugin:css-modules/recommended',
    'prettier',
    // 'prettier/flowtype',
    'prettier/react'
  ],
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaVersion: 6,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    // Common js rules
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: 0,
    curly: 2,
    eqeqeq: 2,
    'no-extend-native': 2,
    'no-proto': 2,
    'no-caller': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'new-cap': 0,
    quotes: [2, 'single'],
    'max-depth': [2, 3],
    'max-statements': [2, 45],
    'max-len': [2, 200],
    'no-eq-null': 2,
    'operator-linebreak': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 2
      }
    ],
    'no-mixed-spaces-and-tabs': 0,
    'space-unary-ops': 2,
    'no-multi-spaces': 2,
    'space-before-blocks': 0,
    'keyword-spacing': 0,
    'space-infix-ops': 0,
    'comma-spacing': [
      0,
      {
        before: false,
        after: true
      }
    ],
    'comma-dangle': 0,
    'wrap-iife': 2,
    'no-extra-semi': 2,
    'semi-spacing': 2,
    'spaced-comment': 2,
    'func-names': 0,
    'no-else-return': 0,

    // NodeJs rules
    'block-scoped-var': 2,
    'global-require': 0,
    'no-mixed-requires': 2,
    'no-new-require': 2,

    // ES6 rules
    'arrow-spacing': 2,
    'no-useless-constructor': 0,
    'no-const-assign': 2,
    'no-var': 2,
    'prefer-const': 0,
    'class-methods-use-this': 0,

    // React
    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-array-index-key': 0,
    'react/sort-comp': 0,

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': 'off',

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    // Functional and class components are equivalent from React’s point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'no-script-url': 'off',
    'react/jsx-no-target-blank': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'import/order': 'off',
    'react/jsx-no-bind': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'react/no-access-state-in-setstate': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'react/forbid-prop-types': 'off',
    'no-useless-escape': 'off',
    'no-restricted-globals': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'react/no-this-in-sfc': 'off',
    'operator-linebreak': 'off',
    //'react/no-unused-state': 'off',
    'no-unused-expressions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-case-declarations': 'off',
    'array-callback-return': 'off',
    'import/prefer-default-export':'off',
    'import/no-extraneous-dependencies':'off'
  },
  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {}
  }
};
