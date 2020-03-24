// WordPress dependencies.
const { serverSideRender: ServerSideRender } = wp;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

// Local dependencies.
import { importAll } from 'utils';
import { EditContext } from 'components';
import './editor.scss';

importAll(require.context('./hooks', true, /\.js$/));

const requireContext = require.context('./blocks', true, /block\.js$/);
const defaultSettings = {
  category: __PREFIX__,
  save() {
    if (<InnerBlocks.Content />) {
      return <InnerBlocks.Content />;
    }

    return null;
  }
};

/**
 * Workaround until https://github.com/WordPress/gutenberg/issues/11763 is fixed.
 */
const convertToBem = (className) => {
  let classNames = className.split(' ');
  classNames = classNames.map((className) => {
    if (className.indexOf('is-style-') !== -1) {
      return className.replace('is-style-', classNames[0] + '--');
    }

    if (className.indexOf('has-background-color-') !== -1) {
      return className.replace('has-background-color-', 'background-');
    }

    if (className.indexOf('has-text-color-') !== -1) {
      return className.replace('has-text-color-', 'color-');
    }

    return className;
  });

  return classNames.join(' ');
};

requireContext.keys().forEach((key) => {
  let blockName = key.split('/')[1];
  let blockNamespace = __PREFIX__ + '/' + blockName;
  let { default: blockSettings } = requireContext(key);
  let attributes = blockSettings.attributes || {};
  let exampleAttributes = Object.keys(attributes).map((key) => {
    let attribute = attributes[key];

    if (attribute.hasOwnProperty('default')) {
      return { [key]: attribute.default };
    }

    switch (attribute.type) {
    case 'number':
      return { [key]: 1 };
    case 'string':
    default:
      return { [key]: 'Lorem ipsum dolor' };
    }
  });
  let editFunction = blockSettings.edit;
  delete blockSettings.edit;
  let settings = {
    ...defaultSettings,
    ...{ example: { attributes: exampleAttributes } },
    ...{
      edit(props) {
        const className = convertToBem(props.className);

        if (editFunction) {
          return (
            <EditContext.Provider value={ props }>
              <div className={ className }>
                { editFunction(props) }
              </div>
            </EditContext.Provider>
          );
        }

        return (
          <ServerSideRender
            block={ blockNamespace }
            attributes={ props.attributes }
            className={ className }
          />
        );
      }
    },
    ...blockSettings
  };

  registerBlockType(blockNamespace, settings);
});