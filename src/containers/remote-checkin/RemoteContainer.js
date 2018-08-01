import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

class RemoteContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    browserHistory.push('/home/remote/add-remote-user');
  }
  render() {
    return (
      <div>

        <Drawer open containerClassName="custom-drawer">
          <MenuItem
            value="a"
            primaryText="Remote 1"
            onClick={this.handleClick}
          />
          <MenuItem
            value="a"
            primaryText="Remote 2"
            onClick={this.handleClick}
          />
          <MenuItem
            value="a"
            primaryText="remote 3"
            onClick={this.handleClick}
          />
        </Drawer>
        {this.props.children}
      </div>

    );
  }
}

export default RemoteContainer;
