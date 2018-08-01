import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#29ABE2',
  },
};

export default class VehicleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: {},
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
  }
  onChange = (object, index, value) => {
    let labelStyle,
      error;
    this.props.setValue(this.props.id, value);
    if (_.isEmpty(value.toString())) {
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
      labelStyle,
      errorText: error,
    });
  };
  onBlur = () => {
    let labelStyle,
      error;
    if (_.isEmpty(this.state.value.toString())) {
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
        <SelectField
          htmlFor={this.props.id}
          errorText={this.state.errorText}
          floatingLabelText={this.props.label}
          floatingLabelStyle={this.state.labelStyle}
          floatingLabelFocusStyle={this.state.labelStyleFocus}
          value={this.state.value}
          onBlur={this.onBlur}
          onChange={this.onChange}
        >
          {this.props.values.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
        </SelectField>
      </div>
    );
  }
}

