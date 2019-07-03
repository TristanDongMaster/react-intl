import React, { Component } from 'react'
import { message } from 'antd'
export default class ReactComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: '',
            info: '',
        }
    }
    componentDidCatch(error, info) {
        this.setState({ hasError: true, error, info })
        message.error(error.message)
    }
    render() {
        const {children} = this.props
        return (
        <React.Fragment>
            {!this.state.hasError && children}
            {this.state.hasError && <h1 style={{ textAlign: 'center' }}>Sorry, 页面开小差了，请刷新重试...</h1>}
        </React.Fragment>)
    }
}