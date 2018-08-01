import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class VehicleAction extends React.Component {
  constructor(props) {
    super(props);
    this.className = `action-button ${this.props.className}`;
    this.styles = {
      hoverColor: {
        color: '#29ABE2',
      },
    };
    this.state = {
      show: true,
    };
  }

  onClick = () => {
    const status = this.state.show;
    this.props.toggleRow(status, this.props.id);
    this.setState({
      show: !status,
    });
  };

  render() {
    return (
      <FlatButton
        className={this.className}
        hoverColor={this.styles.hoverColor.color}
        onClick={this.onClick}
      >
        { this.props.children }
      </FlatButton>
    );
  }
}
