import common from './common'
import test from './test'
import home from './home'
import {getMessages} from 'LOCALES/util'

export default {
    ...getMessages(common, 'common'),
    ...getMessages(test, 'test'),
    ...getMessages(home, 'home')
}