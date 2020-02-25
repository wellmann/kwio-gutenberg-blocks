#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Compile SCSS with dynamic variables and paths.
//

'use strict';

// External dependencies.
const scss = require('node-sass');

// Local dependencies.
const pkg = require('../package.json');
const helper = require('./helper');

const { themeAssets, themeScssIncludes } = pkg.config;
const withDynamicVars = function (chunk, varObject) {
  return objectToVariableString(varObject) + chunk;
};
const objectToVariableString = function (object) {
  return Object.keys(object).map(function (name) {
    return `$${name}:'${object[name]}';`;
  });
};

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  if (!chunk) {
    return null;
  }

  let compiledData = scss.renderSync({
    data: withDynamicVars(chunk, { 'assets-path': '../../../../themes/' + helper.getThemeName() + themeAssets }),
    includePaths: [
      helper.getPluginPath() + '/src',
      helper.getTemplatePath() + themeScssIncludes
    ],
    outputStyle: 'compressed'
  });

  if (!compiledData.css) {
    return null;
  }

  process.stdout.write(compiledData.css);
});