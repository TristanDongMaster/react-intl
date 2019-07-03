import React, {Component} from 'react';
import './style.less';
import {getValue} from 'LOCALES/util';
import PropTypes from 'prop-types'

export default class Index extends Component {
  render () {
    const {data} = this.props;
    return (
      <div className="layout-header-detail">
        {data &&
          data.id &&
          <span className="layout-header-detail-item">
            <span className="layout-heade-detail-label">
              {getValue ('home.projectId')}：
            </span>
            <span className="layout-heade-detail-txt">
              {data.id}
            </span>
          </span>}
        {data &&
          data.id2 &&
          <span className="layout-header-detail-item">
            <span className="layout-heade-detail-label">
              {getValue ('home.materialID')}：
            </span>
            <span className="layout-heade-detail-txt">
              {data.id2}
            </span>
          </span>}
        {data &&
          data.creater &&
          <span className="layout-header-detail-item">
            <span className="layout-heade-detail-label">
              {getValue ('home.creater')}：
            </span>
            <span className="layout-heade-detail-txt">
              {data.creater}
            </span>
          </span>}
      </div>
    );
  }
}

Index.defaultProps = {
  data: {}
};

Index.propTypes = {
  data: PropTypes.object
};