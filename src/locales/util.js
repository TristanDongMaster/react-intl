import localesData from './index';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import th_TH from 'antd/lib/locale-provider/th_TH';

const defaultLanguage = 'en_US'; // window.navigator.language&&window.navigator.language.replace('-','_') || 'en_US';
const defaultLocal = localesData[defaultLanguage];
const langugaeKey = 'babelLang'

// 'zh_CN'、'en_US'、'id_ID'、'th_TH'
console.info (localesData);

export function getMessages (messages, prefix) {
  let output = {};
  for (const id in messages) {
    const key = prefix ? `${prefix}.${id}` : id;
    const message = messages[id];
    output[key] = message;
  }
  return output;
}

export function getCurrentLanguage () {
  let l = window.localStorage.getItem (langugaeKey);
  if (l !== 'en_US' && l !== 'zh_CN' && l !== 'th_TH') {
    l = defaultLanguage;
  }
  return l;
}

export function setCurrentLanguage (val) {
  window.localStorage.setItem (langugaeKey, val || defaultLanguage);
}

export function chooseLocale (val) {
  let _val = val || getCurrentLanguage ();
  switch (_val) {
    case 'en_US':
      return localesData.en_US;
    case 'zh_CN':
      return localesData.zh_CN;
    case 'th_TH':
      return localesData.th_TH;
    default:
      return defaultLocal;
  }
}

export function getCurrentLocalesData (id) {
  return chooseLocale (id);
}

export function getValue (id) {
  return chooseLocale (getCurrentLanguage ())[id] || '';
}

export function $t(id) {
  return getValue(id)
}

export function getAntdLocal (val) {
  if (val === 'en_US') {
    return en_US;
  } else if (val === 'th_TH') {
    return th_TH;
  } else if (val === 'zh_CN') {
    return zh_CN;
  } else {
    return zh_CN;
  }
}
