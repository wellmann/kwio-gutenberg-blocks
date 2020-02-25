// Local dependencies.
import withWordLimit from '../../components/with-word-limit';

// WordPress dependencies.
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RichText } = wp.editor;
const { TextControl } = wp.components;

export default {
  title: __('Example Block', __TEXTDOMAIN__),

  description: __('This is the description of the Example Block.', __TEXTDOMAIN__),

  icon: 'welcome-learn-more',

  attributes: {
    headline: { type: 'string' },
    text: {
      type: 'string',
      default: 'default text'
    },
    author: { type: 'string' }
  },

  supports: {
    align: ['wide', 'full'],
    anchor: true
  },

  edit({ attributes, setAttributes }) {
    const { headline, text, author } = attributes;
    //const Headline = withWordLimit({ limit: 1 })(RichText);

    return (
      <Fragment>
        <RichText
          tagName="h2"
          format="string"
          value={ headline }
          placeholder="Headline"
          onChange={ (value) => setAttributes({ headline: value }) }
        />
        <RichText
          format="string"
          value={ text }
          onChange={ (value) => setAttributes({ text: value }) }
        />
        <TextControl
          label={ __('Text', __TEXTDOMAIN__) }
          value={ author }
          onChange={ (event) => setAttributes({ author: event.target.value }) }
        />
      </Fragment>
    );
  }
};