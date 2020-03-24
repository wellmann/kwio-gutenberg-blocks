// WordPress dependencies.
const { withDispatch } = wp.data;
const { tokenList: TokenList, serverSideRender: ServerSideRender } = wp;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

// Local dependencies.
import { importAll, convertToBem, buildExamplePreview } from 'utils';
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

requireContext.keys().forEach((key) => {
  let blockName = key.split('/')[1];
  let blockNamespace = __PREFIX__ + '/' + blockName;
  let { default: blockSettings } = requireContext(key);
  let additionalClassNames = blockSettings.additionalClassNames || [];
  delete blockSettings.additionalClassNames;
  let editFunction = blockSettings.edit;
  delete blockSettings.edit;
  let settings = {
    ...defaultSettings,
    ...{ example: { attributes: buildExamplePreview(blockSettings.attributes) } },
    ...{
      edit: withDispatch(( dispatch, { className, clientId } ) => {
        if (additionalClassNames) {
          const list = new TokenList(className);
          list.remove(className.split(' ')[0]); // Remove blocks default class name.
          additionalClassNames.map((className) => list.add(className));

          dispatch('core/block-editor').updateBlockAttributes(clientId, { className: list.value });
        }
      })((props) => {
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

        const { attributes } = props;

        if (attributes.hasOwnProperty('className')) {
          delete attributes.className;
        }

        if (attributes.hasOwnProperty('hideMobile')) {
          delete attributes.hideMobile;
        }

        if (attributes.hasOwnProperty('hideDesktop')) {
          delete attributes.hideDesktop;
        }

        return (
          <ServerSideRender
            block={ blockNamespace }
            attributes={ props.attributes }
            className={ className }
          />
        );
      })
    },
    ...blockSettings
  };

  registerBlockType(blockNamespace, settings);
});