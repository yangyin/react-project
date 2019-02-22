
import {
  FIND_PROJECT_TYPELIST,
  FIND_PROJECT_SORTLIST,
  SEL_PLAN_ABOUT,
  TASK_LIST_SUCCESS,
  PRO_LEADER_SUCCESS,
  MANAGE_LEADER_SUCCESS,
  FIND_DICTIONART_SUCCESS,
  FIND_WORK_TYPE_SUCCESS,
  USER_BY_PHONE,
  SEL_COMPANY_ORGENT,
  WORK_TYPE_LIST,
  LIST_COMPANY_STAFF,
  LIST_COMPANY_BELONG,
  FIND_PROJECT_TAG,
  SEL_COMPANYTYPE_LIST,
  SECTION_MANAGER_LIST,
  FIELD_JURISDICTION
} from './types';
import {CALL_API} from '@/applyMiddleWare/request';

/**
 * 查询班组负责人
 * @param proId: 0152
 * @param phone: 李宪惠
 **/
export function getSectionManager (options) {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/project/findProManager',
      data: {isShowLoading: false, params: options},
      types: [SECTION_MANAGER_LIST],
    },
  };
}
/**
 * 查询标段
 * 参数${id} 项目id
 **/
export function getSectionList (id) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/task/sectionList',
      method: 'POST',
      data: {isShowLoading: false, params: {proId: id}},
      types: [TASK_LIST_SUCCESS],
    },
  };
}

/**
 * 查询负责人
 * ${id} 项目ID
 * ${param} 姓名或电话号码
 */
export function getProAddressBook (id) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/task/findProAddressBook',
      method: 'POST',
      data: {isShowLoading: false, params: {proId: id}},
      types: [PRO_LEADER_SUCCESS],
    },
  };
}
/**
 * 查询项目负责人
 * options：{queryStr：查询条件, proId: 项目id}  
 */
export function getManagerList (options) {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/project/managerList',
      method: 'POST',
      data: {isShowLoading: false, params: options},
      types: [MANAGE_LEADER_SUCCESS,'',FIELD_JURISDICTION],
    },
  };
}
/**
 * 查询工程量单位
 */
export const findDictionaryList = () => {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/dictionaries/findDictionaryList',
      data: {isShowLoading: false, params: {dicType: 'JLDW'}},
      types: [FIND_DICTIONART_SUCCESS],
    },
  };
};
/**
 * 查询项目下的相关sel
 * @param dicType  
 *  标签 XMBQ[FIND_PROJECT_TAG], 
 * 项目类别 XMLB[FIND_PROJECT_TYPELIST],  
 * 项目类型 XMLX[FIND_PROJECT_SORTLIST],
 * @param proId: 0152
 */
export const findProTagList = option => {
  let typeValue = FIND_PROJECT_TAG;
  switch (option.dicType) {
    case 'XMBQ':
      typeValue = FIND_PROJECT_TAG;
      break;
    case 'XMLB':
      typeValue = FIND_PROJECT_SORTLIST;
      break;
    case 'XMLX':
      typeValue = FIND_PROJECT_TYPELIST;
      break;
    default:
      break;
  }
  return {
    [CALL_API]: {
      url: '/sdpbusiness/project/findDictionaryList',
      data: {isShowLoading: false, params: option},
      types: [typeValue],
    },
  };
};

/**
 * 计划工种
 */
export const findWorkTypeList = type => {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/dictionaries/findDictionaryList',
      data: {isShowLoading: false, params: {dicType: type}},
      types: [FIND_WORK_TYPE_SUCCESS],
    },
  };
};

/**
 * 搜索角色成员列表 
 * ${userPhone} 用户名字或者电话号码
 */
export const selectUserByUserPhone = params => {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/roleRelation/selectUserByUserPhone',
      method: 'POST',
      data: {isShowLoading: false, params},
      types: [USER_BY_PHONE],
    },
  };
};
/**
 * 查询公司对应参建单位
 * @param type A:查参建单位 B：查单位代理人
 * @param param 没有参数传空字符串
 * @param companyType 单位类型id
 */
export const selectcompanyName = params => {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/project/selectCompanyOrAgent',
      method: 'POST',
      data: {isShowLoading: false, params},
      types: [SEL_COMPANY_ORGENT],
    },
  };
};
/**
 * 相关计划 
 * @param proId
 * @param paramName 负责人或计划名称
 */

export const selectPlanList = params => {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/task/selectPlanRelationByParam',
      method: 'POST',
      data: {isShowLoading: false, params},
      types: [SEL_PLAN_ABOUT],
    },
  };
};

/**
 * 获取工种类型
 * @param proId
 * @param paramName 负责人或计划名称
 */
export function getWorkType () {
  return {
    [CALL_API]: {
      url: 'sdpbusiness/dictionaries/findTeamType',
      data: {params: {dicType: 'worktype'}},
      types: [WORK_TYPE_LIST],
    },
  };
}
/**
 * 所属单位
 * @param param 单位名称
 */
export function getBelongCompany (option) {
  return {
    [CALL_API]: {
      url: '/sdpbusiness/project/getBelongCompany',
      data: {params: option},
      method: 'POST',
      types: [LIST_COMPANY_BELONG],
    }
  };
}
/**
 * 获取公司员工
 * @param {*} 无参数 
 */
export const getStaffList = () => {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/businessPge/selectCompanyEmpList',
            data: {isShowLoading: false},
          method: 'POST',
          types: [LIST_COMPANY_STAFF],
        },
      };
};
/**
 * 获取单位类型下拉
 * @param {*} proId 
 */
export const getSelCompanyType = () => {
    return {
        [CALL_API]: {
            url: '/sdpbusiness/project/selectCompanyTypeList',
            data: {isShowLoading: false},
          method: 'POST',
          types: [SEL_COMPANYTYPE_LIST],
        },
      };
};

/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const fieldJurisdictionStatus = (type) => {
    return { type: FIELD_JURISDICTION, payload:type}
}
