import {
  ASSISTANT_INFORM_JURISDICTION,
  INFORM_DETAIL_INFORMOBJ_LIST,
  INFORM_DETAIL_SELUSER,
  INFORM_DETAIL_SELROLE,
  ASSISTANT_INFORM_LIST,
  ASSISTANT_INFORM_ERROR,
  INFORM_DETAIL_LIST,
  INFORM_DETAIL_TITLE,
} from './types';
import {CALL_API} from '@/applyMiddleWare/request';

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
  return {type: ASSISTANT_INFORM_JURISDICTION, payload: type};
};

//获取通知助手列表
export function getAssistantList () {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/getNoticeProgrammeList',
      method: 'POST',
      data: {isShowLoading: true},
      types: [
        ASSISTANT_INFORM_LIST,
        ASSISTANT_INFORM_ERROR,
        ASSISTANT_INFORM_JURISDICTION,
      ],
    },
  };
}
/**
 * 复制通知助手
 * @param {*} copyNotProId 
 * @param {*} notProName 
 * @param {*} notProRemark 
 */
export function copyInform (opt) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/copyNoticeProgramme',
      method: 'POST',
      data: {params: opt},
      types: ['', ASSISTANT_INFORM_ERROR],
      isnotify: true,
      msgSuc:'复制成功',
      callback: (data, dispatch) => {
        dispatch (getAssistantList ());
      },
    },
  };
}
/**
 * 删除通知方案
 * @param {*} notProId 
 */
export function deleteInform (option) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/deleteNoticeProgramme',
      method: 'POST',
      data: {params: option},
      types: ['', ASSISTANT_INFORM_ERROR],
      isnotify: true,
      msgSuc:'删除成功',
      callback: (data, dispatch) => {
        dispatch (getAssistantList ());
      },
    },
  };
}
/**
 * 更新
 * @param {*} id 
 * @param {*} notProName 
 * @param {*} notProRemark 
 */
export function updateInform (option) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/updateNoticeProgramme',
      method: 'POST',
      data: {isShowLoading: true, params: option},
      types: ['', ASSISTANT_INFORM_ERROR, ASSISTANT_INFORM_JURISDICTION],
      isnotify: true,
      msgSuc:'编辑成功',
      callback: (data, dispatch) => {
        dispatch (getAssistantList ());
      },
    },
  };
}
/** 
 * 通知详情标题名称
 * @param notProId
 * */
export function getDetailTitle (option) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/noticeProgrammeName',
      data: {
        isShowLoading: false,
        params: option,
      },
      types: [
        INFORM_DETAIL_TITLE,
        ASSISTANT_INFORM_ERROR,
        ASSISTANT_INFORM_JURISDICTION,
      ],
    },
  };
}
/** 
 * 通知详情列表
 * @param notProId
 * */
export function getDetailList (options) {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/noticeProgramme/selectNoticeProgrammeDetail',
      method: 'POST',
      data: {
        isShowLoading: true,
        params: options,
      },
      types: [
        INFORM_DETAIL_LIST,
        ASSISTANT_INFORM_ERROR,
        ASSISTANT_INFORM_JURISDICTION,
      ],
    },
  };
}
/** 
 * 通知详情 添加授权对象
 * @param programmedReId 通知方案事件id
 * @param targetd 通知对象id
 * @param targetType 通知对象类型
 * */
export function addTarget (options) {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/noticeProgramme/addTargetButton',
      method: 'POST',
      data: {
        isShowLoading: true,
        params: options,
      },
      types: ['', ASSISTANT_INFORM_ERROR],
      isnotify: true,
      msgSuc:'操作成功',
    },
  };
}
/** 
 * 通知详情 获取项目角色
 * @param programmedReId 通知方案事件id
 * */
export function getRoleList (options) {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/noticeProgramme/selectRole',
      data: {
        isShowLoading: true,
        params: options,
      },
      types: [
        INFORM_DETAIL_SELROLE,
        ASSISTANT_INFORM_ERROR
      ],
    },
  };
}
/** 
 * 通知详情 搜索某一用户
 * @param programmedReId 通知方案事件id
 * @param param 搜索值
 * @param type 0查平台用户 1查企业员工
 * */
export function getSelectUser (options) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/selectOne',
      data: {
        isShowLoading: true,
        params: options,
      },
      types: [
        INFORM_DETAIL_SELUSER,
        ASSISTANT_INFORM_ERROR,
        ASSISTANT_INFORM_JURISDICTION,
      ],
    },
  };
}
/** 
 * 通知详情 获取当前通知对象
 * @param programmedReId: 通知方案事件id
 * */
export function getInformObjList (options) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/noticeProgramme/deletetargetdNameList',
      method: 'POST',
      data: {
        isShowLoading: true,
        params: options,
      },
      types: [
        INFORM_DETAIL_INFORMOBJ_LIST,
        ASSISTANT_INFORM_ERROR
      ],
    },
  };
}
/** 
 * 通知详情 删除通知对象
 * @param idList: 关联对象id
 * */
export function deleteInformRelation (options) {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/noticeProgramme/deleteTatgetButton',
      data: {
        isShowLoading: true,
        params: options,
      },
      types: ['', ASSISTANT_INFORM_ERROR],
    },
  };
}
