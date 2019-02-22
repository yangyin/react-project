import { PROJECT_LIST_SUCCESS, UPDATE_PRO_ID } from './types';



const initState = {
    proId: '',//当前项目ID
    proName: '',//当前项目名称
    doingTotal: 0,//进行中项目总数
    doingPageCount: 1,//进行中项目总页数
    doingProjectList: [], //进行中项目列表
    doneTotal: 0,//已竣工项目总数
    donePageCount: 1,//已竣工项目总页数
    doneProjectList: [],//已竣工项目列表
    prepareTotal:0,//准备项目总数
    preparePageCount:1,//准备项目总页数
    prepareProjectList:[]//准备项目列表
}

export default (state = initState, action) => {
    switch (action.type) {
        case PROJECT_LIST_SUCCESS:
            // console.log(action.payload)
            // return { ...state, doingProjectList: action.payload.data.rows };
            const { doingTotal, doingPageCount, doneTotal, donePageCount, doingProjectList, doneProjectList,prepareTotal,preparePageCount,prepareProjectList } = action.payload.data;
            const { doingPageNum, donePageNum,preparePageNum } = action.payload.params;
            return {
                ...state,
                doingTotal,
                doingPageCount,
                doneTotal,
                donePageCount,
                prepareTotal,
                preparePageCount,
                doingProjectList: doingPageNum === 1 ? doingProjectList : [...state.doingProjectList, ...doingProjectList],
                doneProjectList: donePageNum === 1 ? doneProjectList : [...state.doneProjectList, ...doneProjectList],
                prepareProjectList: preparePageNum === 1 ? prepareProjectList : [...state.prepareProjectList, ...prepareProjectList]
            };
        case UPDATE_PRO_ID:
            return { ...state, proId: action.payload.id, proName: action.payload.name };
        default:
            return state;
    }
}