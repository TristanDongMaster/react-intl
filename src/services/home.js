import {fetchFormData, fetchGet} from 'MODULES/fetch';
import * as AppConst from 'CONSTANTS/AppConst';

// 用户基本信息
export function getUserInfo (option = {}) {
  return fetchFormData ('GET', `${AppConst.PROXY_URL.userInfo}`).then (json => {
    if (json && json.code === '0') {
      this.props.appActions.COMMON_GET_USER_INFO (json);
    }
    return json;
  });
}

export function getProjectList (option = {}) {
  return fetchGet (`${AppConst.PROXY_URL.getProjectList}`, option).then (json => {
    if (json && json.success) {
      this.props.actions.HOME_PROJECT_LIST (json.data);
    }
    return json;
  });
}
