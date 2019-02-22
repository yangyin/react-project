import { REGISTER_SUCCESS ,REGISTER_FAIL,REGISTER_STATUS} from './types';
import { CALL_API } from '../../../applyMiddleWare/request';

// 注册
export function registerSubmit(params) {
    return {
        [CALL_API]: {
            url:'bis/portal/register',
            method:'POST',
            data:{isShowLoading:true,params},
            types:[REGISTER_SUCCESS,REGISTER_FAIL]
        }
    }
    // return async dispatch => {
    //     try {
    //         console.log(params)
    //         const res = await Axios.post({url:'bis/portal/register',data:{isShowLoading:true,params}});
    //         if(res.data && typeof res.data.success === 'boolean') {
    //             if( res.data.success === false ) { //注册失败
    //                 dispatch( {type:REGISTER_FAIL,payload:res.data.message} );
    //             } else { //注册成功
    //                 dispatch( {type:REGISTER_SUCCESS,payload:true} );
    //             }
    //         }
    //     } catch(e) {
    //         console.log('login error: ',e);
    //     }
        
    // }
}

//修改注册状态
export const registerStatus =(type) => {
    return { type:REGISTER_STATUS,payload:{status:type}};
}
