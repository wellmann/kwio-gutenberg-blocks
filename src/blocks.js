// WordPress dependencies.
const { serverSideRender: ServerSideRender } = wp;
const { registerBlockType } = wp.blocks;

// Local dependencies.
import './hooks';
import './editor.scss';

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
    ...{
      edit({ attributes, className }) {
        return (
          <ServerSideRender
            block={ blockNamespace }
            attributes={ attributes }
            className={ className }
          />
        );
      }
    },
    ...blockSettings
  };

  registerBlockType(blockNamespace, settings);
});