
import { ROLE_LIST_SCCUESS,ROLE_DETAIL_LIST ,IS_ADD_BISS_USER_ROLE,UPDATE_BISS_USER_ROLE,ROLE_LIST_JURISDICTION,ROLE_UPDATE_SCCUESS} from './types';

const initState = {
    roleList:[],
    roleDetails:{},
    isAddBissUserRole:false, //添加成员是否成功
    isUpdateBissUserRole:false, // 冻结、解冻、移除角色成员是否成功
    isJurisdiction:false,//控制权限是否显示403页面
    isUpdateRole:false, //编辑/删除项目角色状态
}


export default function (state=initState,action) {
    switch(action.type) {
        case ROLE_LIST_SCCUESS:
            return { ...state,roleList:action.payload.data};
        case ROLE_UPDATE_SCCUESS:
            return {...state,isUpdateRole:action.payload.status};
        case ROLE_DETAIL_LIST:
            return { ...state,roleDetails:action.payload.data};
        case IS_ADD_BISS_USER_ROLE:
            return {...state,isAddBissUserRole:action.payload.status};
        case UPDATE_BISS_USER_ROLE:
            return {...state,isUpdateBissUserRole:action.payload.status};
        case ROLE_LIST_JURISDICTION:
            return {...state,isJurisdiction:action.payload};
        default:
            return state;
    }
}