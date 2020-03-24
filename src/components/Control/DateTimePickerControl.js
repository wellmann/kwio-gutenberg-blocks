// WordPress dependencies.
const { __ } = wp.i18n;
const { useState } = wp.element;
const { BaseControl, Button, DateTimePicker, DatePicker, TimePicker } = wp.components;

const DateTimePickerControl = ({ label, time = true, date = true, ...props }) => {
  const [isVisible, toggle] = useState(false);
  let Picker = DateTimePicker;

  if (date && !time) {
    Picker = DatePicker;
  }

  if (time && !date) {
    Picker = TimePicker;
  }

  return (
    <>
      <BaseControl label={ label + ':' }>
        { ' ' }<Button
          onClick={ () => toggle((isVisible) => !isVisible) }
          isSecondary
          isSmall
          isPressed={ isVisible }
          focus={ isVisible }
        >
          { __('Display date') }
        </Button>
      </BaseControl>
      { isVisible && <Picker
        currentDate={ new Date() }
        { ...props }
      /> }
    </>
  );
};

export default DateTimePickerControl;