import React, {Component} from 'react';
import BabelNav from '@jmfe/babel-nav';
import {deleteCookie} from 'MODULES/pub/cookie';
import {fetchFormData} from 'MODULES/fetch';
import * as AppConst from 'CONSTANTS/AppConst';
import PropTypes from 'prop-types';


export default class Babelnav extends Component {


  render () {
    const {language, userInfo} = this.props;
    let userType = userInfo.userType || 0;
    let erpNo = userInfo.erpNo || '';
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