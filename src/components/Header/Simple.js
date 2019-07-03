import React, {Component} from 'react';
import './style.less';
import Language from 'COMPONENTS/Language';
import {getValue} from 'LOCALES/util';
import {locationHref} from 'MODULES/utils';
import PropTypes from 'prop-types';

export default class Index extends Component {
  goHome = () => {
    locationHref ('/mc-intl/index');
  };

  render () {
    const {title, children} = this.props;
    return (
      <div className="layout-header layout-header-simple">
        <div className="layout-header-Language"><Language /></div>
        <div className="layout-header-title-block">
          <div className="layout-header-title-simple">
            {getValue (title.id)}
          </div>
          <div className="layout-header-title-children"> {children}</div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  title: PropTypes.object.isRequired,
};
