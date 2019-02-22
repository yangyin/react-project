
import { TEAM_MANAGEMENT_LIST, MEMBER_MANAGEMENT_LIST, TEAM_MANAGEMENT_LIST_JURISDICTION, GROUP_DELETE,TEAM_MANAGEMENT_SEARCH_LIST,TEAM_MANAGEMENT_SEARCH_FAIL ,TEAM_MANAGEMENT_SEARCH_ADD} from './types';

const initState = {
    isJurisdiction:false,//控制权限是否显示403页面
    groupDelete:false,//标记删除成功
    teamManagement: [],
    memberManagement:[],
    searchTeamList:[],//搜索班组列表
    isTeamAdd:false //添加班组成功时,刷新列表 
}


export default function (state=initState,action) {
    switch(action.type) {
        case TEAM_MANAGEMENT_LIST:
            return {...state, teamManagement: action.payload.data};
        case MEMBER_MANAGEMENT_LIST:
            return {...state, memberManagement: action.payload.data};
        case TEAM_MANAGEMENT_LIST_JURISDICTION:
            return { ...state,isJurisdiction:action.payload};
        case GROUP_DELETE:
            return { ...state, groupDelete: action.payload.status};
        case TEAM_MANAGEMENT_SEARCH_LIST:
            return { ...state,searchTeamList:action.payload.data}; 
        case TEAM_MANAGEMENT_SEARCH_FAIL:
            return { ...state,searchTeamList:[]};
        case TEAM_MANAGEMENT_SEARCH_ADD:
            return {...state,isTeamAdd:action.payload.status};
        default:
            return state;
    }
}