import {fetchFormData} from 'MODULES/fetch';
import * as AppConst from 'CONSTANTS/AppConst';

// 用户基本信息
export function getUserInfo(option = {}) {
  return fetchFormData ('GET',
    `${AppConst.PROXY_URL.userInfo}`
  ).then (json => {
    if (json && json.code === '0') {
      this.props.appActions.COMMON_GET_USER_INFO (json);
    }
    return json;
  });
}

