import NODE_ENV from './ENV'
import { STATIC_PUB_DOMAIN } from './Domain'

// 图片资源路径
const IMG_ROOT = {
	'development': '/src/assets/img',
	'production': `${STATIC_PUB_DOMAIN}/assets/img`,
}

export const STATIC_PUB_DOMAIN_ROOT = {
	'development': '/src/assets',
	'production': `${STATIC_PUB_DOMAIN}/assets`,
}[NODE_ENV]

export const IMG_SRC_ROOT = IMG_ROOT[NODE_ENV]

export const IMG_SRC = {
	'LOGO': `${IMG_ROOT[NODE_ENV]}/logo.png`,
}
