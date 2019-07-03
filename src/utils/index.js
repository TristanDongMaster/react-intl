import lodash from 'lodash'
import {$t} from 'LOCALES/util';


export default {
  /*
   返回真实需要的值
   value @param: any
   如果value 是 函数， 则返回函数返回值
   如果value 是 i18n模版，则返回被翻译的值， 比如'$t$common.ok' 将返回ok
   如果value 是其他，则直接返回。
   */
  getTrueValue (value) {
    if (lodash.isFunction(value)) {
      return value()
    } else if (lodash.isString(value) && value.slice(0,3) === '$t$') {
        return $t(value.slice(3))
    } else {
      return value
    }
  }
}
