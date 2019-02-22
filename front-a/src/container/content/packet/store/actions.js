import { 
    PACKET_LIST_ACTION,
    PACKET_LIST_SUCCESS,
    PACKET_SELECT_COMISSON_ACTION,
    PACKET_SELECT_COMISSON_SUCCESS,
    PACKET_SELECT_COMISSON_DELETE,
    PACKET_SELECT_COMISSON_ADD,
    PACKET_SELECT_COMISSON_UPDATE,
    PACKET_SELECT_COMISSON_UPDATE_SUC,
    PACKET_JUR
} from './types';


//佣金报表、发放报表+分页+筛选
export const getPacketListAction = (params) => {
    return {
        type:PACKET_LIST_ACTION,
        payload:params
    }   
}
export const getPacketListSuc = (data) => {
    return {
        type:PACKET_LIST_SUCCESS,
        payload:data
    }   
}

//佣金设置展示
export const getSelectComissonAction = () => {
    return {
        type:PACKET_SELECT_COMISSON_ACTION
    }   
}
export const getSelectComissonSuc = (data) => {
    return {
        type:PACKET_SELECT_COMISSON_SUCCESS,
        payload:data
    }   
}

//删除
export const selectComissionDel = (id) => {
    return {
        type:PACKET_SELECT_COMISSON_DELETE,
        payload:id
    }
}

//新增
export const selectComissionAdd = (params) => {
    return {
        type:PACKET_SELECT_COMISSON_ADD,
        payload:params
    }
}

//修改
export const selectComissionUpdate = (params) => {
    return {
        type:PACKET_SELECT_COMISSON_UPDATE,
        payload:params
    }
}

export const selectComissionUpdateSuc = (data) => {
    return {
        type:PACKET_SELECT_COMISSON_UPDATE_SUC,
        payload:data
    }
}

//权限
export const packetJur = (data) => {
    return {
        type:PACKET_JUR,
        payload:data
    }
}

