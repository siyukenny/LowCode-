const path = require('path')
    // const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    publicPath: '/cms-manage/',
    outputDir: 'cms-manage',
    assetsDir: 'assets',
    devServer: {
        host: '8.142.119.255',
        // port: 3001,
        port: 3011,
        open: true,
        // openPage: 'cms-manage/',
        proxy: {
            // '/api/atlas-cms': {
            //     target: 'http://8.142.119.255:3300',
            //     pathRewrite: {
            //         '^/api/atlas-cms': '/atlas-cms'
            //     }
            // }
            '/api': {
                target: 'http://8.142.119.255:3300',
                headers: {
                    host: '8.142.119.255'
                }
            }
        }
    },
    chainWebpack: (config) => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach((type) =>
                addStyleResource(config.module.rule('less').oneOf(type))
            )
            // 设置别名
        config.resolve.alias.set('@', path.resolve(__dirname, './src'))
    }
}

function addStyleResource(rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, './src/styles/mixin.less')]
        })
}