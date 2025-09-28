module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    quotes: ["error", "backtick"],
    "prefer-template": "off",
    "prettier/prettier": "error"
  },
  settings: {
    react: { version: "detect" }
  }
};
