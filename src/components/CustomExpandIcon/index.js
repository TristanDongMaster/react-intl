import React from 'react';
import {Icon} from 'antd';
import './style';

export default function CustomExpandIcon (props) {
  let customIcon = <Icon type="caret-down" style={{visibility: 'hidden'}} />;
  if (
    props.record &&
    props.record.children &&
    props.record.children.length > 0
  ) {
    if (props.expanded) {
        customIcon = (
        <Icon
          type="caret-down"
          onClick={e => props.onExpand (props.record, e)}
        />
      );
    } else {
        customIcon = (
        <Icon
          type="caret-right"
          onClick={e => props.onExpand (props.record, e)}
        />
      );
    }
  }
  return <span className="custom-expand-icon">{customIcon}</span>;
}
