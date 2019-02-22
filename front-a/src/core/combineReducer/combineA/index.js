import {login} from './../../../container/login/store'
import { home } from './../../../container/home/store';
import { forget } from './../../../container/forget/store';
import { platformJurisdiction } from './../../../container/content/platform-jurisdiction/store';
import { projectRole } from './../../../container/content/project-role/store';
import { logger } from './../../../container/content/log/store';
import { jurisdction } from './../../../container/content/jurisdiction/store';
import { proData } from './../../../container/content/project-data/store';
import { infoAssistant } from './../../../container/content/inform-assistant/store';
import { infoAssisManage } from "./../../../container/content/info-assis-manage/store";
import { task } from "./../../../container/content/task/store";
import { city } from "./../../../container/content/city/store";
import { dash } from "./../../../container/content/dashboard/store";
import { packet } from "./../../../container/content/packet/store";
import { systemPower } from "./../../../container/content/system-power/store";



export default {
    login,
    home,
    forget,
    platformJurisdiction,
    projectRole,
    logger,
    jurisdction,
    proData,
    infoAssistant,
    infoAssisManage,
    task,
    city,
    dash,
    packet,
    systemPower
}