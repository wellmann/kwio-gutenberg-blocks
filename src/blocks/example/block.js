// WordPress dependencies.
const { __ } = wp.i18n;
const { URLInputButton } = wp.blockEditor;
const {
  DatePicker,
  DateTimePicker,
  FormTokenField,
  TimePicker,
  PanelBody,
  SelectControl,
  TextControl,
  TextareaControl,
  ToggleControl
} = wp.components;

// Local dependencies.
import {
  MediaPlaceholder,
  RichText,
  InspectorControls,
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
        <MediaPlaceholder name="image" />
        <RichText
          name="headline"
          tagName="h2"
          placeholder="Headline"
        />
        <RichText name="text" />
        <RichText
          name="buttonText"
          tagName="button"
        />
        <URLInputButton/>
        <InspectorControls>
          <PanelBody title={ __('Settings') }>
            {/* <FormTokenField
              value={ '' }
              suggestions={ ['suggestions', 'ghgkg'] }
              onChange={ tokens => setAttributes( { tokens } ) }
              placeholder="Type a continent"
            /> */}
            <TextControl
              label="Author"
              name="author" />
            { /* <DateTimePicker
              currentDate={ new Date() }
              onChange={ () => setAttributes( { date } ) } /> */}
          </PanelBody>
        </InspectorControls>
      </>
    );
  }
};