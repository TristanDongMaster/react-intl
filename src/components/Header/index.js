import React, {Component} from 'react';
import './style.less';
import Language from 'COMPONENTS/Language';
import {getValue} from 'LOCALES/util';
import {FormattedMessage} from 'react-intl';
import Detail from './Detail';
import {locationHref} from 'MODULES/utils';
import PropTypes from 'prop-types'

export default class Index extends Component {
  goHome = () => {
    locationHref ('/mc-intl/index');
  };

  render () {
    const {infoDetail, title} = this.props;
    return (
      <div className="layout-header">
        <div className="layout-header-Language"><Language /></div>
        <div className="layout-header-sub-title">
          {title &&
            title.subTitle &&
            <div>
              <span className="layout-header-home" onClick={this.goHome} >
                <FormattedMessage id={title.id} />
              </span> / {title.subTitle}
            </div>}
        </div>
        <div className="layout-header-title">
          {getValue(title.id)}
        </div>
        <Detail data={infoDetail} />
      </div>
    );
  }
}
Index.defaultProps = {
  title: {},
};

Index.propTypes = {
  infoDetail: PropTypes.object.isRequired,
  title: PropTypes.object,
};