module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'comma-danger': 'off',
        'prettier/prettier': ['error', { singleQuote: true, semi: false }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
