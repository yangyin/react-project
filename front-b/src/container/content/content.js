import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import { SpinComp } from '@/components/loaders/loaders';
import { NotFoundPage } from '../../container/error-page/not-found-page';

const Dashboard = Loadable({
    loader: () => import('./dashboard/dashboard'),
    loading () {
        return (
            <div><SpinComp /></div>
        )
    }
});


// const EnterpriseInfo = Loadable({loader: () => import('./enterprise-info/enterprise-info'),loading() {return (<div><SpinComp /></div>)}});
const EmployList = Loadable({ loader: () => import('./employ-list/employ-list'), loading () { return (<div><SpinComp /></div>) } });
const EmployJurPage = Loadable({ loader: () => import('./employ-list/jur-page'), loading () { return (<div><SpinComp /></div>) } }); //员工管理-->权限

const RelatedProject = Loadable({ loader: () => import('./employ-list/related-project/related-project'), loading () { return (<div><SpinComp /></div>) } });
const BissRoleList = Loadable({ loader: () => import('./biss-role-list/biss-role-list'), loading () { return (<div><SpinComp /></div>) } });
const LeaguerManagement = Loadable({ loader: () => import('./biss-role-list/member-management/member-management'), loading () { return (<div><SpinComp /></div>) } });
const AccessPlan = Loadable({ loader: () => import('./access-plan/access-plan'), loading () { return (<div><SpinComp /></div>) } });
const ProjectAssistant = Loadable({ loader: () => import('./project-assistant/project-assistant'), loading () { return (<div><SpinComp /></div>) } });
const EducationAssistant = Loadable({ loader: () => import('./education-assistant/education-assistant'), loading () { return (<div><SpinComp /></div>) } });
const EducationPlan = Loadable({ loader: () => import('./education-plan/education-plan'), loading () { return (<div><SpinComp /></div>) } });
const EducationAssistantDetails = Loadable({ loader: () => import('./education-details/education-details'), loading () { return (<div><SpinComp /></div>) } });
const SystemPermiss = Loadable({ loader: () => import('./system-permiss/system-permiss'), loading () { return (<div><SpinComp /></div>) } });
const ProjectDetail = Loadable({ loader: () => import('./project-detail/project-detail'), loading () { return (<div><SpinComp /></div>) } });
// const AddTask = Loadable({loader: () => import('./add-task/add-task'),loading() {return (<div><SpinComp /></div>)}});
// const MyAccount = Loadable({loader: () => import('./my-account/my-account'),loading() {return (<div><SpinComp /></div>)}});
const TaskManage = Loadable({ loader: () => import('./task-manage/task-manage'), loading () { return (<div><SpinComp /></div>) } });
const GroupManagement = Loadable({ loader: () => import('./group-management/group-management'), loading () { return (<div><SpinComp /></div>) } });
const MemberManagement = Loadable({ loader: () => import('./group-management/member-management/member-management'), loading () { return (<div><SpinComp /></div>) } });
const DeptList = Loadable({ loader: () => import('./dept-list/dept-list'), loading () { return (<div><SpinComp /></div>) } });
const TaskManageDetail = Loadable({ loader: () => import('./task-manage/task-manage-detail/task-manage-detail'), loading () { return (<div><SpinComp /></div>) } });
const SecuritySetting = Loadable({ loader: () => import('./security-setting/security-setting'), loading () { return (<div><SpinComp /></div>) } });
const RealName = Loadable({ loader: () => import('./real-name/real-name'), loading () { return (<div><SpinComp /></div>) } });
const ProjectSection = Loadable({ loader: () => import('./project-section/project-section'), loading () { return (<div><SpinComp /></div>) } });
const ProjectCompany = Loadable({ loader: () => import('./project-company/project-company'), loading () { return (<div><SpinComp /></div>) } });
const EnterpriseCertification = Loadable({ loader: () => import('./enterprise-certification/enterprise-certification'), loading () { return (<div><SpinComp /></div>) } });
const BasicData = Loadable({ loader: () => import('./basic-data/basic-data'), loading () { return (<div><SpinComp /></div>) } });
const InformationDetails = Loadable({ loader: () => import('./information-details/information-details'), loading () { return (<div><SpinComp /></div>) } });
const SystemMessage = Loadable({ loader: () => import('./system-message/system-message'), loading () { return (<div><SpinComp /></div>) } });
const Attendance = Loadable({ loader: () => import('./attendance/attendance'), loading () { return (<div><SpinComp /></div>) } }); // 考勤信息
const AttendInfo = Loadable({ loader: () => import('./attendance-info/attendance-info'), loading () { return (<div><SpinComp /></div>) } }); // 考勤明细
const AttendDetail = Loadable({ loader: () => import('./attendance/attendance-detail'), loading () { return (<div><SpinComp /></div>) } }); // 考勤信息

const PlanTaskListPage = Loadable({ loader: () => import('./plan-task/plan-task-list/plan-task-list'), loading () { return (<div><SpinComp /></div>) } }); //任务计划列表
const PlanTaskDetailPage = Loadable({ loader: () => import('./plan-task/plan-task-detail'), loading () { return (<div><SpinComp /></div>) } }); //任务计划详情

const AssistantInform = Loadable({ loader: () => import('./assistant-inform/assistant-inform'), loading () { return (<div><SpinComp /></div>) } }); //通知助手
const InformDetail = Loadable({ loader: () => import('./assistant-inform/inform-detail/inform-detail'), loading () { return (<div><SpinComp /></div>) } }); //通知详情
const AuthorityDetailPage = Loadable({ loader: () => import('./access-plan/authority-detail/authority-detail'), loading () { return (<div><SpinComp /></div>) } });
const ProjectAuthority = Loadable({ loader: () => import('./project-authority/project-authority'), loading () { return (<div><SpinComp /></div>) } });
const CameraList = Loadable({ loader: () => import('./camera/camera-list/camera-list'), loading () { return (<div><SpinComp /></div>) } }); //摄像头管理
const CameraView = Loadable({ loader: () => import('./camera/camera-view/camera-view'), loading () { return (<div><SpinComp /></div>) } }); //摄像头查看

const EducationInfo = Loadable({ loader: () => import('./education-info/education-info'), loading () { return (<div><SpinComp /></div>) } }); //三级教育信息
const EduDetailRes = Loadable({ loader: () => import('./education-info/education-detail'), loading () { return (<div><SpinComp /></div>) } }); //三级教育班组人员情况
const PlatformManage = Loadable({ loader: () => import('./platform-manage'), loading () { return (<div><SpinComp /></div>) } }); //平台权限管理

const Compact = Loadable({ loader: () => import('./compact/compact'), loading () { return (<div><SpinComp /></div>) } }); //合同管理
const CompactDetail = Loadable({ loader: () => import('./compact/compact_detail'), loading () { return (<div><SpinComp /></div>) } }); //合同管理详情

const EmployGroup = Loadable({ loader: () => import('./employ-group/employ-group'), loading () { return (<div><SpinComp /></div>) } }); //人员管理-班组管理
const QualityManage = Loadable({ loader: () => import('./quality-manage/quality-manage'), loading () { return (<div><SpinComp /></div>) } }); //质量管理
const SafeManage = Loadable({ loader: () => import('./safe-manage/safe-manage'), loading () { return (<div><SpinComp /></div>) } }); //安全管理
const SafeQuaManageDetail = Loadable({ loader: () => import('./safe-manage/safe-qua-detail'), loading () { return (<div><SpinComp /></div>) } }); //安全管理、质量-详情审核
const ManageDispute = Loadable({ loader: () => import('./manage-dispute/manage-dispute'), loading () { return (<div><SpinComp /></div>) } }); // 纠纷管理
const DisputeDetail=Loadable({loader:()=>import('./manage-dispute/manage-disputeDetail'),loading(){return(<div><SpinComp /></div>)}});// 纠纷管理详情
const Logger = Loadable({ loader: () => import('./logger'), loading () { return (<div><SpinComp /></div>) } }); //系统日志



@withRouter
class ContentComponent extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route path="/" exact render={() =>
                        <Route path="/" exact component={Dashboard} /> //工作台
                    } />

                    <Route path="/employ" render={() =>
                        /**
                         * 部门管理
                         * 员工管理
                         * 企业下的班组管理
                         */
                        <React.Fragment>
                            <Route path="/employ" exact component={DeptList} />
                            <Route path="/employ/staff" component={EmployList} />
                            <Route path="/employ/companyTeam" exact component={EmployGroup} /><Route path="/employ/companyTeam/details/:id/:type" component={MemberManagement} />
                            <Route path="/employ/relatedProject/:type" component={RelatedProject} />
                            <Route path="/employ/jur/:id" component={EmployJurPage} />
                        </React.Fragment>
                    } />

                    <Route path="/project" render={() =>
                        /**
                         * 项目详情
                         * 考勤信息（新）
                         * 考勤到岗情况（新）
                         * 三级教育信息（新）
                         * 班组管理
                         * 标段管理
                         * 任务计划
                         * 合同管理(新)
                         * 安全管理
                         * 安全管理详情(新)
                         * 纠纷管理(新)
                         * 质量管理
                         * 硬件设备
                         * 三级教育方案设置
                         */
                        <React.Fragment>
                            <Route path="/project" exact component={ProjectDetail} />
                            <Route path="/project/attendance" component={Attendance} />
                            <Route path="/project/attendanceInfo/:type" component={AttendInfo} />
                            <Route path="/project/attendanceDetail" component={AttendDetail} />
                            <Route path="/project/education" component={EducationInfo} />
                            <Route path="/project/eduDetailRes" component={EduDetailRes} />
                            <Route path="/project/projectTeam" exact component={GroupManagement} /><Route path="/project/projectTeam/details/:id/:type" component={MemberManagement} />
                            <Route path="/project/section" component={ProjectSection} />
                            <Route path="/project/task" component={PlanTaskListPage} />
                            <Route path="/project/contract" component={Compact} />
                            <Route path="/project/contractDetail/:contractId" component={CompactDetail} />
                            <Route path="/project/returnSecityPage" component={SafeManage} />
                            <Route path="/project/returnSecityQuaDetail" component={SafeQuaManageDetail} />
                            <Route path="/project/dispute" component={ManageDispute} />
                            <Route path="/project/disputeDetail/:id" component={DisputeDetail} />
                            <Route path="/project/returnQualityPage" component={QualityManage} />
                            <Route path="/project/cameraView" component={CameraView} />
                            <Route path="/project/hardware" render={() => (
                                /**
                                 * 闸机(新)
                                 * 摄像头
                                 * 大屏（新）
                                 * 认证机（新）
                                 */
                                <React.Fragment>
                                    <Route path="/project/hardware/1" exact component={CameraList} />
                                    <Route path="/project/hardware/cameraList/2" component={CameraList} />
                                    <Route path="/project/hardware/screen/3" component={CameraList} />
                                    <Route path="/project/hardware/authentication/4" component={CameraList} />
                                </React.Fragment>
                            )} />
                            <Route path="/project/educationPlan" component={EducationPlan} />
                            <Route path="/project/educationDetails/:id"  component={EducationAssistantDetails}></Route>
                        </React.Fragment>
                    } />


                    <Route path="/setting" render={() =>
                        /**
                         * 系统设置
                         */
                        <Route path="/setting" exact component={PlatformManage} /> //平台权限管理
                    } />

                    <Route path="/logger" render={() =>
                        /**
                         * 系统日志(新)
                         */
                        <Route path="/logger" exact component={Logger} /> //平台日志
                    } />

                    <Route path="/systemMessage" component={SystemMessage}></Route>
                    <Route path="/securitySetting" component={SecuritySetting}></Route>
                    <Route path="/basicData" component={BasicData}></Route>
                    <Route path="/realnameAuthentication" component={RealName}></Route>
                    <Route path="/corporateCertification" component={EnterpriseCertification}></Route>





                    {/* <Route path="/sdpbusiness/project/projectList"      component={Dashboard}></Route>

                    <Route path="/sdpbusiness/user/employList"              component={EmployList}></Route>
                    <Route path="/sdpbusiness/roleRelation/getBissRoleList"  exact component={BissRoleList}></Route>
                    <Route path="/sdpbusiness/roleRelation/getBissRoleList/management/:id"  component={LeaguerManagement}></Route>
                    <Route path="/sdpbusiness/businessPge/accessPlan"  component={AccessPlan}></Route>
                    <Route path="/sdpbusiness/noticeProgramme/informAssistant"  component={ProjectAssistant}></Route>                    
                    <Route path="/sdpbusiness/education/education"  component={EducationAssistant}></Route>
                    <Route path="/sdpbusiness/project/educationPlan"  component={EducationPlan}></Route>
                    <Route path="/sdpbusiness/education/educationDetails/:id"  component={EducationAssistantDetails}></Route>
                    <Route path="/sdpbusiness/systemPermissB/getPermissBPage"  component={SystemPermiss}></Route>
                    <Route path="/sdpbusiness/project/projectInfo"  component={ProjectDetail}></Route>
                    <Route path="/sdpbusiness/common/taskManage" exact component={TaskManage}></Route>
                    <Route path="/sdpbusiness/common/taskManage/details" component={TaskManageDetail}></Route>
                    <Route path="/sdpbusiness/user/team"  component={GroupManagement}></Route>
                    <Route path="/user/findDeptList"  component={DeptList}></Route>
                    <Route path="/roleRelation/getBissUserRoleRelationList/:id"  component={MemberManagement}></Route>
                    <Route path="/securitySetting"  component={SecuritySetting}></Route>
                    <Route path="/realnameAuthentication"  component={RealName}></Route>
                    <Route path="/corporateCertification"  component={EnterpriseCertification}></Route>
                    <Route path="/sdpbusiness/project/section"  component={ProjectSection}></Route>
                    <Route path="/sdpbusiness/project/company"  component={ProjectCompany}></Route>
                    <Route path="/basicData"  component={BasicData}></Route>
                    <Route path="/sdpbusiness/account/informationDetails"  component={InformationDetails}></Route>
                    <Route path="/systemMessage"  component={SystemMessage}></Route>

                    <Route path="/sdpbusiness/task/returnPlanPage"  component={PlanTaskListPage}></Route>
                    <Route path="/sdpbusiness/task/returnPlanDetailPage"  component={PlanTaskDetailPage}></Route>
                    <Route path="/sdpbusiness/task/returnQualityPage"  component={QualityManage}></Route>
                    <Route path="/sdpbusiness/task/returnSecityPage"  component={SafeManage}></Route>
                    <Route path="/sdpbusiness/assistantPlan"  component={AssistantInform}></Route>
                    <Route path="/sdpbusiness/informDetail/:id"  component={InformDetail}></Route>
                    <Route path="/sdpbusiness/businessPge/authorityDetail/:id" component={AuthorityDetailPage}></Route>
                    <Route path="/sdpbusiness/project/authority"  component={ProjectAuthority}></Route>

                    <Route path="/sdpbusiness/veido/cameraList"  component={CameraList}></Route>
                    <Route path="/sdpbusiness/veido/cameraView"  component={CameraView}></Route> */}

                    <Route path='*' component={NotFoundPage} />

                </Switch>
            </div>
        )
    }



}

export default ContentComponent;