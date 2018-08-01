import React from 'react';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import isStringContainSpaces from '../../utils/utils';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#29ABE2',
  },
};
export default class VehicleField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: {},
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
  }
  onChange = (object, value) => {
    let labelStyle,
      error;
    this.props.setValue(this.props.id, value);

    if (isStringContainSpaces(value) || _.isEmpty(value)) {
      error = 'This field is required.';
      labelStyle = {
        color: '#f44336',
      };
    } else {
      error = '';
      labelStyle = {
        color: '#29ABE2',
      };
    }
    this.setState({
      value,
      labelStyleFocus: labelStyle,
      errorText: error,
      labelStyle,
    });
  };
  onBlur = () => {
    let labelStyle,
      error;
    if (isStringContainSpaces(this.state.value) || _.isEmpty(this.state.value)) {
      error = 'This field is required.';
      labelStyle = {
        color: '#f44336',
      };
    } else {
      error = '';
      labelStyle = {
        color: '#29ABE2',
      };
    }
    this.setState({
      labelStyleFocus: labelStyle,
      errorText: error,
      labelStyle,
    });
  };
  render() {
    return (
      <div className="form-field">
        <TextField
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          errorText={this.state.errorText}
          htmlFor={this.props.id}
          floatingLabelText={this.props.label}
          floatingLabelStyle={this.state.labelStyle}
          floatingLabelFocusStyle={this.state.labelStyleFocus}
        />
      </div>
    );
  }
}
