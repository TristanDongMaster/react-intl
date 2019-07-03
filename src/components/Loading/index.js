import React from 'react'
import './style.less'
import classnames from 'classnames'
import { Spin } from 'antd'

export default class Loading extends React.PureComponent {
    render() {
        return (
            <div className={classnames({ 'spin-wrapper': true, 'hide': !this.props.loading })} >
                <div className="spin-dot">
                    <Spin spinning={this.props.loading} size="large"/>
                </div>
                <div className="spin-mask" />
            </div>
        );
    }
}
