import qs from 'qs';
import merge from 'lodash/merge'
import {
    getPublicParameter,combineUrl
}
    from 'MODULES/utils'
import * as AppConst from 'CONSTANTS/AppConst'

// form下载文件
export function downLoadFile( url,param={}, method='post') {
    const publicParameter = getPublicParameter()
    const defaultParam = merge({}, param, publicParameter)
    let form = document.createElement('form')
    form.method = method
    form.action = combineUrl(url)
    form.id = (new Date()).getTime()
    for (let key in defaultParam) {
        let input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = defaultParam[key ]
        form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
}