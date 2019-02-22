import {
    PLATFROM_MANAGE_JUR_LIST,
    PLATFROM_MANAGE_JURISDICTION,
    PLATFROM_MANAGE_JUR_DEPT,
    PLATFROM_MANAGE_JUR_SEARCH,
    PLATFROM_MANAGE_JUR_SEARCH_CLEAR,
    PLATFROM_MANAGE_JUR_STATUS,
    PLATFROM_MANAGE_JUR_INIT_LIST,
    PLATFROM_MANAGE_DELLIST_INIT
} from './types';


const initState = {
    jurList: [],//权限列表
    msg: '',
    isJurisdiction: false,//控制权限是否显示403页面
    deptList:[],//授权时，部门数据
    searchList:[],//授权时，账户 或者 员工数据
    delList:{},//删除对象列表，初始化
    isUpdate:false
}


export default function (state = initState, action) {
    switch (action.type) {
        case PLATFROM_MANAGE_JUR_LIST:
            return { ...state, jurList: action.payload.data.content };
        case PLATFROM_MANAGE_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        case PLATFROM_MANAGE_JUR_DEPT://部门数据
            return {...state,deptList:action.payload.data};
        case PLATFROM_MANAGE_JUR_SEARCH://账户或员工数据
            return {...state,searchList:action.payload.data};
        case PLATFROM_MANAGE_JUR_SEARCH_CLEAR://账户或员工数据 情空
            return {...state,searchList:[]};
        case PLATFROM_MANAGE_JUR_STATUS://是否刷新数据
            return {...state,isUpdate:action.payload.status};
        case PLATFROM_MANAGE_JUR_INIT_LIST://删除对象初始化列表
            return {...state,delList:action.payload.data}
        case PLATFROM_MANAGE_DELLIST_INIT://还原dellist的数据
            return {...state,delList:{}};
        default:
            return state;
    }
}