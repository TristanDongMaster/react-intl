import React from 'react';
import Link from 'COMPONENTS/Link';
import {getValue} from 'LOCALES/util';
import {Divider} from 'antd';

/*
列表按钮入口
  @ID：活动ID
  @activeKey：
    0:我的全部
    1:待我报名
    2:待我审核
    3：已报名
    4我创建/被分享得
  @isParent：是否事第一层
  @isAdmin：管理组
*/
export default function getButton (props) {
  const {id, activeKey, isParent, isAdmin} = props;
  let content = [];
  // 第一层只展示项目介绍
  if (isParent) {
    content.push (
      <Link to="/mc-intl/projectInfo" option={{id}}>
        {getValue ('title.description')}
      </Link>
    );
  } else if (activeKey === '0') {
    content.push (
      <Link to="/mc-intl/projectInfo" option={{id}}>
        {getValue ('title.resouceMg')}
      </Link>
    );
    // 管理组可见报名设置
    if (isAdmin) {
      content.push (<Divider type="vertical" />);
      content.push (
        <Link to="/mc-intl/projectInfo" option={{id}}>
          {getValue ('title.enrollSetting')}
        </Link>
      );
    }
  } else if (activeKey === '1') {
    content.push (
      <Link to="/mc-intl/projectInfo" option={{id}}>
        {getValue ('title.enrollNow')}
      </Link>
    );
  } else if (activeKey === '2') {
    content.push (
      <Link to="/mc-intl/projectInfo" option={{id}}>
        {getValue ('title.materialAudit')}
      </Link>
    );
  } else if (isAdmin) {
    // 管理组-分配
    content.push (
      <Link to="/mc-intl/reource" option={{id}}>
        {getValue ('title.resouceMg')}
      </Link>
    );
  } else {
    content.push (
      <Link to="/mc-intl/enroll" option={{id}}>
        {getValue ('title.resouceMg')}
      </Link>
    );
  }
  return content;
}
