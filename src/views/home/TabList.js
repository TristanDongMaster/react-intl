/*
    秒杀首页
*/
import React from 'react';
import SimpleHeader from 'COMPONENTS/Header/Simple';
import {Tabs, Badge} from 'antd';
import PropTypes from 'prop-types';
import {getValue} from 'LOCALES/util';

const {TabPane} = Tabs;

class TabList extends React.PureComponent {
  render () {
    const {activeKey, onChange, count} = this.props;
    const tabMap = [
      getValue ('home.all'),
      getValue ('home.applying'),
      getValue ('home.auditing'),
      getValue ('home.applyed'),
      getValue ('home.owner'),
    ];
    return (
      <React.Fragment>
        <SimpleHeader title={{id: 'title.home'}}>
          <Tabs
            activeKey={activeKey}
            defaultActiveKey={activeKey}
            onChange={onChange}
            tabBarStyle={{margin: 0, borderBottom: 0}}
          >
            {tabMap.map ((val, index) => {
              if (index !== 2) {
                return (<TabPane tab={val} key={`${index}`} />);
              } else {
                return (<TabPane tab={<Badge offset={[16,-4]} count={count}> {val} </Badge>} key={`${index}`} />);
              }
            })}
          </Tabs>
        </SimpleHeader>
      </React.Fragment>
    );
  }
}

TabList.propTypes = {
  onChange: PropTypes.func.isRequired, // 回调函数，tab改变时候触发
  activeKey: PropTypes.string.isRequired, // 默认选中的key
  count: PropTypes.number.isRequired, // 角标数量
};

export default TabList;
