import {
  PRO_COMPANY_JURISDICTION,
  PROJECT_COMPANY_LIST,
} from './types';

const initState = {
  msg: '',
  getCompanyList: [],
  isJurisdiction: false, //控制权限是否显示403页面
};

export default function (state = initState, action) {
  switch (action.type) {
    case PROJECT_COMPANY_LIST:
      return {...state, getCompanyList: action.payload.data};
    case PRO_COMPANY_JURISDICTION:
      return {...state, isJurisdiction: action.payload};
    default:
      return state;
  }
}
