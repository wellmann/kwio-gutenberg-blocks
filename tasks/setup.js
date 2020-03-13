#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Replace KWIO namespace prefix project-wide.
//

'use strict';

// External dependencies.
const fs = require('fs');

// Local dependencies.
const utils = require('./utils');

if ((process.argv[2] !== '-p' || process.argv[2] !== '--prefix' ) && !process.argv[3]) {
  console.log(utils.errorMessage('Please specify the new prefix.'));
  process.exit(1);
}

const files = [
  'bootstrap.php',
  'src/Assets.php',
  'src/Base_Block.php',
  'src/Setup.php',
  'composer.json'
];
const prefix = process.argv[3];
const pluginPath = utils.getPluginPath();
const newPluginPath = pluginPath.replace('kwio-gutenberg-blocks', prefix + '-gutenberg-blocks');
const name = utils.formClassName(prefix, ' ');
const namespace = utils.formClassName(prefix, '_');

// Replace prefix in namespace and plugin header.
files.forEach((file) => {
  utils.replaceInFile(file, {
    'Plugin Name: KWIO': 'Plugin Name: ' + name,
    'namespace KWIO': 'namespace ' + namespace,
    'KWIO\\\\Gutenberg_Blocks': namespace + '\\\\Gutenberg_Blocks'
  });
});

// Rename plugin folder.
fs.renameSync(pluginPath, newPluginPath);

console.log(utils.successMessage('The new prefix has been applied successfully.'));
console.log(utils.infoMessage('The new plugin name is', name + ' Gutenberg Block'));
console.log(utils.infoMessage('The new namespace is', namespace + '/Gutenberg_Blocks'));
console.log(utils.infoMessage('The new path is', newPluginPath));
console.log(utils.infoMessage('To use autoloading with the updated namespace you probably need to run', 'composer dump-autoload'));