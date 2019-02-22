import {
  FIND_PROJECT_TYPELIST,
  FIND_PROJECT_SORTLIST,
  SECTION_MANAGER_LIST,
  SEL_COMPANYTYPE_LIST,
  FIND_PROJECT_TAG,
  LIST_COMPANY_BELONG,
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
  FIELD_JURISDICTION
} from './types';

const initState = {
    isFieldJurisdiction: false, ////控制权限是否显示403页面
    sectionList: [], //标段
    proLeaderList: [], //负责人
    proManageList: [], //项目负责人
    dictionaryList: [], //工程量单位
    workTypeList: [], //计划工种
    selectUserList: [], //角色成员列表
    selectCompanyList: [], //参建单位列表
    planAboutList: {}, //相关计划列表
    workType: [], // 工种类型
    companyStaffList: [], //公司员工
    companyBelongList: [], //所属单位
    projectTagList: [], //项目标签
    projectTypeList: [], //项目类型
    projectSortList: [], //项目类别
    selCompanyType: [], //公司类型
    selSectionManager: [], //班组标段负责人
};

export default (state = initState, action) => {
  switch (action.type) {
    case TASK_LIST_SUCCESS:
      return {...state, sectionList: action.payload.data};
    case PRO_LEADER_SUCCESS:
      return {...state, proLeaderList: action.payload.data};
    case MANAGE_LEADER_SUCCESS:
      return {...state, proManageList: action.payload.data};
    case FIND_DICTIONART_SUCCESS:
      return {...state, dictionaryList: action.payload.data};
    case FIND_WORK_TYPE_SUCCESS:
      return {...state, workTypeList: action.payload.data};
    case USER_BY_PHONE:
      return {...state, selectUserList: action.payload.data};
    case SEL_COMPANY_ORGENT:
      return {...state, selectCompanyList: action.payload.data};
    case SEL_PLAN_ABOUT:
      return {...state, planAboutList: action.payload.data};
    case WORK_TYPE_LIST:
      return {...state, workType: action.payload.data};
    case LIST_COMPANY_STAFF:
      return {...state, companyStaffList: action.payload.data};
    case LIST_COMPANY_BELONG:
      return {...state, companyBelongList: action.payload.data};
    case FIND_PROJECT_TAG:
      return {...state, projectTagList: action.payload.data};
    case FIND_PROJECT_TYPELIST:
      return {...state, projectTypeList: action.payload.data};
    case FIND_PROJECT_SORTLIST:
      return {...state, projectSortList: action.payload.data};
    case SEL_COMPANYTYPE_LIST:
      return {...state, selCompanyType: action.payload.data};
    case SECTION_MANAGER_LIST:
      return {...state, selSectionManager: action.payload.data};
    case FIELD_JURISDICTION:
      return { ...state, isFieldJurisdiction:action.payload};
    default:
      return state;
  }
};
