import { LOGGER_INIT,LOGGER_JURISDICTION } from './type';
import { CALL_API } from '@/applyMiddleWare/request';


/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
    return { type: LOGGER_JURISDICTION, payload: type };
};

/**
 * 平台日志列表
 * @param {*pageNum}
 * @param {*pageSize} 
 * @param {*type} 0-最近一个月 1-选择时间
 * @param {*param} 写死：y87VPvwADQTIZgl8bbb
 * @param {*startTime} 开始时间
 * @param {*endTime} 结束时间
 */
export const getLoggerListAction = option => {
    return {
        [CALL_API]: {
            url: 'sdpbusiness/user/findPlatformLogForNew',
            method:'POST',
            data: { isShowLoading: false, params: option },
            types: [LOGGER_INIT,'',LOGGER_JURISDICTION],
        }
    }
};