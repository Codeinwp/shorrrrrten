// eslint-disable-next-line no-undef
module.exports = {
	env: { browser: true, es2021: true },
	extends: [
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		'plugin:tailwindcss/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2021,
		sourceType: 'module'
	},
	ignorePatterns: [ 'dist' ],
	plugins: [ 'react-refresh', ],
	settings: {
		tailwindcss: {
			callees: [ 'twMerge', 'createTheme' ],
			classRegex: '^(class(Name)|theme)?$',
		},
	},
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'prefer-destructuring': [
			'warn',
			{
				'array': false,
				'object': true
			},
			{
				'enforceForRenamedProperties': false
			}
		],
		'array-bracket-spacing': [
			'warn',
			'always',
			{
				'arraysInArrays': false,
				'objectsInArrays': false
			}
		],
		'key-spacing': [
			'warn',
			{
				'beforeColon': false,
				'afterColon': true
			}
		],
		'object-curly-spacing': [
			'warn',
			'always',
			{
				'arraysInObjects': true,
				'objectsInObjects': false
			}
		],
		'no-unused-vars': [
			'off',
			{
				'vars': 'all',
				'args': 'after-used',
				'ignoreRestSiblings': false
			}
		]
	},
};
