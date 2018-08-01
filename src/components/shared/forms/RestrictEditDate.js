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
export default class RestrictEditDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: {},
      labelStyle: styles.labelStyleFilled,
      errorText: '',
    };
  }
  onChange = (object, value) => {
    const { id } = this.props;
    this.props.setValue(this.props.id, value);
    const validInput = onInputChange(id, value);
    this.setState({
      value,
      errorText: validInput.error,
      labelStyle: validInput.color,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.prefilled) {
      this.setState({ value: nextProps.prefilled });
    }
  }

  keyPressed(e) {
    e.preventDefault();
  }

  render() {
    return (
      // <div className="form-field">
      <TextField
        style={{ width: '90%', paddingLeft: this.props.extraPadding }}
        value={this.state.value}
        hintText={this.props.hintText}
        type={this.props.type}
        onChange={this.onChange}
        onBlur={this.onBlur}
        errorText={this.state.errorText}
        htmlFor={this.props.id}
        floatingLabelText={this.props.label}
        floatingLabelStyle={this.state.labelStyle}
        floatingLabelFocusStyle={{ color: '#29abe2' }}
        floatingLabelFixed={this.props.fixedFloat}
        underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}
        inputStyle={this.props.disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
        disabled={this.props.disabled}
        max="2100-12-31"
        min={Converters.dateConverter(new Date().getTime() + (24 * 60 * 60 * 1000))}
        onKeyPress={this.keyPressed}
        onKeyDown={this.keyPressed}
        onKeyUp={this.keyPressed}
      />
      // </div>
    );
  }
}
