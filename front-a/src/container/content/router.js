import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { notification } from 'antd';
import Loadable from 'react-loadable';

import { SpinComp } from '@/components/loaders/loaders';


const UserUsers = Loadable({ loader: () => import('./user/user-users'), loading() { return (<div><SpinComp /></div>) } });// 用户管理
const UserDetail = Loadable({ loader: () => import('./user/user-detail'), loading() { return (<div><SpinComp /></div>) } });// 用户详情
const UserBlack = Loadable({ loader: () => import('./user/user-black'), loading() { return (<div><SpinComp /></div>) } });// 黑名单
const Company = Loadable({ loader: () => import('./company/company'), loading() { return (<div><SpinComp /></div>) } });// 企业管理
const CompanyBuild = Loadable({ loader: () => import('./company/company-build'), loading() { return (<div><SpinComp /></div>) } });// 企业管理
const CompanyConstruction = Loadable({ loader: () => import('./company/company-construction'), loading() { return (<div><SpinComp /></div>) } });// 企业管理
const CompanyLabour = Loadable({ loader: () => import('./company/company-labour'), loading() { return (<div><SpinComp /></div>) } });// 企业管理
const CompanyDetail = Loadable({ loader: () => import('./company/company-detail'), loading() { return (<div><SpinComp /></div>) } });// 企业管理详情
const Organization = Loadable({ loader: () => import('./organization/organization'), loading() { return (<div><SpinComp /></div>) } });// 机构管理
const OrganizationDetail = Loadable({ loader: () => import('./organization/organization-detail'), loading() { return (<div><SpinComp /></div>) } });// 机构管理详情
const Group = Loadable({ loader: () => import('./group/group'), loading() { return (<div><SpinComp /></div>) } });// 用户组
const GroupMember = Loadable({ loader: () => import('./group/group-member'), loading() { return (<div><SpinComp /></div>) } });// 用户组-成员列表
const Team = Loadable({ loader: () => import('./team/team'), loading() { return (<div><SpinComp /></div>) } });// 班组
const TeamDetail = Loadable({ loader: () => import('./team/team-detail'), loading() { return (<div><SpinComp /></div>) } });// 班组详情
const myAccount = Loadable({ loader: () => import('./my-account/my-account'), loading() { return (<div><SpinComp /></div>) } });// 我的账户
const Education = Loadable({ loader: () => import('./education/education'), loading() { return (<div><SpinComp /></div>) } });// 教育题库
const EduAssistant = Loadable({ loader: () => import('./edu-assistant/edu-assistant'), loading() { return (<div><SpinComp /></div>) } });// 教育助手
const EduAssisDetail = Loadable({ loader: () => import('./edu-assistant-detail/edu-assistant-detail'), loading() { return (<div><SpinComp /></div>) } });// 教育助手详情
const LoginRecord = Loadable({ loader: () => import('./login-record/login-record'), loading() { return (<div><SpinComp /></div>) } });// 登录记录


const ProjectList = Loadable({ loader: () => import('./project-list/project-list'), loading() { return (<div><SpinComp /></div>) } });// 项目列表
const ProjectDetails = Loadable({ loader: () => import('./project-list/project-details'), loading() { return (<div><SpinComp /></div>) } });// 项目详情
const Saas = Loadable({ loader: () => import('./saas/saas'), loading() { return (<div><SpinComp /></div>) } });// 注册管理
const userData = Loadable({ loader: () => import('./user-data/user-data'), loading() { return (<div><SpinComp /></div>) } });// 用户数据
const Monitoring = Loadable({ loader: () => import('./saas/monitoring'), loading() { return (<div><SpinComp /></div>) } });// 硬件监控
const App = Loadable({ loader: () => import('./app/app'), loading() { return (<div><SpinComp /></div>) } });// 招聘审核
const Recruit = Loadable({ loader: () => import('./app/recruit'), loading() { return (<div><SpinComp /></div>) } });// 招聘设置
const AppManage = Loadable({ loader: () => import('./app/appManage'), loading() { return (<div><SpinComp /></div>) } });// 应用设置
const Dashboard = Loadable({ loader: () => import('./dashboard/dashboard'), loading() { return (<div><SpinComp /></div>) } }); //首页
const PlatformJurisdiction = Loadable({ loader: () => import('./platform-jurisdiction'), loading() { return (<div><SpinComp /></div>) } }); //平台权限
const ProjectRole = Loadable({ loader: () => import('./project-role'), loading() { return (<div><SpinComp /></div>) } }); //平台权限
const Logger = Loadable({ loader: () => import('./log'), loading() { return (<div><SpinComp /></div>) } }); //平台日志
const Jurisdiction = Loadable({ loader: () => import('./jurisdiction'), loading() { return (<div><SpinComp /></div>) } }); //权限助手
const JurisdictionDetails = Loadable({ loader: () => import('./jurisdiction/views/details'), loading() { return (<div><SpinComp /></div>) } }); //权限助手详情
const ProjectData = Loadable({ loader: () => import('./project-data'), loading() { return (<div><SpinComp /></div>) } }); //项目数据
const ProjectDataInfo = Loadable({ loader: () => import('./project-data-info/project-data-info'), loading() { return (<div><SpinComp /></div>) } }); //项目数据信息
const Setting = Loadable({ loader: () => import('./setting/setting'), loading() { return (<div><SpinComp /></div>) } }); //信息设置
const Clause = Loadable({ loader: () => import('./setting/clause'), loading() { return (<div><SpinComp /></div>) } }); //条款管理
const InformAssistant = Loadable({ loader: () => import('./inform-assistant'), loading() { return (<div><SpinComp /></div>) } }); //通知助手
const AssistantManage = Loadable({ loader: () => import('./info-assis-manage'), loading() { return (<div><SpinComp /></div>) } }); //通知助手方案管理
const Task = Loadable({ loader: () => import('./task'), loading() { return (<div><SpinComp /></div>) } }); //任务助手
const City = Loadable({ loader: () => import('./city'), loading() { return (<div><SpinComp /></div>) } }); //城市管理
const Packet = Loadable({ loader: () => import('./packet'), loading() { return (<div><SpinComp /></div>) } }); //红包营销
const AdPos = Loadable({ loader: () => import('./setting/pages/ad-pos'), loading() { return (<div><SpinComp /></div>) } }); //广告位置
const AdContent = Loadable({ loader: () => import('./setting/pages/ad-content/ad-content'), loading() { return (<div><SpinComp /></div>) } }); //广告内容
const SystemPower = Loadable({ loader: () => import('./system-power/system-power'), loading() { return (<div><SpinComp /></div>) } }); //运营 系统权限
const JobCard = Loadable({ loader: () => import('./saas/job-card'), loading() { return (<div><SpinComp /></div>) } }); //运营 工卡管理




class RouterComp extends React.Component {


    componentDidCatch(error,info) {
        console.log('**router error****',error);
        console.log('***info*',info);
        
        notification.error({
            message:'提示',
            description:'数据错误，返回首页后重试',
            key:'1'
        })
        setTimeout(() => {
            this.props.history.push('/');
            window.location.reload();
        }, 2000);
    }
    // const RouterComp = () => {
    render() {

        return (
            <div>
                <Switch>
                    <Route path='/home' render={() =>
                        <React.Fragment>
                            <Route path='/home' exact component={Dashboard} />
                            <Route path='/home/myAccount' component={myAccount} />
                        </React.Fragment>
                    } />
                    <Route path='/user' render={() =>
                        <React.Fragment>
                            <Route path='/user' exact component={UserUsers} />
                            <Route path='/user/userDetail/:id' component={UserDetail} />
                            <Route path='/user/blackList' exact component={UserBlack} />
                            {/* <Route path='/user/company' component={Company} /> */}
                            <Route path='/user/build' component={CompanyBuild} />
                            <Route path='/user/construction' component={CompanyConstruction} />
                            <Route path='/user/labour' component={CompanyLabour} />
                            <Route path='/user/companyDetail/:id' component={CompanyDetail} />
                            <Route path='/user/organization' component={Organization} />
                            <Route path='/user/organizationDetail/:id' component={OrganizationDetail} />
                            <Route path='/user/group' component={Group} />
                            <Route path='/user/groupMember' component={GroupMember} />
                            <Route path='/user/team' component={Team} />
                            <Route path='/user/teamDetail' component={TeamDetail} />
                        </React.Fragment>
                    }
                    />
                    <Route path='/project' render={() =>
                        <React.Fragment>
                            <Route path='/project' exact component={ProjectList} />
                            <Route path='/project/:type' exact component={ProjectList} />
                            <Route path='/project/details/:id' component={ProjectDetails} />
                            <Route path='/project/:type/details/:id' component={ProjectDetails} />
                            <Route path='/project/dataInfo' component={ProjectDataInfo} />
                        </React.Fragment>
                    } />
                    <Route path='/saas' render={() =>
                        <React.Fragment>
                            <Route path='/saas' exact component={SystemPower} />
                            <Route path='/saas/register' exact component={Saas} />

                            <Route path='/saas/monitoring' component={Monitoring} />
                            <Route path='/saas/userData' component={userData} />
                            <Route path='/saas/packet' component={Packet} />
                            <Route path='/saas/loginRecord' component={LoginRecord} />
                            <Route path='/saas/systemPower' component={SystemPower} />
                            <Route path='/saas/jobCard' component={JobCard} />
                            <Route path='/saas/recruitAudit' component={App} />
                        </React.Fragment>
                    } />
                    <Route path='/setting' render={() =>
                        <React.Fragment>
                            <Route path='/setting' exact component={ProjectData} />
                            <Route path='/setting/city' component={City} />
                            <Route path='/setting/education' component={Education} />
                            <Route path='/setting/clause' component={Clause} />
                            <Route path='/setting/recruit' component={Recruit} />
                            <Route path='/setting/platform' component={Setting} />
                            <Route path='/setting/adPos' component={AdPos} />
                            <Route path='/setting/adContent' component={AdContent} />
                            <Route path='/setting/Jurisdiction' exact component={Jurisdiction} />
                            <Route path='/setting/educationAssistant' component={EduAssistant} />
                            <Route path='/setting/informAssistant' exact component={InformAssistant} />
                            <Route path='/setting/task' component={Task} />


                            {/* <Route path='/setting/platformJurisdiction' component={PlatformJurisdiction} /> */}
                            <Route path='/setting/projectRole' component={ProjectRole} />
                            {/* <Route path='/setting/log' component={Logger} /> */}
                            <Route path='/setting/Jurisdiction/details' component={JurisdictionDetails} />
                            <Route path='/setting/projectData' component={ProjectData} />
                            <Route path='/setting/informAssistant/manage' component={AssistantManage} />
                            <Route path='/setting/eduAssistantDetail' component={EduAssisDetail} />
                        </React.Fragment>
                    } />
                    <Route path='/platform' render={() =>
                        <React.Fragment>
                            <Route path='/platform' exact component={PlatformJurisdiction} />
                        </React.Fragment>
                    } />
                    <Route path='/logger' render={() =>
                        <React.Fragment>
                            <Route path='/logger' exact component={Logger} />
                        </React.Fragment>
                    } />
                    {/* <Route path='/app' render={() =>
                        <React.Fragment>
                            <Route path='/app' exact component={App} />
                            <Route path='/app/appManage' component={AppManage} />
                        </React.Fragment>
                    } /> */}
                    <Route path='/' exact component={Dashboard} />
                    <Route path="*" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(RouterComp);