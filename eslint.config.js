import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["node_modules/", "docs/bundle.js", "docs/*.map"],
  },
  {
    name: "project/javascript-basics",
    files: ["**/*.{ts,tsx,js,mjs}"],
    plugins: { "@eslint/js": js },
    extends: [js.configs.recommended],
  },
  ...tseslint.configs.recommended,
  {
    name: "project/node-globals",
    files: ["server.ts", "scripts/**/*.ts", "eslint.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  // Must stay last: turns off every rule that conflicts with Prettier.
  prettier,
);
