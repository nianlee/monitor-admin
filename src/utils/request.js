import axios from 'axios'
import Cookies from 'js-cookie'
import qs from 'qs'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
        'Access-Control-Allow-Headers': 'accept',
      })
    case 'delete':
      return axios.delete(url, {
        data: data, 
      })
    case 'post':
      // 添加 csrf token
      axios.defaults.headers.post['x-csrf-token'] = Cookies.get('csrfToken')
      console.log(data)
      data = qs.stringify(data)
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
    if (data.result === 'success') {
      return Promise.resolve({
        ...data,
        success: true,
        message: data.message || statusText || '没有描述',
        statusCode: data.code || status || '没有code',
      })
    } 
    return Promise.reject({
      ...data,
      success: false,
      statusText: data.message || statusText || '没有描述',
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
    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
