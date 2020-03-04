// WordPress dependencies.
const { addFilter } = wp.hooks;

/**
 * Change class name for custom blocks in editor to match front end.
 *
 * @param {Object} className Original block class.
 * @param {String} blockName Blocks name.
 *
 * @return {Object} Filtered block settings.
 */
function setDefaultClassName(className, blockName) {
  const blockNameParts = blockName.split('/');
  const blockNamespace = blockNameParts[0];
  const blockSlug = blockNameParts[1];

  return blockNamespace === __PREFIX__ ? 'block-' + blockSlug : className;
}

addFilter('blocks.getBlockDefaultClassName', __PREFIX__ + '/block/className', setDefaultClassName);