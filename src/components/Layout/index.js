import React, {Component} from 'react';
import './style.less';
import {removeNodeById} from 'MODULES/utils';
import Header from 'COMPONENTS/Header';
import Navigation from './Navigation';
import PropTypes from 'prop-types';

export default class Index extends Component {
  componentDidMount () {
    removeNodeById ('globalLoading');
    window.NProgress && window.NProgress.done (true);
  }

  render () {
    const {children, infoDetail, language, userInfo, title} = this.props;
    let isHideHeader = title && title.isHideHeader;
    return (
      <div className="layout-block">
        <Navigation language={language} userInfo={userInfo} />
        <div className="layout-right">
          {!isHideHeader && <Header infoDetail={infoDetail} title={title} />}
          {children}
        </div>
      </div>
    );
  }
}

Index.defaultProps = {
  title:{}
};

Index.propTypes = {
  infoDetail: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
  title: PropTypes.shape ({
    id: PropTypes.string,
    subTitle: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};
