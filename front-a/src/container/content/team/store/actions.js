import {
    TEAM_LIST_ACTION,TEAM_LIST,team_JUR,
    TEAM_DETAIL_ACTION,TEAM_DETAIL
} from './types.js';

/** 
 * 班组列表
 */
export const teamAction=(params)=>{
    return {
        type:TEAM_LIST_ACTION,
        payload:params
    }
}
export const teamList=(data)=>{
    return{
        type:TEAM_LIST,
        payloadList:data
    }
}

/** 
 * 班组详情
 */
export const teamDetailAction=(params)=>{
    return {
        type:TEAM_DETAIL_ACTION,
        payload:params
    }
}
export const detail=(data)=>{
    return{
        type:TEAM_DETAIL,
        payloadDetail:data
    }
}
//权限
export const controlJur = (data) => {
    return {
        type:team_JUR,
        payload:data
    }
}