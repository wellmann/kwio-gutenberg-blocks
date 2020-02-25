//
// Block.js loader.
//

'use strict';

// External dependencies.
const bulk = require('bulk-require');
const slugify = require('slugify');

// Local dependencies.
require('./hooks');

// WordPress dependencies.
const { registerBlockType } = wp.blocks;

const { blocks } = bulk(__dirname, ['blocks/*/block.js']);
const defaultSettings = {
  category: __PREFIX__,
  save({ attributes }) {
    if (attributes.content) {
      return attributes.content;
    }

    return null;
  }
};

Object.entries(blocks).forEach(([blockName, block]) => {
  let blockNamespace = __PREFIX__ + '/' + slugify(blockName);
  let { block: blockModule } = block;
  let blockSettings = blockModule.default;
  let settings = {
    ...defaultSettings,
    ...blockSettings
  };

  registerBlockType(blockNamespace, settings);
});