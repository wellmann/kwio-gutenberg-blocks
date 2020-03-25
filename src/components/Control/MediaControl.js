// WordPress dependencies.
const { useContext } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { BaseControl, PanelRow, Button } = wp.components;
const { __ } = wp.i18n;

// Local dependencies.
import { EditContext } from 'components';

const MediaControl = ({ label, name, ...props }) => {
  const { attributes, setAttributes } = useContext(EditContext);
  const value = attributes[name];
  const buttonStyle = {
    display: 'block',
    width: 200,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  };

  return (
    <BaseControl>
      <PanelRow className="edit-post-post-schedule">
        <span>{ label }</span>
        <MediaUpload
          onSelect={ ({ id, url }) => setAttributes({ [name]: { id, url } }) }
          value={ value ? value.id : undefined }
          render={ ({ open }) => (
            <Button
              className="edit-post-post-schedule__toggle"
              style={ buttonStyle }
              onClick={ open }
              isLink>{ value ? value.url.split(/[\\/]/).pop() : __('Media Library') }</Button>
          ) }
          { ...props }
        />
      </PanelRow>
    </BaseControl>
  );
};

export default MediaControl;