
import { 
    SAAS_MANAGEMENT_ACTION,SAAS_MANAGEMENT_LIST,
    HARDWARE_CODE_ACTION,HARDWARE_CODE_LIST,
    HARDWARE_REGISTER_ACTION,ADD_HARDWARE_REGISTER,
    HARDWARE_MONITORING_ACTION,HARDWARE_MONITORING_LIST,
    SAAS_OPERATION_ACTION,SAAS_OPERATION_SUCCESS,
    JOB_CARD_ACTION,JOB_CARD_LIST,
    SAAS_JURISDICTION,
    SEARCH_PRO_ACTION, SEARCH_PRO_LIST,
    RELATED_PRO_ACTION, RELATED_PRO_SUCCESS
} from './types';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: SAAS_JURISDICTION, payload:type}
};


// 获取已注册设备列表
export const saasManagementAction = (params) =>{
    return {
        type:SAAS_MANAGEMENT_ACTION,
        payload:params
    };
};

export const saasManagementList = (data) =>{
    return {
        type:SAAS_MANAGEMENT_LIST,
        payload:data
    };
};

// 获取设备code
export const hardwareCodeAction = (data) =>{
    return {
        type:HARDWARE_CODE_ACTION,
        payload:data
    };
};

export const hardwareCodeList = (data) =>{
    return {
        type:HARDWARE_CODE_LIST,
        payload:data
    };
};

// 提交注册设备信息
export const hardwareRegisterAction = (data) =>{
    return {
        type:HARDWARE_REGISTER_ACTION,
        params:data
    };
};

export const addHardwareRegister = (data) =>{
    return {
        type:ADD_HARDWARE_REGISTER,
        payload:data
    };
};

// 操作设备
export const saasOperationAction = (data) =>{
    return {
        type:SAAS_OPERATION_ACTION,
        params:data
    };
};

export const saasOpreationSuccess = (data) =>{
    return {
        type:SAAS_OPERATION_SUCCESS,
        payload:data
    };
};

// 获取硬件监控列表
export const saasMonitoringAction = (params) =>{
    return {
        type:HARDWARE_MONITORING_ACTION,
        options:params
    };
};

export const saasMonitoringList = (data) =>{
    return {
        type:HARDWARE_MONITORING_LIST,
        payload:data
    };
};

// 获取硬件监控列表
export const jobCardAction = (params) =>{
    return {
        type:JOB_CARD_ACTION,
        options:params
    };
};

export const jobCardList = (data) =>{
    return {
        type:JOB_CARD_LIST,
        payload:data
    };
};
// 注册管理关联项目查询项目列表
export const searchProAction = (params) =>{
    return {
        type:SEARCH_PRO_ACTION,
        options:params
    };
};
export const searchProList = (data) =>{
    return {
        type:SEARCH_PRO_LIST,
        payload:data
    };
};
// 添加关联
export const addRelatedAction = (data) =>{
    return {
        type:RELATED_PRO_ACTION,
        params:data
    };
};

export const addRelatedSuccess = (data) =>{
    return {
        type:RELATED_PRO_SUCCESS,
        payload:data
    };
};