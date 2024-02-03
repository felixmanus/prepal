const jestFiles = ['tests/**/__tests__/**/*', 'tests/**/*.{spec,test}.*'];
const testFiles = ['**/tests/**', ...jestFiles];
const appFiles = ['app/**', 'components/**', 'utils/**'];

/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
	parserOptions: {
		tsconfigRootDir: __dirname,
	},
	extends: ['next', 'react-app', 'react-app/jest', 'prettier'],
	rules: {
		'react-hooks/exhaustive-deps': 'off',
		'react/no-unescaped-entities': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'none',
			},
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				disallowTypeAnnotations: true,
				fixStyle: 'inline-type-imports',
			},
		],
		'prefer-const': [
			'error',
			{
				ignoreReadBeforeAssign: false,
			},
		],
		'import/no-duplicates': ['warn', { 'prefer-inline': true }],
		'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
	},
	env: {
		'cypress/globals': true,
	},
	overrides: [
		{
			files: appFiles,
			excludedFiles: testFiles,
			rules: {
				'no-restricted-imports': [
					'error',
					{
						patterns: [
							{
								group: testFiles,
								message: 'Do not import test files in app files',
							},
						],
					},
				],
			},
		},
		{
			files: jestFiles,
			rules: {
				'testing-library/no-await-sync-events': 'off',
				'jest-dom/prefer-in-document': 'off',
			},
			settings: {
				jest: {
					version: 29,
				},
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
		},
	],
	plugins: ['cypress'],
	settings: {
		jest: {
			version: 29,
		},
	},
};
