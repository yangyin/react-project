import {UNIT_LIST_ADD, UNIT_LIST_REMOVE, UNIT_EMPLOY_LIST, UNIT_TEAM_LIST, UNIT_WORKER_LIST } from './types';



const initState = {
    unitListAdd: false, // 添加单位
    unitListRemove: false, // 添加单位
    unitEmployList: [], // 单位人员列表
    unitTeamList: [], // 单位班组列表
    unitWorkerList: [] // 单位班组工人列表
}

export default (state = initState, action) => {
    switch (action.type) {
        case UNIT_LIST_ADD:
            return { ...state, unitListAdd: action.payload.status};
        case UNIT_LIST_REMOVE:
            return { ...state, unitListRemove: action.payload.status};
        case UNIT_EMPLOY_LIST:
            return { ...state, unitEmployList: action.payload.data};
        case UNIT_TEAM_LIST:
            return { ...state, unitTeamList: action.payload.data};
        case UNIT_WORKER_LIST:
            return { ...state, unitWorkerList: action.payload.data};
        default:
            return state;
    }
}