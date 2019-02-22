import { 
    INFO_ASSISTANT_LIST_ACTION,
    INFO_ASSISTANT_LIST_SUCCESS,
    INFO_ASSISTANT_EDIT_ACTION,
    INFO_ASSISTANT_UPDATE,
    INFO_ASSISTANT_JUR
} from './types';

//列表
export const getInfoAssListAction = () => {
    return {
        type:INFO_ASSISTANT_LIST_ACTION
    };
}
export const getInfoAssListSuccess = (data) => {
    return {
        type:INFO_ASSISTANT_LIST_SUCCESS,
        payload:data
    };
}

//编辑，复制,删除
export const infoAssistantEditAction = (params) => {
    return {
        type:INFO_ASSISTANT_EDIT_ACTION,
        payload:params
    };
}

//更新成功
export const infoAssistantUpdate = (data) => {
    return {
        type:INFO_ASSISTANT_UPDATE,
        payload:data
    };
}

//权限
export const infoAssistantJur = (data) => {
    return {
        type:INFO_ASSISTANT_JUR,
        payload:data
    };
}