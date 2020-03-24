// WordPress dependencies.
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

// Local dependencies.
import { importAll, buildExamplePreview } from 'utils';
import { getEdit } from 'components';
import './editor.scss';

importAll(require.context('./hooks', true, /\.js$/));

const requireContext = require.context('./blocks', true, /block\.js$/);
requireContext.keys().forEach((key) => {
  let blockName = key.split('/')[1];
  let blockNamespace = __PREFIX__ + '/' + blockName;
  let { default: blockSettings } = requireContext(key);
  let additionalClassNames = blockSettings.additionalClassNames || [];
  let editFunction = blockSettings.edit;

  delete blockSettings.additionalClassNames;
  delete blockSettings.edit;

  let settings = {
    ...{
      category: __PREFIX__,
      example: { attributes: buildExamplePreview(blockSettings.attributes) },
      edit: getEdit({ blockNamespace, additionalClassNames, editFunction }),
      save() {
        if (<InnerBlocks.Content />) {
          return <InnerBlocks.Content />;
        }

        return null;
      }
    },
    ...blockSettings
  };

  registerBlockType(blockNamespace, settings);
});