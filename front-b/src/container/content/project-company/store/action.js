// import Axios from '../../../../utils/axios';
import {
  PROJECT_COMPANY_LIST,
  PROJECT_COMPANY_ERROR,
  PRO_COMPANY_JURISDICTION,
} from './types';
// import {notification} from 'antd';
import { CALL_API } from '@/applyMiddleWare/request';

//错误信息
// function errorMsg (msg) {
//   return {type: PROJECT_COMPANY_ERROR, payload: msg};
// }
/**
 * 更改权限状态
 * @param {boolean} type 
 */
export const jurisdictionStatus = type => {
  return {type: PRO_COMPANY_JURISDICTION, payload: type};
};
/**
 * 获取参建单位列表
 * @param {*} proId: 0152 
 */
export function getCompanyList (options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/selectProjectCompanyVoList',
            method:'POST',
            data:{isShowLoading:true,params:options},
            types:[PROJECT_COMPANY_LIST,PROJECT_COMPANY_ERROR,PRO_COMPANY_JURISDICTION]
        }
    }
//   return async dispatch => {
//     try {
//       const res = await Axios.post ({
//         url: '/sdpbusiness/project/selectProjectCompanyVoList',
//         data: {isShowLoading: true, params: options},
//       });
//       if (res.data && typeof res.data.success === 'boolean') {
//         if (res.data.success === false) {
//           dispatch (errorMsg (res.data.message));
//         } else {
//           const {content} = res.data;
//           dispatch ({type: PROJECT_COMPANY_LIST, payload: content});
//         }
//       }
//     } catch (e) {
//       console.log ('参建单位列表 error: ', e);
//       const {message} = e;
//       if (message == 403) {
//         dispatch (jurisdictionStatus (true));
//       }
//     }
//   };
}
/**
 * 编辑参建单位
 * @param {*} id
 * @param {*} companyType
 * @param {*} companyId
 * @param {*} companyName
 * @param {*} contactId
 */
export function editcompanyinfo (options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/updateProjectCompanyVo',
            method:'POST',
            data:{isShowLoading:true,params:options},
            types:['',PROJECT_COMPANY_ERROR,PRO_COMPANY_JURISDICTION],
            isnotify:true,
            msgSuc:'编辑成功',
            callback:(data,dispatch)=>{
                dispatch (getCompanyList ({proId: options.proId}));
            }
        }
    }
   
//   return async dispatch => {
//     try {
//       const res = await Axios.post ({
//         url: '/sdpbusiness/project/updateProjectCompanyVo',
//         data: {isShowLoading: true, params: options},
//       });
//       if (res.data && typeof res.data.success === 'boolean') {
//         if (res.data.success === false) {
//           // dispatch( errorMsg(res.data.message) );
//           notification.error ({
//             key: '1',
//             message: '提示',
//             description: '保存失败！',
//           });
//         } else {
//           // const { content } = res.data;
//           notification.success ({
//             key: '1',
//             message: '提示',
//             description: '保存成功！',
//           });
//           dispatch (getCompanyList ({proId: options.proId}));
//         }
//       }
//     } catch (e) {
//       console.log ('编辑参建单位 error: ', e);
//       const {message} = e;
//       if (message == 403) {
//         dispatch (jurisdictionStatus (true));
//       }
//     }
//   };
}

// 删除参建单位
export function deleteCompany (options, listOpt) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/deleteProjectCompanyVo',
            method:'POST',
            data:{isShowLoading:true,params: options},
            types:['',PROJECT_COMPANY_ERROR,PRO_COMPANY_JURISDICTION],
            isnotify:true,
            msgSuc:'删除成功',
            callback:(data,dispatch)=>{
                dispatch (getCompanyList (listOpt));
            }
        }
    }
   
//   return async dispatch => {
//     try {
//       const res = await Axios.post ({
//         url: '/sdpbusiness/project/deleteProjectCompanyVo',
//         data: {params: options},
//       });
//       if (res.data && typeof res.data.success === 'boolean') {
//         if (res.data.success === false) {
//           // dispatch( errorMsg(res.data.message) );
//           notification.error ({
//             key: '1',
//             message: '提示',
//             description: '删除创建单位失败！',
//           });
//         } else {
//           // const { content } = res.data;
//           notification.success ({
//             key: '1',
//             message: '提示',
//             description: '删除成功！',
//           });
//           dispatch (getCompanyList (listOpt));
//         }
//       }
//     } catch (e) {
//       console.log ('删除参建单位: ', e);
//       const {message} = e;
//       if (message == 403) {
//         dispatch (jurisdictionStatus (true));
//       }
//     }
//   };
}

/**
 * 新建参建单位
 * proId: 0152
 * companyType: ed4wJ99b4ynzEZ4eyhN
 * companyId: 10010
 * companyName: 深圳市陌陌科技有限公司
 * contactId: bdRmSyQiglN1FE2T36D
 */
export function addCompanyForm (options) {
    return {
        [CALL_API]: {
            url:'sdpbusiness/project/addProjectCompanyVo',
            method:'POST',
            data:{isShowLoading: true, params: options},
            types:['',PROJECT_COMPANY_ERROR],
            isnotify:true,
            msgSuc:'新增成功',
            callback:(data,dispatch)=>{
                dispatch (getCompanyList ({proId: options.proId}));
            }
        }
    }
//   return async dispatch => {
//     try {
//       const res = await Axios.post ({
//         url: '/sdpbusiness/project/addProjectCompanyVo',
//         data: {isShowLoading: true, params: options},
//       });
//       if (res.data && typeof res.data.success === 'boolean') {
//         if (res.data.success === false) {
//           // dispatch( errorMsg(res.data.message) );
//           notification.error ({
//             message: '提示',
//             description: res.data.message,
//           });
//         } else {
//           notification.success ({
//             message: '提示',
//             description: '新增成功！',
//           });
//           dispatch (getCompanyList ({proId: options.proId}));
//         }
//       }
//     } catch (e) {
//       console.log ('参建单位新增 error: ', e);
//       const {message} = e;
//       if (message == 403) {
//         dispatch (jurisdictionStatus (true));
//       }
//     }
//   };
}
