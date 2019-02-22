
import { 
    EMPLOY_GROUP_LIST, EMPOLY_MEMBER_LIST, 
    EMPLOY_GROUP_JURISDICTION, EMPOLY_GROUP_DELETE,
    GROUP_SEARCH_LIST,GROUP_SEARCH_FAIL ,
    GROUP_SEARCH_ADD
} from './types';

const initState = {
    isJurisdiction:false,//控制权限是否显示403页面
    groupDelete:false,//标记删除成功
    employGroup: [],
    EmployMemberManagement:[],
    searchGroupList:[],//搜索班组列表
    isTeamAdd:false //添加班组成功时,刷新列表 
}


export default function (state=initState,action) {
    switch(action.type) {
        case EMPLOY_GROUP_LIST:
            return {...state, employGroup: action.payload.data};
        case EMPOLY_MEMBER_LIST:
            return {...state, EmployMemberManagement: action.payload.data};
        case EMPLOY_GROUP_JURISDICTION:
            return { ...state,isJurisdiction:action.payload};
        case EMPOLY_GROUP_DELETE:
            return { ...state, groupDelete: action.payload.status};
        case GROUP_SEARCH_LIST:
            return { ...state,searchGroupList:action.payload.data}; 
        case GROUP_SEARCH_FAIL:
            return { ...state,searchTeamList:[]};
        case GROUP_SEARCH_ADD:
            return {...state,isTeamAdd:action.payload.status};
        default:
            return state;
    }
}