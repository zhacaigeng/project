import axios from 'axios';
import router from '@ctrip/nfes/next/router'
import getConfig from '@ctrip/nfes/next/config';
import urlConfig from '$config/url';
import { message } from 'antd';

const axiosConfig = {
    timeout: 30000, // 超时时间
    withCredentials: true,
    baseURL: "/"
}

const ApiServices = axios.create(axiosConfig)

ApiServices.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.url = getFullUrl(config.url);
    return config;
}, Promise.reject);

// response interceptor
ApiServices.interceptors.response.use(
    response => {        
        const { data, status, config } = response;
        const { commonCheck = true } = config;
        const { returncode, redirectUrl, code } = data || {};        
        // loign处理 
        if(returncode === -100) {
            const url = [
                (redirectUrl || '').split('backurl=')[0],
                'backurl=',
                encodeURIComponent(window.location.href)
            ].join('')
            window.location.href = url;
            return;            
        }
        // not permission
        if(returncode === -200) {
            window.location.href = redirectUrl;
            return;
        }
        // 业务错误码处理
        if(commonCheck && code !== '000000') {
            throw data;
        }
        return data;
    },
    error => {
        throw error
    }
)

export default ApiServices;

export var ApiServicesComm = (url, type, options) => new Promise((resolve, reject)=>{
    ApiServices[type](`${urlConfig.cppapi}${url}`, type == 'get'? {params:options.params}: options.params)
    .then(res => {
        const { code, result } = res;
        if(code === '000000') {
            resolve(result)
        } else {
            throw res;
        }
    })
    .catch(e => {
        console.error(e);
        reject(e)
    })
})

/**
 * POST 请求
 * @param {*} url 
 * @param {*} data 
 */
export function post(url, data, config) {
    return ApiServices.post(url, data, config);
}

export function get(url, data, config) {
    config = Object.assign({ params: data }, config);
    return ApiServices.get(url, config);
}

export function getFullUrl(url) {
    if(!/^(http|\/\/)/.test(url)) {
        url = `${urlConfig.cppapi}${url}`;
    }
    return url;
}