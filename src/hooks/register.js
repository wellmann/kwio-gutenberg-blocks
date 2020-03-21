// WordPress dependencies.
const { addFilter } = wp.hooks;
const { hasBlockSupport } = wp.blocks;

const { blockOptions } = window;

/**
 * Groups selected default blocks in custom category.
 */
addFilter('blocks.registerBlockType', __PREFIX__ + '/block/category', (settings, name) => {
  if (blockOptions.defaultBlocks.includes(name)) {
    settings.category = 'wordpress-default';
  }

  return settings;
});

/**
 * Changes anchor options so that it is accesable via PHP.
 */
addFilter('blocks.registerBlockType', __PREFIX__ + '/anchor/attribute', (settings) => {
  if (hasBlockSupport(settings, 'anchor')) {
    settings.attributes.anchor = { type: 'string' };
  }

  return settings;
});