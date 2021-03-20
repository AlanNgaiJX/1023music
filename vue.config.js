module.exports = {
  publicPath:'./',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [],
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  productionSourceMap: false
}
