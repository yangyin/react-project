import { project } from './../../container/content/project-detail/store';
import { projectAssistant } from './../../container/content/project-assistant/store';
import { companyReducer } from './../../container/content/project-company/store';
import { qualityManage } from './../../container/content/quality-manage/store';
import { safeManage } from './../../container/content/safe-manage/store';
import { assistantInform } from './../../container/content/assistant-inform/store';
import { projectSection } from './../../container/content/project-section/store';
import {attendanceList} from './../../container/content/attendance/store';
import {attendInfoReducer} from './../../container/content/attendance-info/store';
import {compact} from './../../container/content/compact/store';
import {manageDispute} from './../../container/content/manage-dispute/store';
import {logger} from './../../container/content/logger/store';
export default {
    project, // 项目详情
    projectAssistant, // 项目通知方案
    companyReducer,// 参建单位
    qualityManage,// 质量管理
    safeManage,// 安全管理
    assistantInform, // 通知助手
    projectSection, // 项目标段
    attendanceList,// 考勤数据
    attendInfoReducer,// 到岗情况
    compact,// 合同管理
    manageDispute, // 纠纷管理
    logger, // 平台日志
}