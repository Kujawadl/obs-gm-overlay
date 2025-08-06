const js = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const globals = require("globals");

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

const config = [
	// Ignore patterns (replacing .eslintignore)
	{
		ignores: [
			"node_modules/**",
			"graphql/client-types.tsx",
			"graphql/introspection.json",
			"*.config.{js,ts,json}",
			"*-loader.js",
			".rollup.cache",
			"dist",
			"build-sea.js",
		],
	},

	// Base JavaScript recommended rules
	js.configs.recommended,

	// Legacy configs using FlatCompat
	...compat.extends(
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

	{
		files: ["{src,graphql,utils}/**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},

	{
		files: ["{server,graphql,utils}/**/*.{js,ts}"],
		languageOptions: {
			globals: {
				...globals.node,
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
