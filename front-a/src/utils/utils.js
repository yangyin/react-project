import Axios from './axios';
import { put } from 'redux-saga/effects';
import { write,clearAll } from './localStorage';
import { notification } from 'antd';
import Cookies from 'js-cookie';


export const CALL_API = Symbol("Call API");

export function* Service (option) {
    const callAPI = option[CALL_API];
    if (typeof callAPI !== 'undefined') {

        const { url, method, data = {}, types = [], isnotify, msgErr, msgSuc, callback } = callAPI;
        const [successAction, errorAction, jurisdictionAction] = types;
        if (url) {
            const ajax = Axios[(method && method.toLowerCase()) || 'get'];
            try {
                const res = yield ajax({ url, data });
                if (res.data && typeof res.data.success === 'boolean') {
                    if (res.data.success === false) { //失败
                        if (isnotify) {
                            notification.error({
                                key: '1',
                                message: '提示',
                                duration:2,
                                description: msgErr || res.data.message,
                            });
                        }
                        return typeof errorAction === 'function' && (yield put(errorAction({ msg: msgErr || res.data.message, status: false })));
                    } else { //成功
                        /**
                         * 登陆时，保存数据
                         */
                        if (typeof successAction === 'function' && url === 'ais/portal/login') {
                            const { appId, authorization, userRelatedCompanyMap } = res.data.content;
                            const { hostname } = window.location;
                            Cookies.set('authorization', authorization, { domain: hostname.indexOf('.benefitech.cn') !== -1 ? '.benefitech.cn' : hostname });
                            clearAll();
                            write('appId', appId);
                            write('userRelatedCompanyMap', userRelatedCompanyMap);
                        }
                        if (isnotify && msgSuc !== false) {
                            notification.success({
                                key: '1',
                                message: '提示',
                                duration:2,
                                description: msgSuc || res.data.message,
                            });
                        }
                        if (callback && typeof callback === 'function') {
                            callback(res.data.content);
                            return false;
                        } else {

                            return typeof successAction === 'function' && (yield put(successAction({ data: res.data.content, status: true, params: data })));
                        }
                    }
                }

            } catch (e) {
                const { message } = e;
                if (message == 403) {
                    if (typeof jurisdictionAction === 'function') {
                        return yield put(jurisdictionAction(true));
                    } else {
                        notification.error({
                            key: '2',
                            duration:2,
                            message: '提示',
                            description: '暂无权限'
                        });
                        return false;
                    }
                } else {
                    // console.log('**报错捕获：**',message);
                    const reg = /[\u4e00-\u9fa5]/;
                    reg.test(message) && notification.error({
                        key: '2',
                        duration:2,
                        message: '提示',
                        description: message
                    });
                    return false;
                }
            }
        }
    }
}

export default {
    CALL_API: Symbol("Call API"),
    // 验证手机号码
    validFhone: (rule, value, callback) => {
        var telReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
        value
            ? telReg.test(value) == true ? callback() : callback('请输入正确的手机号码')
            : callback();
    },
     // 验证银行卡号
     validBankNo: (rule, value, callback) => {
        var bankReg = /^([1-9]{1})(\d{14}|\d{18})$/;
        value
            ? bankReg.test(value) == true ? callback() : callback('请输入正确的银行卡号')
            : callback();
    },
    // 验证非中文
    validCodeNoCh:(rule,value,callback,label)=>{
        let codeChReg=/[^\u4e00-\u9fa5]+/;
        value?codeChReg.test(value)==true?callback():callback(`请输入正确的${label}`):callback();
    },
    isvoid:(data,id,rule,obj,callback)=> {
        
        if( typeof obj.promotionNumber !=='number' || typeof obj.commission !=='number') {
            callback('请输入数字');
        } else {
            if( (obj.promotionNumber ===0 && data[0].commissionSectionId !== id) || (obj.commission === 0 && data[0].commissionSectionId !== id)) {
                callback('请输入大于0的数字');
            } else {
                let len = data.filter(v => v.promotionNumber === obj.promotionNumber && v.commissionSectionId !== id).length;
                if(len >0) {
                    callback('不能存在相同的区间');
                } else {
                    callback();
                }
            }
        }
        // (typeof obj.promotionNumber !=='number') || (typeof obj.commission !=='number') ? callback('请输入') : callback();
    },
    /**
     * 验证是否为全数字
     */
    isNumber:(rule,value,callback) => {
        var reg = /^\d+$/; 
        value 
            ? reg.test(value) === true ? callback() : callback('请输入数字')
            : callback(); 

    },
    /**
     * 验证是否为1-99的正整数
     */
    isIntegerNumber:(rule,value,callback) => {
        var reg = /^[1-9][0-9]?$/; 
        console.log(typeof(value))
        value 
            ? reg.test(parseInt(value)) === true ? callback() : callback('请输入数字')
            : callback(); 
    },
    // 隐藏手机号中间4位
    formatPhone (phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
    },
    // 隐藏身份证号中11位
    formatIdentity (number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
    },
    
    //分页
    pagination (data, callback) {
        return {
            onChange: current => {
                callback(current);
            },
            current: data.pageNum,
            pageSize: data.pageSize || 10,
            total: data.total,
            showTotal: () => {
                // return `共${data.total}条`;
            },
            showQuickJumper: data.showQuickJumper === false ? false : true,
            showSizeChanger: false,
            // showSizeChanger:data.showSizeChanger === false?false:true,
            hideOnSinglePage: true,
        };
    },
    //过去了多少天
    getBeforeDate (obj) {
        //计算现在时间 距离 过去一时间 相差多少天
        var today = new Date();
        var timerToday = today.getTime(); //获取现在 距离 标准时间 多少毫秒
        // console.log("现在时间:"+today+"<br />");

        //以 时间日期字符串 作为Date的参数
        var birthday = new Date(obj);
        var timerBirthday = birthday.getTime(); //得到那天 距离 标准时间 多少毫秒

        //要是深究的话，1990/1/1 没有写 时分秒，那么计算机的默认是什么呢？不知道诶
        //不知道怎么办呢？ 测试一下即可.
        // console.log("指定时间:" + birthday + "<br />");

        var dayNum = (timerToday - timerBirthday) / 1000 / 3600 / 24;
        // console.log("现在时间与指定时间距离:"+dayNum.toFixed(1)+" 天");
        return dayNum.toFixed(1);
    },
    /**
       *json转换为数组
       */
    jsonToMap (jsonStr) {
        const jsonObj = JSON.parse(jsonStr);
        let arr = [];
        for (let i in jsonObj) {
            arr.push({
                key: i,
                value: jsonObj[i],
            });
        }
        return arr;
    },
    /**
       *判断字符串是图片地址
       */
    checkIsImg (url) {
        let flag = false;
        if (url.match(/\.(jpeg|jpg|gif|png)/) != null) {
            flag = true;
        }
        return flag;
    },
    // 验证百分比0-99.99
    validPercent: (rule, value, callback) => {
        var telReg = /^([0-9][0-9]?)(\.\d{1,2})?$/;
        value
            ? telReg.test(value) == true ? callback() : callback('请输入正确的分值')
            : callback();
    },
    // 过滤文本中全部输入空格情况
    validSpace: (rule, value, callback) => {

        if (value && value.length > 0) {
            let valStr = value ? value.replace(/\s+/g, '') : '';
            valStr ? callback() : callback('请输入有效字符!');
        } else {
            callback();
        }
    },
    /**
     * 过滤文本中的所有空格
     */
    replaceSpace: (str) => {
        return str ? str.replace(/\s+/g, '') : '';
    },
    logger: (str) => {
        console.log(str);
    },
    /**
     * link方式传参 字符串转对象
     */
    linkParamsToObj: (searchParams) => {
        const paramsString = searchParams.split('?');
        const paramsArr = paramsString[1].split("&");
        let resLink = {};
        paramsArr.map(item => {
            let itemString = item.split('=');
            resLink[itemString[0]] = itemString[1];
        })
        return resLink;
    }
};
