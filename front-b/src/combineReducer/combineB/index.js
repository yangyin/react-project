// import { systemConfiguration } from './../../redux/systemConfiguration.redux';
import { taskManage } from './../../redux/taskManage.redux';
import { teamManagementReducer } from './../../container/content/group-management/store';

import { educationAssistantReducer } from './../../container/content/education-assistant/store';
import { educationPlanReducer } from './../../container/content/education-plan/store';
import { educationDetailsReducer } from './../../container/content/education-details/store';

import { staffManagerReducer } from './../../container/content/employ-list/store';
import { departmentManagerReducer } from './../../container/content/dept-list/store';
import { infoManagementReducer } from './../../container/content/information-details/store';
import { dashboardReducer } from './../../container/content/dashboard/store';
import { projectDetailsTablesReducer } from './../../components/project-details-tables/store';
import { employTeamManagementReducer } from './../../container/content/employ-group/store';

export default {
    // systemConfiguration,
    taskManage,
    teamManagementReducer,
    educationAssistantReducer,
    educationPlanReducer,
    educationDetailsReducer,
    staffManagerReducer,
    departmentManagerReducer,
    infoManagementReducer,
    dashboardReducer,
    projectDetailsTablesReducer,
    employTeamManagementReducer
}