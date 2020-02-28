#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Replace KWIO namespace prefix project-wide.
//

'use strict';

// External dependencies.
const fs = require('fs');

// Local dependencies.
const helper = require('./helper');

if ((process.argv[2] !== '-p' || process.argv[2] !== '--prefix' ) && !process.argv[3]) {
  console.log(helper.errorMessage('Please specify the new prefix.'));
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
const pluginPath = helper.getPluginPath();
const newPluginPath = pluginPath.replace('kwio-gutenberg-blocks', prefix + '-gutenberg-blocks');
const name = helper.formClassName(prefix, ' ');
const namespace = helper.formClassName(prefix, '_');

// Replace prefix in namespace and plugin header.
files.forEach((file) => {
  helper.replaceInFile(file, {
    'Plugin Name: KWIO': 'Plugin Name: ' + name,
    'namespace KWIO': 'namespace ' + namespace,
    'KWIO\\\\Gutenberg_Blocks': namespace + '\\\\Gutenberg_Blocks'
  });
});

// Rename plugin folder.
fs.renameSync(pluginPath, newPluginPath);

console.log(helper.successMessage('The new prefix has been applied successfully.'));
console.log(helper.infoMessage('The new plugin name is', name + ' Gutenberg Block'));
console.log(helper.infoMessage('The new namespace is', namespace + '/Gutenberg_Blocks'));
console.log(helper.infoMessage('The new path is', newPluginPath));
console.log(helper.infoMessage('To use autoloading with the updated namespace you probably need to run', 'composer dump-autoload'));