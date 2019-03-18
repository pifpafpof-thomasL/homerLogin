module.exports = {
    "env": {
     "commonjs": true,
     "es6": true,
     "node": true
    },
    "extends": "airbnb-base",
    "globals": {
     "Atomics": "readonly",
     "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
     "ecmaVersion": 2018
    },
    "rules": {
     "react/jsx-filename-extension": 0,
     "react/jsx-one-expression-per-line": 0,
     "react/prefer-stateless-function": 0,
     "react/no-array-index-key": 0,
     "no-param-reassign": 0,
     "no-restricted-globals": 0,
     "no-console": 0,
     "comma-dangle": 0,
     "arrow-parens": 0
    }
};