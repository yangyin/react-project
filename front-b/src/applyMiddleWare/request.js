import Cookies from 'js-cookie';
import { write } from './../utils/localStorage';
import Axios from './../utils/axios';
import { notification } from 'antd';


export const CALL_API = Symbol("Call API");

export default ({ dispatch }) => next => async action => {
    /**
     * 如果不符合要求，直接调用下一个中间件，使用next
     * 如果符合要求，需要重新dispatch,调用dispatch
     */

    const callAPI = action[CALL_API];

    if (typeof callAPI !== 'undefined') {

        const { url, method, data={}, types=[], isnotify,msgErr,msgSuc ,callback} = callAPI;
        const [successType, errorType, jurisdictionType] = types;
        if(url) {
            const ajax = Axios[ (method&& method.toLowerCase() ) || 'get'];
            try {
                const res = await ajax({ url, data });
                if (res.data && typeof res.data.success === 'boolean') {
                    if (res.data.success === false) { //失败
                        if(isnotify) {
                            notification.error({
                                key:'1',
                                message: '提示',
                                description: msgErr || res.data.message,
                            });
                        }
                        return typeof errorType === 'string' && dispatch({ type: errorType, payload: {msg:msgErr || res.data.message,status:false} });
                    } else { //成功
                        /**
                         * 登陆时，保存数据
                         */
                        if (successType === 'LOGIN_SUCCESS') {
                            const { appId, authorization, userRelatedCompanyMap } = res.data.content;
                            const { hostname } = window.location;
                            Cookies.set('authorization', authorization,{ domain: hostname.indexOf('.benefitech.cn') !== -1 ? '.benefitech.cn' : hostname});
                            write('appId', appId);
                            write('userRelatedCompanyMap', userRelatedCompanyMap);
                        }
                        if(isnotify && msgSuc !== false) {
                            notification.success({
                                key:'1',
                                message: '提示',
                                description:msgSuc || res.data.message,
                            });
                        }
                        if(callback && typeof callback === 'function') {
                            callback(res.data.content,dispatch,data.params);
                            return false;
                        } else {
                            return typeof successType ==='string' && dispatch({ type: successType, payload: {data:res.data.content,status:true} });
                        }
                    }
                }
            } catch(e) {
                const { message } = e;
                if (message == 403 ) {
                    if(typeof jurisdictionType !== 'undefined') {
                        return dispatch({type:jurisdictionType,payload:true});
                    } else {
                        notification.error({
                            key:'2',
                            message: '提示',
                            description:'暂无权限'
                        });
                        return false;
                    }
                } else {
                    // console.log('**报错捕获：**',message);
                    const reg = /[\u4e00-\u9fa5]/;
                    reg.test(message)&&notification.error({
                        key:'2',
                        message: '提示',
                        description:message
                    });
                    return false;
                }
            }
        }
    }
    return next(action);
}