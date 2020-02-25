// WordPress dependencies.
const { hasBlockSupport } = wp.blocks;
const { addFilter } = wp.hooks;

/**
 * Changes anchor options so that it is accesable via PHP.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttribute(settings) {
  if (hasBlockSupport(settings, 'anchor')) {
    settings.attributes.anchor = { type: 'string' };
  }

  return settings;
}

addFilter('blocks.registerBlockType', __PREFIX__ + '/anchor/attribute', addAttribute);