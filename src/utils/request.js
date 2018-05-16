import axios from 'axios'
// import Cookies from 'js-cookie'
import qs from 'qs'
import jsonp from 'jsonp'


const fetch = (options) => {
  let {
    method = 'get',
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
        params: data,
      })
    case 'delete':
      return axios.delete(url, {
        data: data, 
      })
    case 'post':
      // 添加 csrf token
      // axios.defaults.headers.post['x-csrf-token'] = Cookies.get('csrfToken')
      return axios.post(url, data)
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
    if (data && data.data && data.data.result === 'success') {
      return Promise.resolve({
        ...data,
        success: true,
        message: data.msg || statusText || '没有描述',
        statusCode: data.code || status || '没有code',
      })
    } 
    return Promise.reject({
      ...data,
      success: false,
      statusText: data.msg || statusText || '没有描述',
      status: data.code || status || '没有code',
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode

    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = error.code
      msg = error.statusText || 'Network Error'
    }

    if (statusCode === 2000) {// 未登录
      return Promise.reject({
        success: false,
        statusCode,
        message: '未登录',
      })
    }

    return Promise.resolve({ success: false, statusCode, message: msg })
  })
}
