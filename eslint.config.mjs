import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Apply to all JS files
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Jest globals
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
  },
  {
    // For JS files, treat as CommonJS
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    // Optional: override rules
    rules: {
      "no-unused-vars": ["warn"], // warn instead of error
      "no-undef": "error",
    },
  },
]);
