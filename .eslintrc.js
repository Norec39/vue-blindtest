module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:nuxt/recommended'
	],
	rules: {
		indent: [
			'error',
			'tab'
		],
		'no-tabs': 'off',
		'no-console': 'off',
		'no-mixed-spaces-and-tabs': 'off'
	}
}
