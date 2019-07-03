import 'whatwg-fetch';
import {message} from 'antd';
import {getPublicParameter} from './utils';
import qs from 'qs';
import merge from 'lodash/merge';
import redirect from './pub/redirect';
import clearObject from './pub/clearObject';
import {getValue} from 'LOCALES/util';

function fetchCommon (URL, options, isShowError, isShowLoading) {
  const ERROR_MESSAGE = {
    code: 500,
    success: false,
    message: getValue ('api.500'),
  };
  options.credentials = 'include';
  options.mode = 'cors';
  options.cache = 'no-cache';
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const messageText = typeof isShowLoading !== 'boolean'
    ? isShowLoading
    : getValue ('api.900');
  isShowLoading && message.loading (messageText);
  return fetch (URL, options)
    .then (response => {
      isShowLoading && message.destroy ();
      if (response && response.status === 200) {
        return response.json ();
      } else {
        throw ERROR_MESSAGE;
      }
    })
    .then (json => {
      if (json === undefined) {
        throw ERROR_MESSAGE;
      } else if (json && (json.success === true || json.code === '0')) {
        return json;
      } else if (
        json &&
        (json.code === 400 ||
          json.code === 401 ||
          json.status === 401 ||
          json.status === 400)
      ) {
        // 未登录
        redirect ();
        let e = {
          code: 400,
          message: getValue ('api.400'),
        };
        throw e
      } else {
        let _json = json || ERROR_MESSAGE;
        _json.code = _json.code || 500;
        _json.message = getValue (`api.${json.code}`);
        throw _json;
      }
    })
    .catch (e => {
      let err = e;
      if ((e && e.name === 'TypeError') || !e || (e && !e.message)) {
        err = ERROR_MESSAGE;
      }
      isShowLoading && message.destroy ();
      isShowError && message.error (err.message, 2);
      return err;
    })
    .then (json => json || ERROR_MESSAGE);
}

export function fetchGet (
  url,
  data = {},
  isShowError = true,
  isShowLoading = false
) {
  const publicParameter = getPublicParameter ();
  data = merge ({}, data, publicParameter);
  let URL = url + qs.stringify (data, {addQueryPrefix: true});
  return fetchCommon (URL, {}, isShowError, isShowLoading);
}

export function fetchPost (
  url,
  data = {},
  isShowError = true,
  isShowLoading = false
) {
  const publicParameter = getPublicParameter ();
  data = merge ({}, data, publicParameter);
  let options = {
    method: 'POST',
    body: JSON.stringify (clearObject (data)), // qs.stringify(data)
  };
  return fetchCommon (url, options, isShowError, isShowLoading);
}

export function fetchDelete (
  url,
  data = {},
  isShowError = true,
  isShowLoading = false
) {
  const publicParameter = getPublicParameter ();
  data = merge ({}, data, publicParameter);
  let options = {
    method: 'DELETE',
    body: JSON.stringify (clearObject (data)), // qs.stringify(data)
  };
  return fetchCommon (url, options, isShowError, isShowLoading);
}

export function fetchFormData (
  type = 'GET',
  URL,
  data,
  isShowError = true,
  isShowLoading = false
) {
  const ERROR_MESSAGE = {
    code: 500,
    success: false,
    message: getValue ('api.500'),
  };
  let options = {};
  options.body = data;
  options.method = type;
  options.credentials = 'include';
  options.mode = 'cors';
  options.cache = 'no-cache';
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };
  isShowLoading && message.loading ('loading...');
  return fetch (URL, options)
    .then (response => {
      isShowLoading && message.destroy ();
      if (response && response.status === 200) {
        return response.json ();
      }
      throw ERROR_MESSAGE;
    })
    .then (json => {
      if (json === undefined) {
        throw ERROR_MESSAGE;
      } else if (json && (json.success === true || json.code === '0')) {
        return json;
      } else {
        let th = {
          code: 500,
          isSuccess: false,
          data: json.data,
          message: json.message || ERROR_MESSAGE.message,
        };
        throw th;
      }
    })
    .catch (e => {
      isShowLoading && message.destroy ();
      isShowError && message.error (e.message || ERROR_MESSAGE.message, 2);
      return e || ERROR_MESSAGE;
    })
    .then (json => json || ERROR_MESSAGE);
}
