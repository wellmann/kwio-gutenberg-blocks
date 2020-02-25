// WordPress dependencies.
const { addFilter } = wp.hooks;

const { blockOptions } = window;

/**
 * Groups selected default blocks in custom category.
 *
 * @param {Object} settings Original block settings.
 * @param {String} settings Blocks name.
 *
 * @return {Object} Filtered block settings.
 */
function assignCategory(settings, name) {
  if (blockOptions.defaultBlocks.includes(name)) {
    settings.category = 'wordpress-default';
  }

  return settings;
}

addFilter('blocks.registerBlockType', __PREFIX__ + '/block/category', assignCategory);