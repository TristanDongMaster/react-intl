import { message } from 'antd';
import {getValue} from 'LOCALES/util';

export default function (callbackUrl) {
    let url = '/login'
    if (location.hostname === 'localhost') {
        message.error(getValue('api.400'))
        return
    }
    location.replace(url)
}