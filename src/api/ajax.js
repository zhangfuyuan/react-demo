/**
 * 封装能发ajax请求的函数
 */
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// axios request 拦截器
axios.interceptors.request.use(function (config) {
    const { method, data } = config
    // 处理的是 post 请求，将data对象转化成query参数格式字符串
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config
})

// axios response 拦截器
axios.interceptors.response.use(function (response) {
    if (response.status === 200){
        return response.data
    }
}, error => {
    message.error('请求出错',error)
    return new Promise(() => { })
})

export default axios