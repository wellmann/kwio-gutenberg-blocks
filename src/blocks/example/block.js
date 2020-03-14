// External dependencies.
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

// WordPress dependencies.
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const { TextControl } = wp.components;

// Local dependencies.
import withWordLimit from '../../components/withWordLimit';
import './style.scss';

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
    align: ['full'],
    anchor: true
  },

  edit({ attributes, setAttributes, className, isSelected }) {
    const { headline, text, author } = attributes;
    const Headline = withWordLimit({ limit: 1 })(RichText);
    const bem = new BEMHelper(className.split(' ')[0]);

    return (
      <div className={ className }>
        <Headline
          tagName="h2"
          className={ bem('content') }
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
      </div>
    );
  }
};