#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Create new block with predefned structure.
//

'use strict';

// External dependencies.
const fs = require('fs');

// Local dependencies.
const utils = require('./utils');

if (!process.argv[2]) {
  console.log(utils.errorMessage('Please specify the blocks name.'));
  process.exit(1);
}

const blocksDir = '/src/blocks';
const blockName = process.argv[2];
const blockDir = utils.getPluginPath() + blocksDir + '/' + blockName;
const files = [
  'block.js',
  'block.php',
  'editor.scss',
  'script.js',
  'style.scss',
  'view.twig'
];

// Create block folder.
if (fs.existsSync(blockDir)) {
  console.log(utils.errorMessage('This block already exists.'));
  process.exit(1);
}
fs.mkdirSync(blockDir);

// Create dummy files.
files.forEach((file) => {
  utils.copyAndReplace(file, blockDir, {
    '<% TITLE_JS %>': utils.formClassName(blockName, ' '),
    '<% NAMESPACE_PHP %>;': utils.getNamespace(),
    '<% CLASS_NAME_PHP %>': utils.formClassName(blockName, '_'),
    '<% CLASS_NAME_CSS %>': 'block-' + blockName
  });
});

console.log(utils.successMessage('Block has been successfully created.'));
console.log(utils.infoMessage('Block has been created at', blockDir));