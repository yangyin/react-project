import {
    EMPLOY_LIST,
    DEPARTMENT_LIST,
    PERSON_LIST,
    PERSON_ERROR,
    EMPLOY_LIST_JURISDICTION,
    ADD_EMPLOY,
    DELETE_EMPLOY,
    RELATED_PROJECT,
    EMPLOY_JUR_LIST,
    EMPLOY_JUR_LIST_ITEM_CHECKED_STATUS,
    EMPLOY_JUR_SAVE,
    EMPLOY_RELATE_PROJECT_LIST,
    RELATED_REMOVE, 
    RELATED_PROJECT_LIST, 
    PROJECT_ROLE,
    RELATED_ADD

} from './types';


const initState = {
    msg: '',
    isJurisdiction: false,//控制权限是否显示403页面
    staffList: [], //列表
    departList: [], //列表
    personList: [], //列表
    personListError: [],
    employAdd: false,
    employDelete: false,
    relatedList: {}, // 关联项目列表
    removeStatus: false, // 移除关联
    employJurList: [],//员工对应的权限列表
    customList:[],//自定义权限列表
    isUpdate:false,
    projectRole: [],
    relatedProjectList: [],
    addStatus: false, // 添加关联
}


export default function (state = initState, action) {
    switch (action.type) {
        case EMPLOY_RELATE_PROJECT_LIST: //自定义权限列表
            return { ...state,customList:action.payload.data};
        case EMPLOY_JUR_LIST_ITEM_CHECKED_STATUS: //修改employJurList中isSelecte字段
            const { parentId, permissionId } = action.payload;
            const data = state['employJurList'].map(f => {
                f['childList'].map(v => {
                    if (parentId === 'all') {
                        v.isSelected = `${Number(permissionId)}`
                    } else {
                        if (v.permissionId === permissionId) {
                            v.isSelected = v.isSelected === '0' ? '1':'0'
                        }
                    }
                    return v;
                })
                return f;
            })
            return { ...state, employJurList: data };
        case EMPLOY_JUR_LIST:
            return { ...state, employJurList: action.payload.data };
        case EMPLOY_JUR_SAVE:
            return { ...state,isUpdate:action.payload.status};
        case EMPLOY_LIST:
            return { ...state, msg: '', staffList: action.payload.data };
        case DEPARTMENT_LIST:
            return { ...state, msg: '', departList: action.payload.data };
        case PERSON_LIST:
            return { ...state, msg: '', personList: action.payload.data };
        case PERSON_ERROR:
            return { ...state, personList: null, personListError: action.payload };
        case EMPLOY_LIST_JURISDICTION:
            return { ...state, isJurisdiction: action.payload };
        case ADD_EMPLOY:
            return { ...state, employAdd: action.payload.status };
        case DELETE_EMPLOY:
            return { ...state, employDelete: action.payload.status };
        case RELATED_PROJECT:
            return { ...state, msg: '', relatedList: action.payload.data };
        case RELATED_REMOVE:
            return { ...state, removeStatus: action.payload.status};
        case RELATED_PROJECT_LIST:
            return { ...state, msg: '', relatedProjectList: action.payload.data };
        case PROJECT_ROLE:
            return { ...state, msg: '', projectRole: action.payload.data };
        case RELATED_ADD:
                return { ...state, addStatus: action.payload.status};
        default:
            return state;
    }
}