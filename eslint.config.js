const js = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

const config = [
	// Ignore patterns (replacing .eslintignore)
	{
		ignores: [
			"node_modules/**",
			".next/**",
			".server/**",
			"server/graphql.ts",
			"src/graphql/index.tsx",
			"src/graphql/introspection.json",
		],
	},

	// Base JavaScript recommended rules
	js.configs.recommended,

	// Legacy configs using FlatCompat
	...compat.extends(
		"next/core-web-vitals",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	),

	// Custom rules and parser configuration
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			import: importPlugin,
			"unused-imports": unusedImportsPlugin,
		},
		rules: {
			// Disable base no-unused-vars in favor of unused-imports
			"no-unused-vars": "off",

			// Unused imports rules
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			// Import organization rules
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "parent", "sibling", "index", "type"],
				},
			],
			"import/first": "error",
			"import/newline-after-import": "error",
		},
		settings: {
			"import/extensions": [".js", ".jsx", ".ts", ".tsx"],
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
				typescript: {
					alwaysTryTypes: true,
				},
			},
		},
	},

	// TypeScript-specific overrides
	{
		files: ["**/*.ts"],
		rules: {
			"react-hooks/rules-of-hooks": "off",
		},
	},
];

module.exports = config;
