import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    rules: {
      // Semicolon rules
      "semi": ["error", "always"],
      "no-extra-semi": "error",
      "semi-spacing": ["error", { "before": false, "after": true }],
      "semi-style": ["error", "last"],
      
      // Standard-like rules
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "comma-dangle": ["error", "never"],
      "space-before-function-paren": ["error", "always"],
      "keyword-spacing": "error",
      "space-infix-ops": "error",
      "eol-last": "error",
      "no-trailing-spaces": "error"
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
]);