import React, { Component } from 'react';
import Content from 'COMPONENTS/Layout/Content';

class PermissionDenied extends Component {
  render() {
    return (
      <Content >
        <h1 style={{ textAlign: 'center' }}>Access deny, pleace contact adminstrator.</h1>
      </Content>
    );
  }
}

export default PermissionDenied
