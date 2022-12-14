const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd


const fileName = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`


const jsLOaders = () => {
   const use = [
      {
         loader: 'babel-loader',
         options: {
            presets: ['@babel/preset-env']
         }

      }]
   if (use) {
      use.push('eslint-loader')
   }
}

module.exports = {
   context: path.resolve(__dirname, './src'),
   mode: 'development',
   entry: './index.js',

   output: {
      filename: fileName('js'),
      path: path.resolve(__dirname, './dist')
   },
   resolve: {
      extensions: ['.js'],
      // ../../../src/Component
      // @src/Component
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@core': path.resolve(__dirname, './core')
      }
   },
   devServer: {
      port: 3000,
      hot: isDev
   },
   devtool: isDev ? 'source-map' : false,
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: "index.html",
         minify: {
            removeComments: isProd,
            collapseWhitespace: isProd
         }
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, './src/favicon.png'),
               to: path.resolve(__dirname, './src')
            },
         ],
      }),
      new MiniCssExtractPlugin({
         filename: fileName('css')
      }),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               "sass-loader",
            ],
         },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: jsLOaders(),
            // use: {
            //    loader: 'babel-loader',
            //    options: {
            //       presets: ['@babel/preset-env']
            //    }
            // }
         }
      ],
   },
}