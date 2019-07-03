import { SERVER_DOMAIN, PROXY_API, PROXY_ENV } from './Domain'

// 通用
const apiHost = SERVER_DOMAIN.API + PROXY_API[PROXY_ENV]

export const PROXY_URL = {
  /** ***********************************
   *
   * home
   * 
   ************************************ */
  getProjectList: `${apiHost}/project/list`, // 列表数据
};

export default PROXY_URL;
