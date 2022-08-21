import {Toast} from 'vant';
import axios from "axios";

const $axios = axios.create({
  timeout: 100000,
  baseURL: process.env.VUE_APP_BASE_API
})

//http request 拦截器
$axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    Toast({ type: 'fail', message: '请求失败:' + Promise.reject(err) })
    return Promise.reject(err);
  }
);
$axios.interceptors.response.use(
  response => {
    if (response.data.code !== 0 && response.data.msg) {
      Toast({ type: 'fail', message: response.data.msg })
    }
    return response
  },
  error => {
    let errorStr = error + '';
    let message = '';

    if (errorStr.indexOf("403") != -1) {
      message = '权限不足';
    }
    if (errorStr.indexOf("500") != -1) {
      message = '程序异常，请联系管理员';
    }
    if (errorStr.indexOf("404") != -1) {
      message = '找不到了';
    }

    Toast({ type: 'fail', message: message || '请求超时' })
    return Promise.reject(error);
  },
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    $axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    $axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装通用请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function http(url, method, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      data,
      method,
      url
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err)
    })
  })
}