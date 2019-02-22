import { DASHBOARD_MY_TEAM, DASHBOARD_LIST_JURISDICTION, CREATE_PROJECT,DASHOBADR_LIST_INIT } from './types';
import { CALL_API } from '../../../../applyMiddleWare/request';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = (type) => {
    return { type: DASHBOARD_LIST_JURISDICTION, payload:type}
}

// 页面初始化数据
export function initDashboardTeam() {
    return {
        [CALL_API]: {
            url:'/sdpbusiness/project/homepage',
            method:'POST',
            data:{params:{}},
            types:[DASHBOARD_MY_TEAM,'', DASHBOARD_LIST_JURISDICTION]
        }
    }
}

// 创建项目
export function createProject(options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/addProject',
            method:'POST',
            data:{isShowLoading:true, params: options},
            isnotify: true,
            msgErr: '项目创建失败!',
            msgSuc: '项目创建成功！',
            types:[CREATE_PROJECT]
        }
    }
}

/**
 * 更新创建项目成功状态
 * @param {boolean} bool 
 */
export const createProjectStatus = (bool) => {
    return { type: CREATE_PROJECT, payload:{status:bool}};
}

//改版后列表

export function getBulletedListAction() {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/bulletedList',
            method:'POST',
            data:{isShowLoading:true},
            isnotify: true,
            msgSuc: '',
            types:[DASHOBADR_LIST_INIT]
        }
    }
}
