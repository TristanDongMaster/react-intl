import React, {Component} from 'react';
import {Form, Table, Affix} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AppActions from 'ACTIONS/AppActions';
import * as Actions from 'ACTIONS/HomeActions';
import * as IndexService from 'SERVICES/home';
import Query from './Query';
import CustomExpandIcon from 'COMPONENTS/CustomExpandIcon';
import {getValue} from 'LOCALES/util';
import InfoEntry from './InfoEntry';

class TableQuery extends Component {
  constructor (props, context) {
    super (props, context);
    const {actions} = this.props;
    this.actions = actions;
    this.state = {
      pagination: {
        position: 'bottom',
      },
      loading: false,
      sortedInfo: {},
    };
  }

  // 表格列内容
  init = () => {
    let {sortedInfo} = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: getValue ('table.projectID'),
        dataIndex: 'id',
        align: 'left',
        width: '12%',
      },
      {
        title: getValue ('table.projectName'),
        dataIndex: 'id',
        align: 'left',
        width: '20%',
      },
      {
        title: getValue ('table.beginEndTime'),
        sorter: true, // 0：升序1：降序
        sortOrder: sortedInfo.order || 'ascend', // sortedInfo.order, // "descend"，"ascend"
        render: this.renderTime,
        align: 'left',
        width: '15%',
      },
      {
        title: getValue ('table.applyTime'),
        dataIndex: 'endTime',
        render: endTime => `${endTime}`,
        align: 'left',
        width: '15%',
      },
      {
        title: getValue ('table.action'),
        render: this.renderAction,
        align: 'left',
        width: '15%',
      },
    ];
    return columns;
  };

  componentDidMount () {
    this.handleTableChange ({current: 1}, {}, this.state.sortedInfo);
  }

  // 顶部tab切换需要重置并刷新数据
  componentWillReceiveProps (nextprops) {
    const currentStore = this.props.currentStore;
    let currentActiveKey = currentStore.activeKey;
    let nextActivekey = nextprops.currentStore.activeKey;
    if (currentActiveKey !== nextActivekey) {
      this.onReset ();
    }
  }

  renderTime = data => (
    <React.Fragment>
      {`${data.beginTime}`} <br /> {`${data.endTime}`}
    </React.Fragment>
  );

  renderAction = data => {
    const currentStore = this.props.currentStore;
    let activeKey = currentStore.activeKey;
    let isParent = data && data.children && data.children.length > 0;
    return (
      <InfoEntry
        id={data.id}
        activeKey={activeKey}
        isParent={isParent}
        isAdmin
      />
    );
  };

  fetchApi = (params = {}) => {
    const currentStore = this.props.currentStore;
    let activeKey = currentStore.activeKey;
    params.type = activeKey;
    this.setState ({loading: true});
    IndexService.getProjectList
      .bind (this, params) ()
      .then (json => {
        if (json && json.success) {
          const pagination = {...this.state.pagination};
          json.data = json.data || {items: []};
          pagination.total = json.data.totalCount || 0;
          this.setState ({
            pagination,
          });
        }
      })
      .then (() => {
        this.setState ({loading: false});
      });
  };

  handleTableChange = (pagination, filteredInfo, sortedInfo) => {
    this.setState ({
      pagination,
      sortedInfo,
    });
    let page = pagination.current;
    let timeSort = sortedInfo && sortedInfo.order === 'descend' ? 1 : 0;
    let query = this.props.form.getFieldsValue ();
    this.fetchApi ({
      page,
      timeSort,
      ...query,
    });
  };

  onSearch = e => {
    e.preventDefault ();
    this.handleTableChange ({current: 1}, {}, this.state.sortedInfo);
  };

  onReset = () => {
    this.props.form.resetFields ();
    this.handleTableChange ({current: 1}, {}, this.state.sortedInfo);
  };

  render () {
    const {currentStore} = this.props;
    const data = currentStore.projectList.items || [];
    const columns = this.init ();
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        <Query onReset={this.onReset} form={this.props.form} />
        <div className="affix-block-hidden" style={{marginTop: '20px'}}>
          <Affix offsetTop={0}>
            <Table
              size="middle"
              columns={columns}
              dataSource={[]}
              pagination={false}
              onChange={this.handleTableChange.bind (this)}
            />
          </Affix>
        </div>
        <Table
          size="middle"
          showHeader={false}
          columns={columns}
          rowKey={record => record.id + currentStore.activeKey}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          expandIcon={CustomExpandIcon}
          onChange={this.handleTableChange.bind (this)}
          indentSize={15}
        />
      </Form>
    );
  }
}
const WrappedTableQuery = Form.create () (TableQuery);

function mapStateToProps (state) {
  return {
    stores: state,
    currentStore: state.homeReducers,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    appActions: bindActionCreators (AppActions, dispatch),
    actions: bindActionCreators (Actions, dispatch),
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (
  WrappedTableQuery
);
