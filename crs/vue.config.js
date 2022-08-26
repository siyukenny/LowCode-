module.exports = {
    publicPath: '/crs/',
    lintOnSave: false,
    devServer: {
        host: '8.142.119.255',
        port: 3010,
        open: false,
        proxy: {
            '^/api': {
                target: 'http://8.142.119.255:3010',
                headers: {
                    host: '8.142.119.255'
                }
            }
        }
    }
}