import React from 'react';
import TextField from 'material-ui/TextField';
import { onInputBlur, onInputChange } from '../../../utils/Helpers';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#29ABE2',
  },
};

export default class PromoPercentage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
    this.changesCount = 0;
  }


    onChange = (object, value) => {
      const { id, type, inPercent } = this.props;
      let updValue = value;
      if (type === 'number' && (value === '' || Number(value) < 0)) {
        updValue = '';
      }

      if (inPercent) {
        if (Number(value) < 1 || Number(value) > 90) {
          updValue = '';
        }
      }
      if (!inPercent) {
        if (Number(value) < 1) {
          updValue = '';
        }
      }
      this.props.setValue(id, updValue);
      const validInput = onInputChange(id, updValue);

      this.setState({
        value: updValue,
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


    componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.inPercent && nextProps.inPercent === true) {
        this.changesCount = this.changesCount + 1;
      }
      if (nextProps && nextProps.prefilled) {
        this.setState({ value: nextProps.prefilled });
      }
    }

    componentDidUpdate(prevProps) {
      if (this.changesCount > 0) {
        if (prevProps.inPercent === false) {
          this.changesCount = 0;
          this.setState({ value: '' });
        }
      }
    }

    render() {
      return (

        <TextField
          style={{ width: '90%', paddingLeft: this.props.extraPadding }}
          hintText={this.props.hintText}
          value={this.state.value}
          type={this.props.type}
          onChange={this.onChange}
          onBlur={this.onBlur}
          errorText={this.state.errorText}
          htmlFor={this.props.id}
          floatingLabelText={this.props.label}
          floatingLabelStyle={this.state.labelStyle}
          floatingLabelFocusStyle={{ color: '#29abe2' }}
          floatingLabelFixed={this.props.fixedFloat}
          underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid gray' }}
          inputStyle={this.props.disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
          disabled={this.props.disabled}
        />

      );
    }
}
