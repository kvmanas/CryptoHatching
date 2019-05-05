// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api/': {
                target: 'http://rest-api:8008',
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};