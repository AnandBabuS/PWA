
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack")

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'workon.js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                  }
              }
            ]
          },{
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({title: 'My App',
        template: 'index.html'})
    ]
};