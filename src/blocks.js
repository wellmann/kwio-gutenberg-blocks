// WordPress dependencies.
const { registerBlockType } = wp.blocks;

// Local dependencies.
import './hooks';

const requireContext = require.context('./blocks', true, /block\.js$/);
const defaultSettings = {
  category: __PREFIX__,
  save({ attributes }) {
    if (attributes.content) {
      return attributes.content;
    }

    return null;
  }
};

requireContext.keys().forEach((key) => {
  let blockName = key.split('/')[1];
  let blockNamespace = __PREFIX__ + '/' + blockName;
  let { default: blockSettings } = requireContext(key);
  let settings = {
    ...defaultSettings,
    ...blockSettings
  };

  registerBlockType(blockNamespace, settings);
});