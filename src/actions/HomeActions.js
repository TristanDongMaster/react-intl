import * as AppConst from '../constants/AppConst';

// 设置选择tab
export function HOME_SET_TAB (val) {
  return {
    type: AppConst.HOME_SET_TAB,
    val,
  };
}

// 列表数据
export function HOME_PROJECT_LIST (val) {
  return {
    type: AppConst.HOME_PROJECT_LIST,
    val,
  };
}
