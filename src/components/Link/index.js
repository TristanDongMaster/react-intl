import React from 'react'
import { Link } from 'react-router-dom';
import { getLinkUrl } from 'MODULES/utils'

export default (props) => {
    const url = getLinkUrl(props.to, props.option || {}, props.paramArray || [])
    if (props.to && (props.to.indexOf('http://') === 0 || props.to.indexOf('//') === 0 || props.to.indexOf('https://') === 0)) {
        return <a href={url}>{props.children}</a>
    } else if (props.to) {
        return <Link to={url} >{props.children}</Link>
    } else {
        return <span>{props.children}</span>
    }
}