import * as AppConst from '../constants/AppConst';

const initialState = {
  activeKey: '0',
  projectList: {
    items: [],
  },
};

export default function homeReducers (state = initialState, action) {
  switch (action.type) {
    case AppConst.HOME_SET_TAB:
      return Object.assign ({}, state, {
        activeKey: action.val,
      });
    case AppConst.HOME_PROJECT_LIST:
      return Object.assign ({}, state, {
        projectList: action.val,
      });
    default:
      return state;
  }
}
