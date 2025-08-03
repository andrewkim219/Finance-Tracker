import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginImport from "eslint-plugin-import";
import typescript from "typescript-eslint";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...typescript.config(),
    plugins: {
      prettier,
      react,
      "react-hooks": reactHooks,
      import: eslintPluginImport,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: typescript.parser,
      // Remove the project reference or fix the path
      parserOptions: {
        // project: "./tsconfig.json",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        document: "readonly",
        window: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
