// External dependencies.
const webpack = require('webpack');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Local dependencies.
const pkg = require('./package.json');
const helper = require('./tasks/helper');

let entries = { 'editor': './src/blocks.js' };
const { themeAssets, themeScssIncludes } = pkg.config;
const EditorCssPlugin = new ExtractTextPlugin({ filename: 'editor.[hash:8].css' });
const BlockCssPlugin = new ExtractTextPlugin({ filename: 'blocks.[hash:8].css' });
const BlockCriticalCssPlugin = new ExtractTextPlugin({ filename: 'critical.css' });
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

// Check if there are any front end scripts.
const scriptFiles = glob.sync('./src/blocks/**/script.js');
if (scriptFiles.length > 0) {
  entries = { ...entries, ...{ 'blocks': './src/scripts.js' } };
}

module.exports = {
  mode: 'production',
  entry: entries,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({
      include: ['editor', 'blocks'],
      filename: '[file].map'
    }),
    EditorCssPlugin,
    BlockCssPlugin,
    BlockCriticalCssPlugin
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
      },
      {
        test: /style\.critical\.s?css$/,
        exclude: /node_modules/,
        use: BlockCriticalCssPlugin.extract(cssLoaderOptions)
      }
    ]
  }
};