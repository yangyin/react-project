
import { 
    PROJECT_ACTION,PROJECT_LIST,
    PROJECT_DETAIL_ACTION,PROJECT_DETAIL_SUCCESS,
    COMPANY_UNIT_ACTION,COMPANY_UNIT_LIST,
    UNIT_EMPLOYEE_ACTION,UNIT_EMPLOYEE_LIST,
    UNIT_TEAM_ACTION,UNIT_TEAM_LIST,
    UNIT_WORKER_ACTION,UNIT_WORKER_LIST,
    PROJECT_LIST_JURISDICTION
} from './types';

//获取项目列表
export const projectAction = (params) =>{
    return {
        type:PROJECT_ACTION,
        payload:params
    }
}

export const projectList = (data) =>{
    return {
        type:PROJECT_LIST,
        payload:data
    }
}
//获取项目详情
export const projectDetailAction = (params) =>{
    return {
        type:PROJECT_DETAIL_ACTION,
        payload:params
    }
}

export const projectDetailSuccess = (data) =>{
    return {
        type:PROJECT_DETAIL_SUCCESS,
        payload:data
    }
}

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: PROJECT_LIST_JURISDICTION, payload:type}
}
/**
 * 详情页面
 */
//获取参见单位列表
export const companyAction = (params) =>{
    return {
        type:COMPANY_UNIT_ACTION,
        payload:params
    }
}

export const companyList = (data) =>{
    return {
        type:COMPANY_UNIT_LIST,
        payload:data
    }
}

//获取参见单位人员
export const unitEmployeeAction = (params) =>{
    return {
        type:UNIT_EMPLOYEE_ACTION,
        payload:params
    }
}

export const unitEmployeeList = (data) =>{
    return {
        type:UNIT_EMPLOYEE_LIST,
        payload:data
    }
}

//获取参见单位人员
export const unitTeamAction = (params) =>{
    return {
        type:UNIT_TEAM_ACTION,
        payload:params
    }
}

export const unitTeamList = (data) =>{
    return {
        type:UNIT_TEAM_LIST,
        payload:data
    }
}

//获取参见工人列表
export const unitWorkerAction = (params) =>{
    return {
        type:UNIT_WORKER_ACTION,
        payload:params
    }
}

export const unitWorkerList = (data) =>{
    return {
        type:UNIT_WORKER_LIST,
        payload:data
    }
}


