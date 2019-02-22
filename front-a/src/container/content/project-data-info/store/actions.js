import { 
    PROJECT_DATA_INFO_ACTION,
    PROJECT_DATA_INFO,
} from './types';

//请求类型列表
export const dataAction = (params) => {
    return {
        type:PROJECT_DATA_INFO_ACTION,
        payload:params,
    };
}
export const dataSuccess = (data) => {
    return {
        type:PROJECT_DATA_INFO,
        payload:data,
    };
}