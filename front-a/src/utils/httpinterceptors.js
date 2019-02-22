import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
// import config from './config';
// import config from '/cofig.json';
import Cookies from 'js-cookie';
import { clearAll } from './localStorage';

message.config({
    maxCount: 1,
    top: 50
});




// 超时配置
// var instance = axios.create();
// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
// instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
/* instance.get('/longRequest', {
  timeout: 5000
}); */

// axios 全局配置
// axios.defaults.baseURL = window.systemBaseConfig.api;
axios.defaults.withCredentials=true; //跨域是否需要凭证
// axios.defaults.headers.post['Content-Type'] = 

// http请求拦截
axios.interceptors.request.use((config) => {

    const { hostname } = window.location;
    const authorization = Cookies.get('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1 ? '.benefitech.cn' : hostname });
    /**
     * 线上部署时，放出
     */
    if(!authorization) {
        clearAll();
        const { hash } = window.location;
        let arr = ['#/forgetValid','#/login'];
        if( !arr.includes(hash) ) {
            let url = window.location.href.split('#')[0];
            window.location.replace(url+'#/login');
            window.location.reload();
            return false;
        }
    }
    
    if(config.method === 'post' && config.url != 'sdpprevail/upload/uploadFile2') {
        config.headers = {
            'Accept':'*/*',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
        config.data = qs.stringify(config.data);
    }
    //TODO
    if(config.url == 'sdpprevail/project/projectOverviewForAjax') {
        config.headers = {
            'Accept':'*/*',
            'Content-Type':'application/json'
        }
        config.data = qs.parse(config.data);
    }

    if(config.method === 'get') {
        
    }
    
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
})

// http响应拦截
axios.interceptors.response.use( (res) => {
    // console.log('http interceptors config: ',config);
    //  TODO

    // message.destroy();
    return res;
}, (err) => {
    // 响应错误TODO
    // console.log('response error: ' , err)
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误';
            break

            case 401:
                // Cookies.remove('authorization',{});
                clearAll();
                let { hash,hostname } = window.location;
                Cookies.remove('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1? '.benefitech.cn' : hostname});
                if(hash !== '#/login') {
                    let url = window.location.href.split('#')[0];
                    window.location.replace(url + '#/login');
                    window.location.reload();
                }
                return false;
            case 403:
                err.message = '403';
            break

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`;
            break

            case 408:
                err.message = '请求超时';
            break

            case 500:
                err.message = '服务器内部错误';
            break

            case 501:
                err.message = '服务未实现';
            break

            case 502:
                err.message = '网关错误';
            break

            case 503:
                err.message = '服务不可用';
            break

            case 504:
                err.message = '网关超时';
            break

            case 505:
                err.message = 'HTTP版本不受支持';
            break

            default:
        }
    }
    // message.error(err.message);

    // return err;
    return Promise.reject(err);
})


