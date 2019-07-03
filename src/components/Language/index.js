/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 *
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from 'ACTIONS/AppActions';
import { setCurrentLanguage } from 'LOCALES/util'
import { Select } from 'antd'


class App extends Component {
  constructor(props) {
    super(props);
  }

  changeLanguage = () => {
    let lang = this.props.stores.appReducers.language;
    if (lang === 'zh_CN' || lang === 'th_TH') {
      lang = 'en_US'
    } else {
      lang = 'zh_CN'
    }
    this.props.appActions.COMMON_CHANGE_LANGUAGE(lang);
    setCurrentLanguage(lang)
  }

  // changeLanguageTh = (val) => {
  //   let lang = this.props.stores.appReducers.language;
  //   lang = lang === 'zh' ? 'en' : 'zh';
  //   this.props.appActions.COMMON_CHANGE_LANGUAGE(val || lang);
  //   setCurrentLanguage(val || lang)
  // }

  render() {
    let locale = this.props.stores.appReducers.language;
    return (
      <React.Fragment>
          <Select defaultValue={locale} style={{ width: 120 }} onChange={this.changeLanguage.bind(this)}>
            <Select.Option value="zh_CN">简体中文</Select.Option>
            <Select.Option value="en_US">English</Select.Option>
          </Select>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    stores: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
