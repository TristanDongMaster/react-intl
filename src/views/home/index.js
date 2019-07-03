import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AppActions from 'ACTIONS/AppActions';
import * as Actions from 'ACTIONS/HomeActions';
import Content from 'COMPONENTS/Layout/Content';
import TabList from './TabList'
import Table from './Table'

class Home extends React.PureComponent {
  constructor (props) {
    super (props);
    this.props.appActions.COMMON_SET_TITLE('title.home','', true)
  }

  onChange = (key) => {
    const {actions} = this.props
    actions.HOME_SET_TAB(key)
  }

  render () {
    const currentStore = this.props.currentStore
    return (
      <React.Fragment>
        <TabList onChange={this.onChange} activeKey={currentStore.activeKey} count={1}/>
        <Content>
          <Table />
        </Content>
      </React.Fragment>
    );
  }
}

function mapStateToProps (state) {
  return {
    stores: state,
    currentStore: state.homeReducers
  };
}

function mapDispatchToProps (dispatch) {
  return {
    appActions: bindActionCreators (AppActions, dispatch),
    actions: bindActionCreators (Actions, dispatch),
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);
