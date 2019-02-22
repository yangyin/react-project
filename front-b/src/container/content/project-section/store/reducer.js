import {
    PRO_SECTION_JURISDICTION,
  PROJECT_SECTION_LIST,
} from './types';

const initState = {
  msg: '',
  proSectionList: [],
  isJurisdiction: false, //控制权限是否显示403页面
};

export default function (state = initState, action) {
  switch (action.type) {
    case PROJECT_SECTION_LIST:
      return {...state, proSectionList: action.payload.data};
    case PRO_SECTION_JURISDICTION:
      return {...state, isJurisdiction: action.payload};
    default:
      return state;
  }
}
