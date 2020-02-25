'use strict';

// Local dependencies.
const helper = require('./tasks/helper');

const prefix = helper.getPrefix().toLowerCase();
const textdomain = prefix + '-gutenberg-blocks';

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'inline-replace-variables', {
        __TEXTDOMAIN__: textdomain,
        __PREFIX__: prefix
      }
    ],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/transform-react-jsx', { pragma: 'wp.element.createElement' }],
    ['@wordpress/babel-plugin-makepot', { output: `lang/${textdomain}.pot` }]
  ]
};