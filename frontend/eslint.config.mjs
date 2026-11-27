import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

const archivosJuego = ["public/game/**/*.js"];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...jsdoc.configs["flat/recommended-error"],
    files: archivosJuego,
  },
  {
    files: archivosJuego,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: "error",
      "max-lines-per-function": [
        "error",
        { max: 30, skipBlankLines: true, skipComments: true },
      ],
      "max-depth": ["error", 2],
      "max-params": ["error", 5],
      "id-length": ["error", { min: 2, exceptions: ["x", "y", "_"] }],
      "jsdoc/require-property-description": "off",
      "jsdoc/require-jsdoc": [
        "error",
        { publicOnly: false, require: { FunctionDeclaration: true } },
      ],
    },
  },
  prettier,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "types/**",
  ]),
]);

export default eslintConfig;
