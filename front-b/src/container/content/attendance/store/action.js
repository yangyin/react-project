
import { CALL_API } from '../../../../applyMiddleWare/request';
import { ATTENDANCE_LIST, ATTENDANCE_DETAIL, ATTENDANCE_JURISDICTION } from './types';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
    return { type: ATTENDANCE_JURISDICTION, payload: type };
};

/**
 * 获取考勤列表
 * @export
 * @param {*proId *signTime *pageSize *pageNum} opt 
 * @returns
 */
export function getAttendList (opt) {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/sign/getTeamBaseSignCountListNew',
            method: 'POST',
            data: { isShowLoading: true, params: opt },
            types: [ATTENDANCE_LIST, '', ATTENDANCE_JURISDICTION]
        }
    }
}
/**
 *
 * 考勤班组人员情况
 * @type A-未缺勤 B-缺勤 D-全部
 * @param {*proId *teamId *pageNum *pageSize *signTime *param *type} opt
 * @returns
 */
export function getAttendDetail (opt) {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/sign/selectPostedOrUnPost',
            method: 'POST',
            data: { isShowLoading: true, params: opt },
            types: [ATTENDANCE_DETAIL]
        }
    }
}