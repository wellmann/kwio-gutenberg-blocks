// External dependencies.
import BEMHelper from 'react-bem-helper';

// WordPress dependencies.
const { useContext } = wp.element;
const { BlockControls, MediaPlaceholder, MediaUpload } = wp.blockEditor;
const { Toolbar, IconButton, Icon, Path, SVG } = wp.components;
const { __ } = wp.i18n;

// Local dependencies.
import { EditContext } from 'components';

const MediaPlaceholderWrapper = ({ name, ...props }) => {
  const { attributes, setAttributes, className } = useContext(EditContext);
  const value = attributes[name];
  const bem = new BEMHelper(className.split(' ')[0]);
  const onSelect = (media) => setAttributes({ [name]: media.url });
  const allowedTypes = ['image'];
  const icon = <SVG viewBox="0 0 20 20"><rect x="11" y="3" width="7" height="5" rx="1"></rect><rect x="2" y="12" width="7" height="5" rx="1"></rect><Path d="M13,12h1a3,3,0,0,1-3,3v2a5,5,0,0,0,5-5h1L15,9Z"></Path><Path d="M4,8H3l2,3L7,8H6A3,3,0,0,1,9,5V3A5,5,0,0,0,4,8Z"></Path></SVG>;

  return (
    <>
      { value ? <img src={ value } /> : <MediaPlaceholder
        { ...bem(name) }
        icon={ <Icon icon="format-image" /> }
        labels={ {
          title: __('Image'),
          instructions: __('Upload an image file or pick one from your media library.')
        } }
        onSelect={ onSelect }
        accept="image/*"
        allowedTypes={ allowedTypes }
        value={ value }
        { ...props }
      /> }
      <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={ onSelect }
            allowedTypes={ allowedTypes }
            value={ value }
            render={ ({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={ __('Edit image') }
                icon={ icon }
                onClick={ open }
              />
            ) }
          />
        </Toolbar>
      </BlockControls>
    </>
  );
};

export default MediaPlaceholderWrapper;