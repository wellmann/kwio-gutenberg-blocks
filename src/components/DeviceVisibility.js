// WordPress dependencies.
const { withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { CheckboxControl } = wp.components;

@withState({
  hideMobile: false,
  hideDesktop: false
})
export default class DeviceVisibility extends Component {

  render() {
    const { hideMobile, hideDesktop, setState } = this.props;

    return (
      <Fragment>
        <CheckboxControl
          heading="Hide on..."
          label="Mobile"
          checked={ hideMobile }
          onChange={ (hideMobile) => setState({ hideMobile }) }
        />
        <CheckboxControl
          heading="Hide on..."
          label="Desktop"
          checked={ hideDesktop }
          onChange={ (hideDesktop) => setState({ hideDesktop }) }
        />
      </Fragment>
    );
  }
}