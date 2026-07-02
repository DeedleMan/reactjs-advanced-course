import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Игнорируемые папки
  { ignores: ["dist", "node_modules"] },

  // Базовая конфигурация для JS/TS и React
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import-x": importX,
      prettier: prettierPlugin,
    },
    settings: {
      // Подключение TypeScript-резолвера для чтения путей из tsconfig.json
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.app.json",
        },
      },
      "import-x/internal-regex": "^@/",
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Включение форматирования Prettier через ESLint
      "prettier/prettier": "error",

      // --- Принципы FSD и чистые импорты ---

      // Настройка порядка импортов по методологии FSD
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin", // Встроенные (fs, path)
            "external", // Внешние либы (react, vite)
            "internal", // Абсолютные импорты проекта (@/*)
            ["parent", "sibling", "index"], // Относительные локальные пути
          ],
          pathGroups: [
            // Выделяем слои FSD в импортах для наглядности
            { pattern: "@/app/**", group: "internal", position: "before" },
            { pattern: "@/pages/**", group: "internal", position: "before" },
            { pattern: "@/widgets/**", group: "internal", position: "before" },
            { pattern: "@/features/**", group: "internal", position: "before" },
            { pattern: "@/entities/**", group: "internal", position: "before" },
            { pattern: "@/shared/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always", // Разделять группы пустой строкой
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Предотвращаем дублирование импортов из одного и того же модуля
      "import-x/no-duplicates": "error",
    },
  },

  // Отключение конфликтующих правил форматирования
  prettierConfig,
);
