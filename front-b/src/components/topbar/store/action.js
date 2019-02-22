import { PROJECT_LIST_SUCCESS,UPDATE_PRO_ID } from './types';
import { CALL_API } from '@/applyMiddleWare/request';
//获取项目列表
export function getProjectList(params) {
    return {
        [CALL_API]: {
            // url:'sdpbusiness/project/selectProjectPageInfo',            
            url:'sdpbusiness/project/projectDropdownList',
            method:'POST',
            data:{params},
            // data:{params:{pageNum:1,pageSize:50}},
            isnotify:false,
            callback:(data,dispatch,params) => {
                dispatch({ type: PROJECT_LIST_SUCCESS, payload: {data,status:true,params}} );
            }
        }
    }
}

export function updateProId(id,name) {
    return {type:UPDATE_PRO_ID,payload:{id,name}};
}