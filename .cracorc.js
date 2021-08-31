const {ESLINT_MODES} = require("@craco/craco");

module.exports = {
  eslint: ESLINT_MODES.file,
  devServer: (config) => {
    config.proxy = [
      {
        context: '/api/mcc-list',
        target: 'https://raw.githubusercontent.com/Oleksios/Merchant-Category-Codes/main/With%20groups/mcc.json',
        ignorePath: true,
        secure: false,
        changeOrigin: true,
      },
      {
        context: '/api',
        target: 'https://api.monobank.ua/',
        pathRewrite: {'^/api': ''},
        secure: false,
        changeOrigin: true,
      }
    ];

    return config;
  }
};
