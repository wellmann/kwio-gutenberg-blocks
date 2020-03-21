// WordPress dependencies.
const { addFilter } = wp.hooks;

/**
 * Change class name for custom blocks in editor to match front end.
 */
addFilter('blocks.getBlockDefaultClassName', __PREFIX__ + '/block/className', (className, blockName) => {
  const blockNameParts = blockName.split('/');
  const blockNamespace = blockNameParts[0];
  const blockSlug = blockNameParts[1];

  return blockNamespace === __PREFIX__ ? 'block-' + blockSlug : className;
});