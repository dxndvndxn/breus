module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "autofix", "jest"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "linebreak-style": "off",
    "arrow-body-style": ["error", "as-needed"],
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "autofix/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        singleQuote: true,
      },
    ],
  },
};
