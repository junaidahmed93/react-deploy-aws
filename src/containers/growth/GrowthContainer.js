import React, { Component } from 'react';

class GrowthContainer extends Component {
  render() {
    return (
      <div>
        <div style={{
 height: '50px', width: '300px', margin: '0 auto', color: '#29ABE2',
}}
        >
          <h1>Under development</h1>
        </div>
        <div style={{
 height: '50px', width: '200px', margin: '0 auto', color: '#29ABE2',
}}
        >
          <h3>Will be available soon.</h3>
        </div>
        <div className="under-dev-Logo" />
      </div>

    );
  }
}


export default GrowthContainer;
