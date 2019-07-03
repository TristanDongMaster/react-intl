import * as AppConst from '../constants/AppConst';

// 
export function COMMON_GET_USER_INFO(val) {
  return {
    type: AppConst.COMMON_GET_USER_INFO,
    val
  };
}

export function COMMON_SET_TITLE(val, subTitle, isHideHeader=false) {
  return {
    type: AppConst.COMMON_SET_TITLE,
    val,
    subTitle,
    isHideHeader
  };
}

// 国际化
export function COMMON_CHANGE_LANGUAGE(val) {
  return {
    type: AppConst.COMMON_CHANGE_LANGUAGE,
    val
  };
}

// 更新头部区域信息
export function COMMON_SET_INFO(val) {
  return {
    type: AppConst.COMMON_SET_INFO,
    val
  };
}

export const COMMON_SET_LOADING = data => ({
  type: AppConst.COMMON_SET_LOADING,
  data
});
