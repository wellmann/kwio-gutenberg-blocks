// WordPress dependencies.
const { useContext } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { BaseControl, Button, IconButton } = wp.components;
const { __ } = wp.i18n;
const { withInstanceId } = wp.compose;

// Local dependencies.
import { EditContext } from 'components';

const MediaControl = ({ label, name, ...props }) => {
  const id = 'inspector-media-control-' + props.instanceId;
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
      <label htmlFor={ id } className="components-base-control__label">{ label }</label>
      <div className="components-panel__row" style={ { marginTop: 0 } }>
        <MediaUpload
          onSelect={ ({ id, url }) => setAttributes({ [name]: { id, url } }) }
          render={ ({ open }) => (
            <>
              <Button
                id={ id }
                onClick={ open }
                style={ buttonStyle }
                isLink>{ value ? value.url.split(/[\\/]/).pop() : __('Media Library') }</Button>
                <IconButton
                  disabled={ !value }
                  icon="no-alt"
                  onClick={ () => setAttributes({ [name]: null }) }
                  label={ __('Remove') }
                />
            </>
          ) }
          { ...props }
          value={ value ? value.id : null }
        />
      </div>
    </BaseControl>
  );
};

export default withInstanceId(MediaControl);