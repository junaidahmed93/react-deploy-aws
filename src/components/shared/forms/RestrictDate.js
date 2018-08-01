import React from 'react';
import TextField from 'material-ui/TextField';
import { onInputBlur, onInputChange } from '../../../utils/Helpers';
import Converters from '../../../utils/Converters';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#29ABE2',
  },
};

export default class InputDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.prefilled) {
      this.setState({ value: nextProps.prefilled });
    }
  }

    onChange = (object, value) => {
      const { id } = this.props;
      this.props.setValue(id, value);
      const validInput = onInputChange(id, value);

      this.setState({
        value,
        errorText: validInput.error,
        labelStyle: { color: validInput.color },
      });
    };

    onBlur = () => {
      const { id } = this.props;
      const { value } = this.state;
      const validInput = onInputBlur(id, value);
      this.setState({
        errorText: validInput.error,
        labelStyle: { color: validInput.color },
      });
    };

    keyPressed(e) {
      e.preventDefault();
    }

    render() {
      return (
        <TextField
          style={{ width: '90%', paddingLeft: this.props.extraPadding }}
          value={this.state.value}
          type={this.props.type}
          onChange={this.onChange}
          onBlur={this.onBlur}
          errorText={this.state.errorText}
          htmlFor={this.props.id}
          floatingLabelText={this.props.label}
          floatingLabelStyle={this.state.labelStyle}
          floatingLabelFocusStyle={{ color: '#29abe2' }}
          floatingLabelFixed={this.props.fixedFloat || true}
          underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid gray' }}
          inputStyle={this.props.disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
          disabled={this.props.disabled}
          max="2100-12-31"
          min={this.props.id === 'endingDate' ? Converters.dateConverter(new Date().getTime() + (24 * 60 * 60 * 1000)) : Converters.dateConverter(new Date().getTime())}
          onKeyPress={this.keyPressed}
          onKeyDown={this.keyPressed}
          onKeyUp={this.keyPressed}
        />

      );
    }
}
