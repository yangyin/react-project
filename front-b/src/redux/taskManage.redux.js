import axios from 'axios';
import Axios from './../utils/axios';

const RESPONSIBLE_PERSON_SUCCESS = 'RESPONSIBLE_PERSON_SUCCESS';
const BIDS_SUCCESS = 'BIDS_SUCCESS';
const TEAMLIST = 'TEAMLIST';
const TASKLIST = 'TASKLIST';
const TASKSTATUS = 'TASKSTATUS';
const LIST = 'LIST';

const initState = {
    msg: '',
    responsibleList: [], //负责人
    bidsList: [],//所属标段
    teamList: [],//项目班组
    taskList: [],//任务类型
    taskStatus: [],//任务状态
    manageList: {}, //列表
}

export function taskManage(state = initState, action) {

    switch (action.type) {
        case RESPONSIBLE_PERSON_SUCCESS:
            return { ...state, msg: '', responsibleList: action.payload };
        case BIDS_SUCCESS:
            return { ...state, msg: '', bidsList: action.payload };
        case TEAMLIST:
            return { ...state, msg: '', teamList: action.payload };
        case TASKLIST:
            return { ...state, msg: '', taskList: action.payload };
        case TASKSTATUS:
            return { ...state, msg: '', taskStatus: action.payload };
        case LIST:
            return { ...state, msg: '', manageList: action.payload };
        default:
            return state;
    }

}

// 错误信息处理
function errorMsg(msg) {
    // console.log(msg)
    // return {type:ERROR_MSG,payload:msg};
}


// 页面初始化数据
export function taskManageAll() {
    return async dispatch => {
        try {
            const listAll = [
                Axios.post({ url: '/sdpbusiness/task/selectTaskManager', data: { params: { proId: '0027' } } }),
                Axios.post({ url: '/sdpbusiness/task/sectionList', data: { params: { proId: '0027' } } }),
                Axios.post({ url: '/sdpbusiness/task/selectTaskTeams', data: { params: { proId: '0027' } } }),
                Axios.post({ url: '/sdpbusiness/task/selectTaskType', data: { params: { proId: '0027' } } }),
                Axios.get({ url: '/sdpbusiness/dictionaries/findDictionaryList', data: { params: { dicType: 'RWZT' } } }),
                Axios.post({ url: '/sdpbusiness/task/ScreeningTask', data: { params: { proId: '0027', order: 'asc', offset: 0, pageNum: 1, pageSize: 10 } } }),
            ]
            // axios.all(listAll)
            // .then(axios.spread((res,sectionRes,dictionRes)=>{
            //     console.log(res,sectionRes,dictionRes)
            // }))
            const res = await axios.all(listAll);
            console.log(res)
            res.map((item, index) => {
                // console.log(index)
                if (item.data && typeof item.data.success === 'boolean') {
                    if (item.data.success === false) {
                        dispatch(errorMsg(item.data.message));
                    } else {
                        const { content } = item.data;
                        const typeList = [RESPONSIBLE_PERSON_SUCCESS, BIDS_SUCCESS, TEAMLIST, TASKLIST, TASKSTATUS, LIST];
                        return dispatch({ type: typeList[index], payload: content });
                    }
                }
            })
        } catch (e) {
            console.log('login error: ', e);
        }

    }
}