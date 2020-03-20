'use strict';

// Local dependencies.
const utils = require('./tasks/utils');

const prefix = utils.getPrefix().toLowerCase();
const textdomain = prefix + '-gutenberg-blocks';

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['module-resolver', { 'root': ['./src/'] }],
    [
      'inline-replace-variables', {
        __TEXTDOMAIN__: textdomain,
        __PREFIX__: prefix
      }
    ],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      '@babel/transform-react-jsx', {
        pragma: 'wp.element.createElement',
        pragmaFrag: 'wp.element.Fragment'
      }
    ],
    ['@wordpress/babel-plugin-makepot', { output: `lang/${textdomain}.pot` }]
  ]
};