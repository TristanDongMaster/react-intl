import React, {Component} from 'react';
import ReactComponent from 'COMPONENTS/ReactComponent';
import classNames from 'classnames';
import {Spin} from 'antd';
import PropTypes from 'prop-types'

export default class Index extends Component {
  render () {
    const {children, spinning} = this.props;
    return (
      <React.Fragment>
        <Spin spinning={spinning || false} size="large">
          <div className="layout-content">
            <div
              className={classNames ({
                'layout-children': true,
                'layout-children-padding': !this.props.noPadding,
                // animated: this.state.hasAnimate,
                // slideInDown: this.state.hasAnimate,
              })}
            >
              <ReactComponent> {children}</ReactComponent>
            </div>
          </div>
        </Spin>
      </React.Fragment>
    );
  }
}

Index.defaultProps = {
  noPadding: false,
  spinning: false,
}

Index.propTypes = {
  noPadding: PropTypes.bool,
  spinning: PropTypes.bool,
}
