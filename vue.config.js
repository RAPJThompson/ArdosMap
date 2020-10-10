// vue.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = {
    css: {
        extract: false,
    },
    configureWebpack: {
      optimization: {
        splitChunks: false // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'output.html',
          template: 'public/index.html', 
          inlineSource: '.(js|css|jpg)$'
        }),
        new HtmlWebpackInlineSourcePlugin()
      ]
    }
  }