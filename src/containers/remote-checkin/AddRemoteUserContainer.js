import React, { Component } from 'react';

class hehe extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {

  }
  render() {
    return (
      <div style={{ paddingLeft: '250px' }}>
               This is remote user container
        {/* {this.props.children} */}
      </div>

    );
  }
}

export default hehe;
