#!/usr/bin/env node
/* eslint no-console: 0 */

'use strict';

// External dependencies.
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Local dependencies.
const pkg = require('../package.json');

module.exports = {

  /**
   * Template path of the WordPress installation this plugin is part of.
   */
  getTemplatePath: function () {
    const contentDirPath = path.dirname(path.dirname(this.getPluginPath()));

    return contentDirPath + '/themes/' + this.getThemeName();
  },

  /**
   * Either use option stored in package.json
   * or guess WordPress theme name by this plugins PHP namespace.
   */
  getThemeName: function () {
    if (pkg.config.themeDirName) {
      return pkg.config.themeDirName;
    }

    return this.getPrefix().toLowerCase() + '-theme';
  },

  /**
   * Get first part of this plugins PHP namespace.
   */
  getPrefix: function () {
    const namespace = this.getNamespace();
    const prefix = namespace.split('\\');

    if (prefix[0]) {
      return prefix[0];
    }
  },

  getPluginPath: function () {
    return path.dirname(__dirname);
  },

  getNamespace: function () {
    const bootstrapPhpLines = fs
      .readFileSync(this.getPluginPath() + '/bootstrap.php')
      .toString()
      .split('\n');
    let namespace;

    bootstrapPhpLines.forEach((line) => {
      if (line.indexOf('namespace') >= 0) {
        namespace = line.replace('namespace ', '');
      }
    });

    return namespace;
  },

  /**
   * Convert kebab case name to capitalized words separated by underscores.
   */
  formClassName: function (name, sep = '') {
    let className = name.replace('-', ' ');
    className = this.ucWords(className);

    return className.replace(' ', sep);
  },

  ucWords: function(string) {
    return string.replace(/^(.)|\s+(.)/g, ($1) => $1.toUpperCase());
  },

  copyAndReplace: function (srcFile, destFolder, replaces) {
    const destFile = destFolder + '/' + srcFile;

    fs.copyFile(this.getPluginPath() + `/templates/${srcFile}.template`, destFile, (error) => {
      if (error) {
        throw error;
      }

      this.replaceInFile(destFile, replaces);
    });
  },

  replaceInFile: function (file, replaces) {
    const fileBuffer = fs.readFileSync(this.getPluginPath() + '/' + file);
    let fileData = fileBuffer.toString();

    Object.entries(replaces).forEach(([origVal, newVal]) => {
      fileData = fileData.replace(new RegExp(origVal, 'g'), newVal);
    });

    fs.writeFileSync(this.getPluginPath() + '/' + file, fileData);
  },

  errorMessage: function (message) {
    return `${chalk.red.inverse(' Error ')} ${chalk.red(message)}`;
  },

  successMessage: function (message) {
    return `${chalk.green.inverse(' Success ')} ${chalk.green(message)}`;
  },

  infoMessage: function (message, variable) {
    return chalk.white(`${message}: `) + chalk.grey(variable);
  }
};