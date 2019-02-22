import { GROUP_LIST_ACTION,GROUP_EDIT_ACTION,GROUP_COPY_ACTION,GROUP_DEL_ACTION,
    GROUP_MEMBER_ACTION,GROUP_MEMBER_DEL_ACTION,
} from './types.js';
import { call, fork, take } from 'redux-saga/effects';
import { CALL_API, Service } from '@/utils/utils';

import {operationStatus,groupList,
    groupMemberList,controlJur,
} from './actions';

/**
 * 用户组列表
 * @params pageNum: 1
 * @params pageSize: 10
 */

 function* getGroupList (payload){
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findAllGroupIdBy',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [groupList,null,controlJur]
        }
    })
 }
 function* watchList(){
    while(true){
        const {payload}=yield take(GROUP_LIST_ACTION);
        yield fork(getGroupList,payload);
    }
 }

 /**
  * 编辑
    * groupName: "se12121"
    * groupContent: "平台管理员测试"
    groupId: "B3uYb47cWmVMPkZGBTN"
    groupType: "自定义"
  */
 function* edit(payload){
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/editGroupInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatus],
            isnotify:true
        }
    })
 }
 function* watchEdit(){
    while(true){
        const {payload}=yield take(GROUP_EDIT_ACTION);
        yield fork(edit,payload);
    }
 }
 /**
  * copy
    groupContent: "平台管理员222"
    groupName: "senior222"
    groupType: "B"
  */
 function* copy(payload){
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/addAllGroupInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatus],
            isnotify:true
        }
    })
 }
 function* watchCopy(){
    while(true){
        const {payload}=yield take(GROUP_COPY_ACTION);
        yield fork(copy,payload);
    }
 }
 /**
  * 删除
  * @params groupId
  */
 function* del(payload){
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/deleteGroupInfo',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatus],
            isnotify:true
        }
    })
 }
 function* watchDel(){
    while(true){
        const {payload}=yield take(GROUP_DEL_ACTION);
        yield fork(del,payload);
    }
 }

 /**
  * 成员管理列表
  * @params groupId
  * @params pageNum
  * @params pageSize
  * @params paramName
  */
 function* member(payload){
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/findGroupEmployList',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [groupMemberList]
        }
    })
 }
 function* watchMember(){
    while(true){
        const {payload}=yield take(GROUP_MEMBER_ACTION);
        yield fork(member,payload);
    }
 }

 /**
  * 成员管理-删除
  * @params groupId
  * @params userId
  */
 function* memberDel(payload){
    yield call(Service, {
        [CALL_API]: {
            url: 'sdpprevail/user/deleteGroupPersonById',
            method: 'POST',
            data: { isShowLoading: true, params: { ...payload } },
            types: [operationStatus],
            isnotify:true,
        }
    })
 }
 function* watchMemberDel(){
    while(true){
        const {payload}=yield take(GROUP_MEMBER_DEL_ACTION);
        yield fork(memberDel,payload);
    }
 }


 export const group =[
     fork(watchList),
     fork(watchEdit),
     fork(watchCopy),
     fork(watchDel),
     fork(watchMember),
     fork(watchMemberDel),
 ]