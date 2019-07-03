import browserHistory from '../routes/history';
import qs from 'qs';
import merge from 'lodash/merge';

/*eslint-disable */
const PUBLIC_PARAMETER_PAGE = [
  'activityId',
  'areaId',
  'columnId',
  'channelId',
  'fromModuleType',
  'isFromShop',
  'path_type',
];

const PUBLIC_PARAMETER_FETCH = [
  'activityId',
  'areaId',
  'columnId',
  'channelId',
  'fromModuleType',
];

export function getLinkUrl (url, opt = {}, paramArray = []) {
  if (!url) {
    return '';
  } else if (url === '/' || url === '/brandActivity/index') {
    return url;
  } else if (
    url.indexOf ('http://') === 0 ||
    url.indexOf ('https://') === 0 ||
    url.indexOf ('//') === 0
  ) {
    return paramObj2paramStrEncode (url, opt);
  } else if (url) {
    let query = paramStr2paramObj (location.href);
    let paramArrayNew = merge ([], PUBLIC_PARAMETER_PAGE, paramArray);
    paramArrayNew.map (item => {
      if (query[item]) {
        opt[item] = query[item];
      }
    });
    return paramObj2paramStrEncode (url, opt);
  }
}
export function goBack () {
  browserHistory.goBack ();
}
export function locationHref (url, opt = {}, paramArray = []) {
  if (
    url.indexOf ('http://') === 0 ||
    url.indexOf ('https://') === 0 ||
    url.indexOf ('//') === 0
  ) {
    location = paramObj2paramStrEncode (url, opt);
  } else {
    let query = paramStr2paramObj (location.href);
    let paramArrayNew = merge ([], PUBLIC_PARAMETER_PAGE, paramArray);
    paramArrayNew.map (item => {
      if (query[item]) {
        opt[item] = query[item];
      }
    });
    browserHistory.push ({
      pathname: url,
      search: toQueryString (opt),
    });
  }
}
export function locationOpen (url, opt = {}, paramArray = []) {
  if (
    url.indexOf ('http://') === 0 ||
    url.indexOf ('https://') === 0 ||
    url.indexOf ('//') === 0
  ) {
    location = paramObj2paramStrEncode (url, opt);
  } else {
    let query = paramStr2paramObj (location.href);
    let paramArrayNew = merge ([], PUBLIC_PARAMETER_PAGE, paramArray);
    paramArrayNew.map (item => {
      if (query[item]) {
        opt[item] = query[item];
      }
    });
    window.open (`${url}${qs.stringify (opt, {addQueryPrefix: true})}`);
  }
}
export function locationReplace (url, opt = {}, paramArray = []) {
  if (
    url.indexOf ('http://') === 0 ||
    url.indexOf ('https://') === 0 ||
    url.indexOf ('//') === 0
  ) {
    location.replace (paramObj2paramStr (url, opt));
  } else {
    let query = paramStr2paramObj (location.href);
    let paramArrayNew = merge ([], PUBLIC_PARAMETER_PAGE, paramArray);
    paramArrayNew.map (item => {
      if (query[item]) {
        opt[item] = query[item];
      }
    });
    browserHistory.replace ({
      pathname: url,
      search: toQueryString (opt),
    });
  }
}
export function getPublicParameter () {
  let query = paramStr2paramObj (location.href);
  let opt = {};
  let isNumber = /^[0-9]*$/;
  PUBLIC_PARAMETER_FETCH.map (item => {
    if (query[item] !== undefined && query[item] !== null) {
      if (isNumber.test (query[item])) {
        opt[item] = parseInt (query[item]);
      } else {
        opt[item] = query[item];
      }
    }
  });
  return opt;
}

export function toQueryString (obj) {
  return obj
    ? Object.keys (obj)
        .sort ()
        .map (key => {
          let val = obj[key];
          if (typeof val === 'object') {
            return `${encodeURIComponent (key)}=${encodeURIComponent (JSON.stringify (val))}`;
          }
          return `${encodeURIComponent (key)}=${encodeURIComponent (val)}`;
        })
        .join ('&')
    : '';
}

export function getQueryStringByName (name) {
  let result = decodeURIComponent (location.search).match (
    new RegExp (`[?&]${name}=([^&]+)`, 'i')
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}

// {name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStr (url, obj = {}) {
  let newUrl = '';
  let paramStr = '';
  for (let i in obj) {
    paramStr += `&${i}=${obj[i]}`;
  }
  if (url.indexOf ('&') > -1) {
    newUrl = url + paramStr;
  } else if (url.indexOf ('?') > -1) {
    if (url.indexOf ('=') > -1) {
      newUrl = url + paramStr;
    } else {
      newUrl = url + paramStr.substring (1);
    }
  } else {
    newUrl = `${url}?${paramStr.substring (1)}`;
  }
  return newUrl;
}

// {name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStrEncode (url, obj = {}) {
  let newUrl = '';
  let paramStr = '';
  for (let i in obj) {
    paramStr += `&${i}=${encodeURIComponent (obj[i])}`;
  }
  if (url.indexOf ('&') > -1) {
    newUrl = url + paramStr;
  } else if (url.indexOf ('?') > -1) {
    if (url.indexOf ('=') > -1) {
      newUrl = url + paramStr;
    } else {
      newUrl = url + paramStr.substring (1);
    }
  } else {
    newUrl = `${url}?${paramStr.substring (1)}`;
  }
  return newUrl;
}

// name=jack&age=18 => {name:'jack',age:18}
export function paramStr2paramObj (url) {
  let search = decodeURIComponent (url)
    .replace (/^\s+/, '')
    .replace (/\s+$/, '')
    .match (/([^?#]*)(#.*)?$/); // 提取location.search中'?'后面的部分
  if (!search) {
    return {};
  }
  let searchStr = search[1];
  let searchHash = searchStr.split ('&');

  let ret = {};
  for (let i = 0, len = searchHash.length; i < len; i++) {
    // 这里可以调用each方法
    let pair = searchHash[i];
    if ((pair = pair.split ('='))[0]) {
      let key = pair.shift ();
      let value = pair.length > 1 ? pair.join ('=') : pair[0];
      if (value != undefined) {
        value = value;
      }
      if (key in ret) {
        if (ret[key].constructor != Array) {
          ret[key] = [ret[key]];
        }
        ret[key].push (value);
      } else {
        ret[key] = value;
      }
    }
  }
  return ret;
}

export function getMergeUrl (url, obj = {}) {
  // var locationUrl = location.href
  // var current = paramStr2paramObj(locationUrl)
  // var newObject = merge({}, current, obj)
  let newUrl = paramObj2paramStr (url, obj);
  return newUrl;
}

export function timeoutPromise (ms, promise) {
  return new Promise ((resolve, reject) => {
    const timeoutId = setTimeout (() => {
      reject (new Error ('promise timeout'));
    }, ms);
    promise.then (
      res => {
        clearTimeout (timeoutId);
        resolve (res);
      },
      err => {
        clearTimeout (timeoutId);
        reject (err);
      }
    );
  });
}

export function processResponse (res) {
  if (res.success) {
    return res.data;
  }
  return Promise.reject (res.message);
}

export const setLoading = (errorHandler = () => {}) => (
  target,
  name,
  descriptor
) => ({
  ...descriptor,
  async value (...arg) {
    try {
      this.props.appActions.SET_LOADING (true);
      const result = await descriptor.value.apply (this, arg);
      this.props.appActions.SET_LOADING (false);
      return result;
    } catch (err) {
      if (errorHandler) errorHandler.call (this, err);
      this.props.appActions.SET_LOADING (false);
    }
  },
});

export function removeNodeById (id) {
  if (!id) return;
  let dom = document.getElementById (id);
  if (dom) {
    if (dom.remove) {
      dom.remove ();
    } else {
      dom.removeNode (true);
    }
  }
}
