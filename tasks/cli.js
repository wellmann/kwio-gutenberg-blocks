#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Create new block with predefned structure.
//

'use strict';

// External dependencies.
const fs = require('fs');

// Local dependencies.
const helper = require('./helper');

if (!process.argv[2]) {
  console.log(helper.errorMessage('Please specify the blocks name.'));
  process.exit(1);
}

const blocksDir = '/src/blocks';
const blockName = process.argv[2];
const blockDir = helper.getPluginPath() + blocksDir + '/' + blockName;
const files = ['block.js', 'editor.scss', 'script.js', 'style.scss'];

// Create block folder.
if (fs.existsSync(blockDir)) {
  console.log(helper.errorMessage('This block already exists.'));
  process.exit(1);
}
fs.mkdirSync(blockDir);

// Create dummy files.
files.forEach((file) => {
  helper.copyAndReplace(file, blockDir, {
    '<% TITLE_JS %>': helper.formClassName(blockName, ' '),
    '<% NAMESPACE_PHP %>;': helper.getNamespace(),
    '<% CLASS_NAME_PHP %>': helper.formClassName(blockName, '_'),
    '<% CLASS_NAME_CSS %>': 'block-' + blockName
  });
});

// Add imports for current block to main SCSS loaders.
fs.appendFileSync(helper.getPluginPath() + '/src/editor.styles.scss', `@import "blocks/${blockName}/editor.scss";`);
fs.appendFileSync(helper.getPluginPath() + '/src/styles.scss', `@import "blocks/${blockName}/style.scss";`);

console.log(helper.successMessage('Block has been successfully created.'));
console.log(helper.infoMessage('Block has been created at', blockDir));