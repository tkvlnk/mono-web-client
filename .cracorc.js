const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
    eslint: ESLINT_MODES.file,
    devServer: config => {
        config.proxy = {
            '/api': {
                target: 'https://api.monobank.ua/',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true,
            }
        }

        return config;
    }
};
