#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Replace KWIO namespace and plugin name.
//

'use strict';

// External dependencies.
const arg = require('arg');
const fs = require('fs');
const { execSync } = require('child_process');

// Local dependencies.
const {
  formClassName,
  replaceInFile,
  successMessage,
  infoMessage,
  errorMessage
} = require('./utils');

try {
  const args = arg({
    '--prefix': String,
    '-p': '--prefix'
  });
  const prefix = args['--prefix'];

  if (typeof prefix !== 'string') {
    throw new Error('Please specify the new prefix.');
  }

  const pluginPath = process.cwd();
  const newPluginPath = pluginPath.replace('kwio-gutenberg-blocks', prefix + '-gutenberg-blocks');
  const name = formClassName(prefix, ' ');
  const namespace = formClassName(prefix, '_');
  const phpFiles = [
    'bootstrap.php',
    'lib/hooks/assets.php',
    'lib/hooks/block.php',
    'lib/Base_Block.php',
    'lib/Block_Collector.php',
    'lib/Block_Data.php',
    'lib/Block_Utils.php',
    'lib/utils.php'
  ];

  phpFiles.map((file) => {
    replaceInFile(file, {
      'Plugin Name: KWIO': 'Plugin Name: ' + name,
      'namespace KWIO': 'namespace ' + namespace
    });
  });

  replaceInFile('composer.json', { 'KWIO': namespace });

  // Rename plugin folder.
  fs.renameSync(pluginPath, newPluginPath);

  // Update composer auto-loader.
  console.log(execSync('composer dump-autoload').toString());

  console.log(successMessage('The new prefix has been applied successfully.'));
  console.log(infoMessage('The new plugin name is', name + ' Gutenberg Block'));
  console.log(infoMessage('The new namespace is', namespace + '/Gutenberg_Blocks'));
  console.log(infoMessage('The new path is', newPluginPath));
} catch (err) {
  console.log(errorMessage(err.message));
  process.exit(1);
}