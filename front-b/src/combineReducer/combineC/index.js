// import { user } from './../../redux/user.redux';
import { user } from './../../container/login/store';
import { userCommon } from './../../redux/user-common';
import { message } from './../../container/content/message/store';
import { home } from './../../container/home/store';
import { forgetPsd } from './../../container/forget-pwd/store';
import { register } from './../../container/register/store';
// import { account } from './../../redux/myAccount.redux';
import { basicDataReducer } from './../../container/content/basic-data/store';

import { topbar } from './../../components/topbar/store';
import { planTask } from './../../container/content/plan-task/store';
import { projectRole } from './../../container/content/biss-role-list/store';
import { companyBaseInfo } from './../../container/content/system-message/store';
import { camera } from './../../container/content/camera/store';
import { eduInfoRender } from './../../container/content/education-info/store';
import { platformManage } from './../../container/content/platform-manage/store';

export default {
    user,
    userCommon,
    home,
    forgetPsd,
    register,
    // account,
    basicDataReducer,
    topbar,
    planTask,
    projectRole,
    message,
    camera,
    companyBaseInfo,
    eduInfoRender,
    platformManage
}