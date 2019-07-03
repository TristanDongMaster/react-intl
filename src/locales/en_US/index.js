import common from './common'
import test from './test'
import home from './home'
import title from './title'
import table from './table'
import api from './api'
import {getMessages} from 'LOCALES/util'

export default {
    ...getMessages(common, 'common'),
    ...getMessages(test, 'test'),
    ...getMessages(home, 'home'),
    ...getMessages(title, 'title'),
    ...getMessages(table, 'table'),
    ...getMessages(api, 'api')
}

