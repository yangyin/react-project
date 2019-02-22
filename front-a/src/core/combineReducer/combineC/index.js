import {user} from './../../../container/content/user/store';
import {company} from './../../../container/content/company/store';
import {organization} from './../../../container/content/organization/store';
import {group} from './../../../container/content/group/store';
import {team} from './../../../container/content/team/store';
import {myAccount} from './../../../container/content/my-account/store';
import {education} from './../../../container/content/education/store';
import {eduAssistant} from './../../../container/content/edu-assistant/store';
import {eduAssisDetail} from './../../../container/content/edu-assistant-detail/store';
import {loginRecord} from './../../../container/content/login-record/store';
import {proDataInfo} from './../../../container/content/project-data-info/store'

export default {
    user,// 用户管理
    company,// 企业管理
    organization, // 机构管理
    group,// 用户组
    team,// 班组管理
    myAccount,// 我的账户
    education, // 教育题库
    eduAssistant, // 教育助手
    eduAssisDetail,// 教育助手详情
    loginRecord,// 登录记录
    proDataInfo,// 项目数据
}