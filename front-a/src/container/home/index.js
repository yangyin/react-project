import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { is, List } from 'immutable';
import { read, clearAll, write } from '@/utils/localStorage';
import Loadable from 'react-loadable';
import Cookies from 'js-cookie';

import { SpinComp } from '@/components/loaders/loaders';

import './home.less';

import { userInfoAction, menuAction } from './store/actions';

const SiderComp = Loadable({
    loader: () => import('./views/sider'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const Header = Loadable({
    loader: () => import('./views/header'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const RouterComp = Loadable({
    loader: () => import('./../content/router'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})


const { Sider, Content } = Layout;

@connect(
    state => ({
        home: state.get('home')
    }),
    { userInfoAction, menuAction }
)
class Home extends PureComponent {
    state = {
        collapsed: false,
        currentMenuList: List(),
        currentMenuKey: '',//Menu.Item 当前值
        openKey:'' //SubMenu key当前值
    };
    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,

        });
    }
    componentDidMount() {
        //获取 userinfo  menu
        const appId = read('appId');
        if(appId) {
            this.props.menuAction(appId);
            this.props.userInfoAction();
        } else {
            let { hostname } = window.location;
            Cookies.remove('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1? '.benefitech.cn' : hostname});
            clearAll();
            
            this.props.history.push('/login');
            window.location.reload();
        }
        
        

    }
    componentWillReceiveProps(nextProps) {
        //初始化菜单
        const menu = this.props.home.get('menu'), nextMenu = nextProps.home.get('menu');
        if (!(is(menu, nextMenu)) && nextMenu.size > 0) {
            this.initMenu(nextMenu);
        }
    }
    /**
     * 刷新时，默认展开菜单
     */
    initMenu = (nextMenu) => {
        const localMenuList = read('menuList');
        if (localMenuList && localMenuList.length > 0) {
            const localMenuKey = read('menuKey');
            const { pathname } = this.props.location;
            let openKey='';
            switch(pathname) {
                case '/saas':
                    openKey = 'lwEsfCjUMD92sZWZqUt';
                    break;
                case '/saas/monitoring':
                    openKey = 'lwEsfCjUMD92sZWZqUt';
                    break;
                case '/saas/userData':
                    openKey = 'DkTTFMfjHFXi9LC7mDV';
                    break;
                case '/saas/packet':
                    openKey = 'Kjvm9r0ownNvQ5eBzee';
                    break;
                case '/saas/systemPower':
                    openKey = 'ktMsukwFDgsrdikULW8';
                    break;
                case '/saas/loginRecord':
                    openKey = 'ktMsukwFDgsrdikULW8';
                    break;
                case '/setting':
                    openKey = 'vst2FIny4TuI4rsKANU';
                    break;
                case '/setting/adPos':
                    openKey = 'vst2FIny4TuI4rsKANU';
                    break;
                case '/setting/adContent':
                    openKey = 'vst2FIny4TuI4rsKANU';
                    break;
                case '/setting/projectRole':
                    openKey = 'TFTlktuLoYEtuGyuKqD';
                    break;
                case '/setting/platformJurisdiction':
                    openKey = 'TFTlktuLoYEtuGyuKqD';
                    break;
                case '/setting/projectData':
                    openKey = '2QguzpKq210KlaWSfJd';
                    break;
                case '/setting/city':
                    openKey = '2QguzpKq210KlaWSfJd';
                    break;
                case '/setting/education':
                    openKey = '2QguzpKq210KlaWSfJd';
                    break;
                case '/setting/clause':
                    openKey = '2QguzpKq210KlaWSfJd';
                    break;
                case '/setting/log':
                    openKey = 'uEPMx4RWn1EHC3KmM8g';
                    break;
            };
            this.setState(() => ({
                currentMenuList: List(localMenuList),
                currentMenuKey: localMenuKey,
                openKey
            }))
        } else {
            this.setState(() => ({
                currentMenuList: nextMenu.getIn([0, 'children']),
                currentMenuKey: nextMenu.getIn([0, 'id'])
            }))
        }
    }
    componentWillUnmount() {
        clearAll();
    }

    handleHeaderKey = (key) => {
        // console.log(key)
        const menuList = this.props.home.get('menu');
        let url = '/';
        let openKey = '';
        //默认选中当前列表第一个菜单
        switch (key) {
            case 'SyX7UwDZfpkaHj7vb38':
                url = '/home';
                break;
            case 'gdS7ezAVAeC1Bq0rTiP':
                url = '/user';
                break;
            case 'hESWcJCavGFYDLGvmIl':
                url = '/project';
                openKey = 'f9JtiYoALw8rQXc7fjf';
                break;
            case '2vShRXSWFRhtXdZqwmI':
                url = '/saas';
                openKey='gFwlIXatwBloieJcIE5'
                break;
            case 'InBziVVIoVZn0xutWBD':
                url = '/setting';
                openKey = '0OEwMfbiTesNH7wIOHA';
                break;
            case 'OPE3gHGkZl4cnNwk6u1':
                url = '/platform';
                break;
            
            case 'r3bqm1wMb8XIkQ0cdTb':
                url = '/logger';
                break;
            default:
                url = '/home';
                break;
        }
        this.props.history.push(url);
        //修改左侧菜单数据
        menuList.map(item => {
            if (item.get('id') === key) {
                this.setState(() => ({
                    currentMenuList: item.get('children'),
                    currentMenuKey: key,
                    openKey
                }))
                write('menuList', item.get('children'));
                write('menuKey', key);
            }
        })

    }
    //退出登录
    handleSignOut = () => {
        clearAll();
        let { hostname } = window.location;
        Cookies.remove('authorization',{ domain: hostname.indexOf('.benefitech.cn') !== -1? '.benefitech.cn' : hostname});

        this.props.history.push('/login');
        window.location.reload();
    }
    //点击SubMenu时，
    handleChangeOpenKey = (key) => {
        this.setState((prevState)=>({
            openKey:prevState.openKey === key ? '' : key
        }))
    }
    render() {
        const menu = this.props.home.get('menu');
        const userInfo = this.props.home.get('userInfo');
        const { currentMenuList, currentMenuKey, collapsed,openKey } = this.state;
        return (
            <Layout id="home-container">
                <Sider
                    trigger={null}
                    width={250}
                    style={{ height: '100vh' }}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    {currentMenuList.size > 0 && <SiderComp 
                                                    list={currentMenuList} 
                                                    collapsed={this.state.collapsed} 
                                                    changeOpenKey={this.handleChangeOpenKey}
                                                    openKey={openKey} />}
                </Sider>
                <Layout>
                    <Header
                        menuList={menu}
                        handleKey={this.handleHeaderKey}
                        currentMenuKey={currentMenuKey}
                        signout={this.handleSignOut}
                        toggle={this.toggle}
                        toggleVal={collapsed}
                        user={userInfo}
                    />
                    {/* 有panel时样式有影响 */}
                    <Content style={{
                        // margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                    }}
                    >
                        <RouterComp />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Home;

