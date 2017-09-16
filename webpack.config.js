const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'main': './main/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|jquery|jstree|multi-select)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|jquery)/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'common': path.resolve(__dirname, 'front/common.js'),
      'two-layout-header': path.resolve(__dirname, 'front/header/two-layout-header.js'),
      'three-layout-header': path.resolve(__dirname, 'front/header/three-layout-header.js'),
      'jquery': 'jquery/src/jquery.js',
      'jquery-ui': path.resolve(__dirname, 'front/lib/jquery/jquery-ui.js'),
      'datetimepicker': path.resolve(__dirname, 'front/lib/datetimepicker/jquery.datetimepicker.full.js'),
      'jstree': path.resolve(__dirname, 'front/lib/jstree/jstree.js'),
      'multi-select': path.resolve(__dirname, 'front/lib/multi-select/multiple-select.js'),
      'polyfill': 'babel-polyfill/dist/polyfill.js',
      'pnp-tab': path.resolve(__dirname, 'front/lib/pnp/pnp-tab.js'),
      'pnp-util': path.resolve(__dirname, 'front/lib/pnp/pnp-util.js'),
      'pnp-grid': path.resolve(__dirname, 'front/lib/pnp/pnp-grid.js'),
      'pnp-validate': path.resolve(__dirname, 'front/lib/pnp/pnp-validate.js'),
      'chartjs-custom-plugin': path.resolve(__dirname, 'front/lib/chartjs/custom-plugin.js')
    }
  },
  // 배포시 필요한 압축 및 난독화
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
  // 개발시 필요한 Source Map
  // devtool: '#inline-source-map'
}
