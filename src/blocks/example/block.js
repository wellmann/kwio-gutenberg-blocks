// WordPress dependencies.
const {
  FormTokenField,
  PanelBody,
  SelectControl,
  TextControl,
  TextareaControl,
  ToggleControl
} = wp.components;
const { __ } = wp.i18n;

// Local dependencies.
import {
  DateTimePickerControl,
  MediaControl,
  InspectorControls,
  MediaPlaceholder,
  RichText,
  URLControl,
  withWordLimit
} from 'components';
import attributes from './attributes.json';
import './style.scss';

export default {
  title: 'Example Block',
  description: 'This is the description of the Example Block.',
  icon: 'welcome-learn-more',
  attributes,
  supports: {
    align: ['full'],
    anchor: true
  },
  edit() {
    //const Headline = withWordLimit({ limit: 1 })(RichText);

    return (
      <>
        <MediaPlaceholder
          name="image"
          height={ 250 } />
        <RichText
          name="headline"
          tagName="h2"
          placeholder="Headline"
        />
        <RichText name="text" />
        <RichText
          name="buttonText"
          tagName="button"
          className="button"
        />
        <InspectorControls>
          <PanelBody title={ __('Settings') }>
            {/* <FormTokenField
              value={ '' }
              suggestions={ ['suggestions', 'ghgkg'] }
              onChange={ tokens => setAttributes( { tokens } ) }
              placeholder="Type a continent"
            /> */}
            <TextControl
              label="Text"
              name="text" />
            <URLControl name="url" />
            <TextareaControl
              label="Textarea"
              name="textarea" />
            <ToggleControl
              label="Toggle"
              name="toggle" />
            <MediaControl
              label="File"
              name="file" />
            <SelectControl
              label="Select"
              name="select"
              options={ [
                { value: null, label: 'Select something', disabled: true },
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
                { value: 'c', label: 'C' }
              ] } />
            <DateTimePickerControl
              label="Date"
              name="date"
              time={ false } />
          </PanelBody>
        </InspectorControls>
      </>
    );
  }
};