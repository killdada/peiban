const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// 使 chainableConfig.toString() 能使用
LodashModuleReplacementPlugin.__expression = `require('lodash-webpack-plugin')`

const alias = {
    src: path.resolve(__dirname, 'src'),
    assets: path.resolve(__dirname, 'src/assets'),
    components: path.resolve(__dirname, 'src/components')
}

module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    publicPath: '/public',
    devServer: {
        port: 8888,
        open: true,
        proxy: {
            '/api': {
                target: 'https://b2c-test.mypaas.com.cn',
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': '/api/v1/admin'
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        Object.entries(alias).forEach(([key, value]) => {
            config.resolve.alias.set(key, value)
        })
        config.plugin('lodash-module').use(require('lodash-webpack-plugin'), [
            {
                caching: true, // Caches for methods like _.cloneDeep, _.isEqual, & _.uniq
                flattening: true, // Support “flatten” methods & flattening rest arguments
                paths: true, // Deep property path support for methods like _.get, _.has, & _.set
                shorthands: true
            }
        ])
    }
}
