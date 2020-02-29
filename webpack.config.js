// External dependencies.
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Local dependencies.
const pkg = require('./package.json');
const helper = require('./tasks/helper');

const { themeAssets, themeScssIncludes } = pkg.config;
const EditorCssPlugin = new ExtractTextPlugin({ filename: 'editor.[hash:8].css' });
const BlockCssPlugin = new ExtractTextPlugin({ filename: 'blocks.[hash:8].css' });
const cssLoaderOptions = {
  use: [
    {
      loader: 'css-loader',
      options: {
        url: false,
        sourceMap: true
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [
            helper.getPluginPath() + '/src',
            helper.getTemplatePath() + themeScssIncludes
          ]
        },
        prependData: `$assets-path: "../../../../themes/${helper.getThemeName() + themeAssets}";`,
        sourceMap: true
      }
    }
  ]
};

module.exports = {
  mode: 'production',
  entry: {
    'editor': './src/blocks.js',
    'blocks': './src/scripts.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({
      include: ['editor', 'blocks'],
      filename: '[file].map'
    }),
    EditorCssPlugin,
    BlockCssPlugin
  ],
  output: {
    filename: '[name].[contenthash:8].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /editor\.s?css$/,
        exclude: /node_modules/,
        use: EditorCssPlugin.extract(cssLoaderOptions)
      },
      {
        test: /style\.s?css$/,
        exclude: /node_modules/,
        use: BlockCssPlugin.extract(cssLoaderOptions)
      }
    ]
  }
};