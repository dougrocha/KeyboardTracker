module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    // "plugin:@next/next/recommended",
    // "plugin:@next/next/core-web-vitals",
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["import"],

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    "import/no-unresolved": "off",
    "import/no-named-default": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "index",
          "sibling",
          "parent",
        ],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
  },
}
