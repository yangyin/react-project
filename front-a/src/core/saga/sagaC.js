import { user } from './../../container/content/user/store/saga';//用户管理
import { company } from './../../container/content/company/store/saga';// 企业管理
import { organization } from './../../container/content/organization/store/saga';// 机构管理
import { group } from './../../container/content/group/store/saga';// 用户组
import { team } from './../../container/content/team/store/saga';// 班组管理
import { myAccount } from './../../container/content/my-account/store/saga';// 班组管理
import { education } from './../../container/content/education/store/saga';// 教育题库
import { eduAssistant } from './../../container/content/edu-assistant/store/saga';// 教育助手
import { eduAssisDetail } from './../../container/content/edu-assistant-detail/store/saga';// 教育助手-详情
import {loginRecord} from './../../container/content/login-record/store/saga';// 登录记录
import {proDataInfo} from './../../container/content/project-data-info/store/saga'; // 项目数据信息

export const sagaC = [
    ...user,
    ...company,
    ...organization,
    ...group,
    ...team,
    ...myAccount,
    ...education,
    ...eduAssistant,
    ...eduAssisDetail,
    ...loginRecord,
    ...proDataInfo,
];