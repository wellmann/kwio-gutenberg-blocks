// Local dependencies.
import DeviceVisibility from './DeviceVisibility';

// WordPress dependencies.
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

const InspectorControlsWrapper = ({ children }) => {
  return (
    <InspectorControls>
      <PanelBody>
        <DeviceVisibility />
      </PanelBody>
      { children }
    </InspectorControls>
  );
};

export default InspectorControlsWrapper;