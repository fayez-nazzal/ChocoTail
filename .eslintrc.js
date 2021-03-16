module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "react-hooks", "react"],
  parser: "babel-eslint",
  rules: {
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": 1,
    "react-hooks/exhaustive-deps": 1,
    "prettier/prettier": 1,
  },
  settings: {
    react: {
      version: "17.0.1",
    },
  },
}
