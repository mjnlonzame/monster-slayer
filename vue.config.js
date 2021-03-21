module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://vue-monster-slayer-api.herokuapp.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },

      },
    },
  },
};
