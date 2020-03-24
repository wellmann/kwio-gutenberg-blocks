// WordPress dependencies.
const { isValidElement, cloneElement, useContext, Children } = wp.element;
const { InspectorControls } = wp.blockEditor;

// Local dependencies.
import { EditContext } from 'components';

// https://stackoverflow.com/questions/32916786/react-children-map-recursively/42498730#42498730
const recursiveMap = (children, fn) => Children.map(children, (child) => {
  if (!isValidElement(child)) {
    return child;
  }

  if (child.props.children) {
    child = cloneElement(child, { children: recursiveMap(child.props.children, fn) });
  }

  return fn(child);
});

const InspectorControlsWrapper = ({ children }) => {
  const { isSelected, attributes, setAttributes } = useContext(EditContext);

  return isSelected ? (
    <InspectorControls>
      { recursiveMap(children, (child) => {
        if (child.props.hasOwnProperty('name')) {
          let name = child.props.name;
          let value = attributes[name];

          return cloneElement(child, {
            value,
            checked: value,
            onChange: (value) => setAttributes({ [name]: value })
          });
        }

        return cloneElement(child);
      }) }
    </InspectorControls>
  ) : null;
};

export default InspectorControlsWrapper;