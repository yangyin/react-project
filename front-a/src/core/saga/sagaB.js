import { project } from '../../container/content/project-list/store/saga';
import { saas } from '../../container/content/saas/store/saga';
import { userData } from '../../container/content/user-data/store/saga';
import { app } from '../../container/content/app/store/saga';
import { setting } from '../../container/content/setting/store/saga';




export const sagaB = [...project, ...saas, ...userData, ...app, ...setting];