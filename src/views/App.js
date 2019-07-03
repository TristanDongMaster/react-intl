/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   19/05/20
 *
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AppActions from 'ACTIONS/AppActions';
import Layout from 'COMPONENTS/Layout';
import {message, LocaleProvider} from 'antd';
import Loading from 'COMPONENTS/Loading';
import ChildrenRoute from '../routes';
import {getAntdLocal} from 'LOCALES/util';

message.config ({
  top: '30%',
});

class App extends Component {
  componentDidMount () {
  }

  render () {
    const {stores} = this.props;
    let loading = stores.appReducers.loading;
    let locale = stores.appReducers.language;
    let infoDetail = stores.appReducers.infoDetail;
    let userInfo = stores.appReducers.userInfo;
    let title = stores.appReducers.title;
    return (
      <LocaleProvider locale={getAntdLocal (locale)}>
        <React.Fragment>
          <Layout infoDetail={infoDetail} title={title} language={locale} userInfo={userInfo}>
            <ChildrenRoute />
          </Layout>
          <Loading loading={loading} />
        </React.Fragment>
      </LocaleProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    stores: state,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    appActions: bindActionCreators (AppActions, dispatch),
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (App);
