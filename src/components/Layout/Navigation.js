import React, {Component} from 'react';
import * as AppConst from 'CONSTANTS/AppConst';
import PropTypes from 'prop-types';


export default class Babelnav extends Component {
  render () {
    return (
      <div className="layout-left "> 
        <br/>
        <br/>
        <br/>
        <h2>DEMO</h2>
        <br/>
        <br/>
        <br/>
        <h2>DEMO</h2>
        <br/>
        <br/>
        <br/>
        <h2>DEMO</h2>
        <br/>
        <br/>
        <br/>
        <h2>DEMO</h2>
      </div>
    );
  }
}

Babelnav.propTypes = {
  language: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
}