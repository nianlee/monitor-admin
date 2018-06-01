import axios from 'axios'
// import Cookies from 'js-cookie'
import qs from 'qs'
import jsonp from 'jsonp'

const fetch = (options) => {
  let {
    method = 'get',
    withCredentials = true,
    data,
    url,
    fetchType,
  } = options

  if (fetchType === 'jsonp') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        withCredentials,
        params: data,
      })
    case 'delete':
      return axios.delete(url, {
        data: data, 
      })
    case 'post':
      return axios({
        url,
        method: 'post',
        withCredentials,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      })
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { data, statusText, status } = response
    if (data && data.code === 1000) {
      if (data.success) {
        return Promise.resolve({
          data: data.data || null,
          success: true,
          message: data.msg || statusText || '没有描述',
          code: data.code || status || '没有code',
        })
      } else {
        return Promise.reject({
          data: null,
          success: false,
          statusText: data.msg || statusText || data.info || '没有描述',
          status: data.code || status || data.infocode || '没有code',
        })
      }
    } 

    // 高德地图API
    if (data && data.status === '1') {
      return Promise.resolve({
        data,
        success: true,
        message: data.info || statusText || '没有描述',
        code: data.infocode || status || '没有code',
      })
    }

    return Promise.reject({
      data: null,
      success: false,
      statusText: data.msg || statusText || data.info || '没有描述',
      status: data.code || status || data.infocode || '没有code',
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let code

    if (response && response instanceof Object) {
      const { data, statusText } = response
      code = response.status
      msg = data.message || statusText
    } else {
      code = error.code
      msg = error.statusText || 'Network Error'
    }

    if (code === 2000) {// 未登录
      return Promise.reject({
        success: false,
        code,
        message: '未登录',
      })
    }

    return Promise.resolve({ success: false, code, message: msg })
  })
}
