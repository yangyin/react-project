import {ATTENDANCE_INFO_SUCCESS} from './types.js';
import { CALL_API } from '../../../../applyMiddleWare/request';
/**
 *获取项目到岗人数/未到岗/场内人数
 * type A-到岗 B-未到岗 C-场内人数
 * @export
 * @param {*proId *signTime	*pageNum *pageSize *type} opts
 * @returns
 */
export function getAttendInfoList(opts){
    return{
        [CALL_API]: {
            url:'/sdpbusiness/sign/selectPostedOrUnPostByProId',
            method:'POST',
            data:{isShowLoading:true,params:opts},
            types:[ATTENDANCE_INFO_SUCCESS]
        }
    }
}