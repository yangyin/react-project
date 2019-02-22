import { login } from '../../container/login/store/saga';
import { home } from '../../container/home/store/saga';
import { forget } from './../../container/forget/store/saga';
import { platformJurisdiction } from './../../container/content/platform-jurisdiction/store/saga';
import { projectRole } from './../../container/content/project-role/store/saga';
import { logger } from './../../container/content/log/store/saga';
import { jurisdiction } from './../../container/content/jurisdiction/store/saga';
import { projectData } from './../../container/content/project-data/store/saga';
import { informAssistant } from './../../container/content/inform-assistant/store/saga';
import { informAssistantManage } from './../../container/content/info-assis-manage/store/saga';
import { task } from './../../container/content/task/store/saga';
import { city } from './../../container/content/city/store/saga';
import { dashboard } from './../../container/content/dashboard/store/saga';
import { packet } from './../../container/content/packet/store/saga';
import { systemPower } from './../../container/content/system-power/store/saga';




export const sagaA = [
    ...login,
    ...home,
    ...forget,
    ...platformJurisdiction,
    ...projectRole,
    ...logger,
    ...jurisdiction,
    ...projectData,
    ...informAssistant,
    ...informAssistantManage,
    ...task,
    ...city,
    ...dashboard,
    ...packet,
    ...systemPower
];