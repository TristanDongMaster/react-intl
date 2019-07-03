// MOCK:本地mock服务
// PROXY:代理到项目服务器
const PROXY = 'MOCK';
const DEBUG = process.env.NODE_ENV === 'development';

// 域名
const DOMAIN_URL = '//dev.api.com';
export const PROXY_ENV = DEBUG ? PROXY : 'PROD';
export const SERVER_DOMAIN = {
  API: DEBUG ? '' : DOMAIN_URL,
};

export const PROXY_API = {
  MOCK: '/mock-api',
  PROXY: '/proxy-api',
  PROD: '',
};

// 静态资源根目录
export const STATIC_PUB_DOMAIN = '//www.cdn.com';
