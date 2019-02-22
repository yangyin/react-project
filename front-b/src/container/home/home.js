import React, { Component, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Avatar, Modal, Button, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { read, clearAll, write } from '../../utils/localStorage';
import { menus, userInfo, changeCompany, callbackAsystem } from './store/actions';
import { logout } from './../login/store/actions';

import NavLeft from '../../components/nav-left/nav-left';
// import ContentComponent from '../content/content';
import TopBar from '../../components/topbar/topbar';
import MessageComp from './message';
import { SpinComp } from '@/components/loaders/loaders';

import './home.less';

const ContentComp = lazy(() => import('./../content/content'));

const { Header, Sider, Content, Footer } = Layout;
const confirm = Modal.confirm;
const Option = Select.Option;
const { menuDefaultUserList } = window.systemBaseConfig;

@connect(state => state, { menus, userInfo, logout, changeCompany, callbackAsystem })
class Home extends Component {
    constructor(props) {
        super(props);
        const w = document.documentElement.offsetWidth || document.body.offsetWidth;
        const { pathname } = this.props.location;
        const isArr = [
            '/securitySetting',
            '/basicData',
            '/realnameAuthentication',
            '/corporateCertification',
        ];
        this.state = {
            hasCompany: false, // 判断该账户是否有公司，有true：显示项目菜单，无false：显示账户菜单，并且项目类菜单不可点击
            collapsed: w < 900 ? true : false,
            // authorization: Cookies.get('authorization'),
            selectList: [],
            userMenu: isArr.includes(pathname) ? menuDefaultUserList : [],
        };

        this.props.userInfo();

        this.showConfirm = this.showConfirm.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.handleMenuSwitch = this.handleMenuSwitch.bind(this);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    // selectKey(v) {
    //     // console.log('home select key: ',v)
    //     const list = this.props.home.menusList.filter(obj => obj.id === v);
    //     // console.log('home select list: ',list)
    //     this.setState({
    //         selectList:list[0]['children']
    //     })
    // }
    treeKey(v) {
        console.log('home select key: ', v);
    }
    showConfirm() {
        const _this = this;
        confirm({
            title: '您确定退出系统?',
            content: '',
            okText: '确定',
            cancelText: '返回',
            onOk() {
                try {
                    clearAll();
                    let { hostname } = window.location;
                    Cookies.remove('authorization', { domain: hostname.indexOf('.benefitech.cn') !== -1 ? '.benefitech.cn' : hostname });
                    // Cookies.remove('authorization', { expires: 0 });
                    _this.props.logout();
                    _this.props.history.push('/login');
                    window.location.reload();
                } catch (e) {
                    console.log('Oops errors!', e);
                }
            },
            onCancel() { },
        });
    }
    onWindowResize() {
        if (window.innerWidth < 900) {
            this.setState({
                collapsed: true,
            });
        } else {
            this.setState({
                collapsed: false,
            });
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        const { userInfo } = this.props.home;
        if (JSON.stringify(userInfo) !== '{}') {
            if (JSON.stringify(userInfo['userRelatedCompany']) !== '{}') {
                this.setState(() => ({
                    hasCompany: true,
                }));
                const appId = read('appId');
                this.props.menus({ appId });
            } else {
                this.setState(() => ({
                    hasCompany: false,
                    userMenu: menuDefaultUserList,
                }));
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    componentDidUpdate(prevProps) {
        // console.log('**prev******',prevProps.home.userInfo)
        // console.log('********',this.state.userMenu)

        /**
         * 工作台点击事件后，切换userMenu数据
         */
        const { pathname } = this.props.location;
        const { userMenu } = this.state;
        const { menusList } = this.props.home;
        if(pathname && pathname.includes('project') && menusList.length >0) {
            if(userMenu.length >0) {
                if( !(userMenu[0].url).includes('project') ) {
                    this.setState({
                        userMenu:menusList[2].children
                    })
                }
            } else {
                this.setState({
                    userMenu:menusList[2].children
                })
            }
        }


        const { userInfo, callbackdata } = this.props.home;
        const prevUserInfo = prevProps.home.userInfo;

        //代管
        if (JSON.stringify(callbackdata) !== '{}') {
            write('appId', callbackdata.appId);
            window.location.href = window.systemBaseConfig.toAsystem;
        }

        if (
            JSON.stringify(prevUserInfo) === '{}' &&
            JSON.stringify(userInfo) !== '{}'
        ) {
            if (JSON.stringify(userInfo['userRelatedCompany']) !== '{}') {
                this.setState(() => ({
                    hasCompany: true,
                }));
                const appId = read('appId');
                this.props.menus({ appId });
            } else {
                this.setState(() => ({
                    hasCompany: false,
                    userMenu: menuDefaultUserList,
                }));
            }
        }
    }

    //点击User头像 切换菜单栏为账户菜单
    handleMenuSwitch() {
        this.setState(_ => {
            return {
                userMenu: menuDefaultUserList,
            };
        });
        this.props.history.push('/securitySetting');
    }

    //点击管理面板，切换菜单栏
    handleMenuSwitch2 = (data) => {
        this.setState(_ => {
            return {
                userMenu: data,
            };
        });
    };
    // 头部公司切换render
    rendercompanyName = () => {
        // {this.state.collapsed ?<div style={{margin:'16px',textAlign:'center'}}><Avatar src={require('../../images/logo1.png')} /></div>:<div className="logo" title={userInfo.companyName}><Avatar src={require('../../images/logo1.png')} /><span>{userInfo.companyName}</span></div>}
        if (!!this.state.collapsed) {
            return (
                <div style={{ margin: '16px', textAlign: 'center' }}>
                    <Avatar src={require('../../images/logo1.png')} />
                </div>
            );
        } else {
            const {
                userRelatedCompany,
                companyName,
                userRoleName,
                defaultCompanyId,
            } = this.props.home.userInfo;
            const companyDropStyle = {};
            if (userRelatedCompany) {
                const company = Object.keys(userRelatedCompany);
                if (company.length > 1) {
                    return (
                        <Select
                            dropdownStyle={companyDropStyle}
                            className="companySelect"
                            size='large'
                            onChange={this.handleCompany.bind(this)}
                            defaultValue={defaultCompanyId}
                        >
                            {company.map(i => (
                                <Option className="compay-select-option" key={i} value={i}>
                                    {userRelatedCompany[i]}
                                </Option>
                            ))}
                        </Select>
                    );
                } else {
                    return (
                        <div className="logo" title={companyName}>
                            <Avatar src={require('../../images/logo1.png')} />
                            <span>{companyName}</span>
                            <span style={{fontSize:12}}>{userRoleName}</span>
                        </div>
                    );
                }
            }
        }
    };
    //公司切换重载页面
    handleCompany(value) {
        this.props.changeCompany({ businessId: value });
    }

    //代管
    handleProxy = () => {
        this.props.callbackAsystem();
    }

    //第一次进入页面，左侧显示的菜单
    showMenuList = (menusList) => {
        /**
        *根据URL的地址，默认选择菜单内容(只判断menu接口返回数据)
        * */

        const { pathname } = this.props.location;
        let currentMenuList = [];
        if (menusList.length > 0) {
            if( pathname.indexOf('/employ') !== -1 ) {
                currentMenuList = menusList[1].children;
            } else if ( pathname.indexOf('/project') !== -1 ) {
                currentMenuList = menusList[2].children;
            } else if ( pathname.indexOf('/setting') !== -1 ) {
                currentMenuList = menusList[3].children;
            } else if ( pathname.indexOf('/logger') !== -1 ) {
                currentMenuList = menusList[4].children;
            } else {
                currentMenuList = menusList[0].children;
            }
            return currentMenuList;
        }

        return [];
    }

    render() {
        const { userInfo, menusList } = this.props.home;
        const { collapsed } = this.state;

        let menuList = this.state.userMenu.length > 0
            ? this.state.userMenu
            : this.showMenuList(menusList);
        return (
            <div id="home">
                {/* { !this.state.authorization ? <Redirect to="/login" />:null} */}
                <Layout style={{ height: '100%' }}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        className="home-left"
                        width="256"
                    >
                        {this.rendercompanyName()}
                        {menuList.length > 0
                            ? <NavLeft
                                collapsed={collapsed}
                                // defaultSelectedKeys={defaultMenuId[1]}
                                // defaultOpenKey={defaultMenuId.length >2 ? defaultMenuId[2] : null}
                                data={menuList}
                                selectKey={v => this.treeKey(v)}
                            />
                            : null}
                    </Sider>
                    <Layout className="content-right">
                        <Header className="header">
                            <Row>
                                <Col
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    onClick={this.toggle}
                                    className="header-icon"
                                >
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    />
                                </Col>
                                <Col xs={17} sm={14} md={16}>
                                    <TopBar
                                        handleMenuSwitch2={this.handleMenuSwitch2}
                                        handleMenuSwitch={this.handleMenuSwitch}
                                        hasCompany={this.state.hasCompany}
                                    />
                                </Col>
                                <Col xs={8} sm={9} md={6}>
                                    <div className="nav-right">
                                        <Row>
                                            <Col
                                                xs={4}
                                                sm={16}
                                                md={16}
                                                xl={23}
                                                className="nav-col"
                                            // span={20}
                                            >
                                                {userInfo['userHeadPortrait']
                                                    ? <Avatar
                                                        style={{ cursor: 'pointer', marginRight: 10 }}
                                                        src={userInfo['userHeadPortrait']}
                                                        onClick={this.handleMenuSwitch}
                                                    />
                                                    : <Icon
                                                        type="user"
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: 22,
                                                            marginRight: 10,
                                                        }}
                                                        onClick={this.handleMenuSwitch}
                                                    />}

                                                <MessageComp />

                                                <Link to="/systemMessage">
                                                    <Icon
                                                        type="setting"
                                                        theme="outlined"
                                                        style={{ marginRight: 8 }}
                                                        style={{
                                                            fontSize: 22,
                                                            marginRight: 10,
                                                            color: 'rgb(98, 110, 121)',
                                                        }}
                                                    />
                                                </Link>

                                                {parseInt(userInfo['proxy']) === 1 && <Icon type="swap" onClick={this.handleProxy} style={{ marginRight: 20, fontSize: 22, cursor: 'pointer' }} />}

                                            </Col>
                                            <Col xs={4} sm={4} md={2} xl={1}>
                                                <Button onClick={this.showConfirm}>
                                                    <Icon type="poweroff" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Header>
                        <Content className="contents">
                            <Suspense fallback={<SpinComp />}>
                                <ContentComp proId={this.props.topbar.proId} />
                            </Suspense>
                        </Content>
                        <Footer className="footer">
                            <span>帮助</span>
                            <span>隐私</span>
                            <span>条款</span>
                            copyright © 2017 benefitech.cn
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Home;
