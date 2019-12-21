const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
    babel_polyfill: '@babel/polyfill'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: NODE_ENV === 'development' ? '[name].js' : '[name][hash:6].js'
  },
  resolve: {
    extensions: ['*', '.js', '.styl', '.pub']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
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
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'file-loader?name=[path][name].html',
          'pug-html-loader?pretty&exports=false'
        ]
      },
      {
        test: /\.php$/,
        use: 'file-loader'
      },
      {
        test: /\.zip$/,
        use: 'file-loader'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|ico)$/,
        exclude: /node_modules/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: 'file-loader'
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
        ]
      }
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/layouts/index.html'),
      filename: 'index.html'
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
    })
  ]
}
