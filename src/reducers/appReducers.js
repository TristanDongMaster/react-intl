import {merge} from 'lodash';
import * as AppConst from '../constants/AppConst';
import {getCurrentLanguage} from 'LOCALES/util';

const initialState = {
  language: getCurrentLanguage (),
  userInfo: {
    erpName: '',
    erpNo:'',
    userType: 0
  },
  role: {
    roleName: '',
    auditionRole: '',
    roleType: '',
    erpType: '',
  },
  loading: false,
  infoDetail:{
    id:'',
    id2:'',
    creater:''
  },
  title:{
    id: '',
    subTitle:'',
    isHideHeader:false,
  }
};

export default function appReducers (state = initialState, action) {
  switch (action.type) {
    case AppConst.COMMON_CHANGE_LANGUAGE:
      return merge ({}, state, {
        language: action.val,
      });
    case AppConst.COMMON_GET_USER_INFO:
      return merge ({}, state, {
        userInfo: action.val,
      });
    case AppConst.COMMON_SET_INFO:
      return merge ({}, state, {
        infoDetail: action.val,
      });
    case AppConst.COMMON_SET_TITLE:
      return merge ({}, state, {
        title: {
          id: action.val,
          subTitle: action.subTitle || '',
          isHideHeader:action.isHideHeader||false
        }
      });
    default:
      return state;
  }
}

