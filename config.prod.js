const path = require('path');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'production';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const cssFilename = NODE_ENV === 'production' ? 'static/css/[name].[hash:8].css' : 'static/css/[name].[hash:8].min.css'

module.exports = {
  devtool: "hidden-source-map",
  mode: 'production',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
    // Set up an ES6-ish environment
    babel_polyfill: '@babel/polyfill'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: NODE_ENV === 'production' ? '[name].min.js' : '[name][hash:6].min.js'
  },
  resolve: {
    extensions: ['*', '.js', '.styl', '.pub']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        },
      }),
    ],
  },
  module: {
    rules: [
      // babel
      {
        test: /\.(js)?$/,
        loaders: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'production',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [
          'file-loader?name=[path][name].html',
          'pug-html-loader?pretty&exports=false'
        ]
      },
      {
        test: /\.zip$/,
        use: 'file-loader&name=/files/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=/img/[hash:6].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=/font/[hash:6].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: path.join(__dirname, 'src'),
        output: {
          path: path.join(__dirname, 'dist')
        },
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'IE > 10'],
            cascade: true,
            remove: true
          }),
          require('css-mqpacker')()
        ]
      }
    }),
    new MiniCssExtractPlugin({
      filename: cssFilename
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/layouts/index.html'),
      filename: 'index.html',
      favicon: path.join(__dirname, '/src/favicon/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
          })
        ]
      }
    }),
    new MinifyPlugin()
  ]
}
