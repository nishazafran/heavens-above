import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, 
      },
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",   
      "no-undef": "warn",         
      "no-console": "off",       
      "no-redeclare": "off",   
      "no-empty": "off"          
    },
    ignores: [
      "node_modules/",
      "build/",
      "dist/",
      "coverage/",
      "public/",
      "run.js",
      "src/iridium.test.js"
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
]);
