import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import compat from "eslint-plugin-compat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    languageOptions: {
      parserOptions: {
        // The Dataset submodule ships its own tsconfig.json; pin the parser to this
        // repo's config so it can't pick the wrong root (see vendor/dataset).
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ["node_modules/", "docs/bundle.js", "docs/*.map", "**/vendor/**"],
  },
  {
    name: "project/javascript-basics",
    files: ["**/*.{ts,tsx,js,mjs}"],
    plugins: { "@eslint/js": js },
    extends: [js.configs.recommended],
  },
  ...tseslint.configs.recommended,
  {
    name: "project/baseline-compat",
    files: ["src/**/*.{ts,tsx}"],
    ...compat.configs["flat/recommended"],
  },
  {
    // Efficiency and robustness for mobile on unreliable connections.
    name: "project/efficiency",
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      complexity: ["warn", { max: 12 }],
      "max-depth": ["warn", 4],
      "max-lines-per-function": [
        "warn",
        { max: 120, skipBlankLines: true, skipComments: true },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'MemberExpression[computed=false].property[name="innerHTML"]',
          message:
            "Build DOM with the helpers in src/core/dom.ts; never assign innerHTML with dynamic content.",
        },
      ],
    },
  },
  {
    name: "project/node-globals",
    files: [
      "server.ts",
      "scripts/**/*.ts",
      "scripts/*.mjs",
      "eslint.config.js",
    ],
    languageOptions: { globals: { ...globals.node } },
  },
  // Must stay last: turns off every rule that conflicts with Prettier.
  prettier,
);
