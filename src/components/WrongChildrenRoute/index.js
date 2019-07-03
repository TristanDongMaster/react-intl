import React from 'react';
import { Icon } from 'antd';
import { locationHref } from 'MODULES/utils';

export default () => <div style={{ textAlign: 'center', padding: '100px 0' }}>
    <Icon type="frown"
        style={{ fontSize: '60px' }}
    />
    <h3 style={{ marginTop: '30px' }}>
        访问地址出错
        &nbsp;&nbsp;&nbsp;
        <a
            href="javascript:" 
            onClick={() => locationHref('/index')}
        >
            返回首页
            <Icon type="rollback" />
        </a>
    </h3>
</div >