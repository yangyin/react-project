import {PRO_QUALITY_JURISDICTION,QUALITY_LIST, QUALITY_ADD, QUALITY_MARK} from './types';

const initState = {
    isJurisdiction:false,//控制权限是否显示403页面
  qualityList: {}, //任务计划列表
  isMark: false, //控制是否关闭新增或者编辑 弹窗,
  // planDetail:{},//当前数据详情
};

export default (state = initState, action) => {
  switch (action.type) {
    case QUALITY_LIST:
      return {...state, qualityList: action.payload.data};
    case QUALITY_ADD:
      return {...state, isMark: false};
    case QUALITY_MARK:
      return {...state, isMark: action.payload};
    case PRO_QUALITY_JURISDICTION:
      return {...state, isJurisdiction: action.payload};
    default:
      return state;
  }
};
