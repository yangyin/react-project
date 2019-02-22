import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import './nav-left.less';

import { NavLink, withRouter } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: window.systemBaseConfig.iconUrl,
});

@withRouter
class NavLeft extends Component {

    constructor(props) {
        super(props);
        const { pathname } = this.props.location;
        this.props.history.push(pathname);
        this.state = {
            current: pathname, //当前选中的菜单
            openKey: this.props.defaultOpenKey || null,
            mode: this.props.mode || 'horizontal',
            theme: this.props.theme || 'light'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * 点击菜单每列时，执行
     */
    handleClick({ item, key }) {
        this.setState(() => ({
            current: key
        }))
    }

    componentDidUpdate(prevProps) {

        // const { data } = this.props;
        /**
         * 判断 state存当前路由 与 地址栏的路由是否匹配
         */
        const host = window.location.href.split('#')[1];
        const { current } = this.state;

        if (host != current) {
            this.setState(() => ({
                current: host
            }))
            this.props.history.push(host);
        }

    }
    /**
     * 渲染菜单
     */
    itemRender(data, collapsed) {
        if (!data) return;
        return data.map((item) => {
            if (item.children && item.children.length > 0) {
                // <i className={`iconfont ${item.iconCls}`} style={{marginRight:10,width:30,height:30,fontSize:20}} ></i>
                return (
                    <SubMenu title={<span>{item.iconCls ? <IconFont type={item.iconCls} style={{ fontSize: 16 }} /> : null}<span>{!collapsed && item.name}</span></span>} key={item.id}>
                        {this.itemRender(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.url}>

                <NavLink style={{ color: 'inherit', display: 'inline-block', width: 'calc(100% - 10px)', height: '100%' }} to={item.url}>
                    {/* {item.iconCls ? <i className={`iconfont ${item.iconCls}`} style={{marginRight:10,width:30,height:30,fontSize:20}}></i> : null} */}
                    {item.iconCls ? <span><IconFont type={item.iconCls} style={{ fontSize: 16 }} /><span>{item.name}</span></span> : null}
                    {item.icon ? <span><Icon type={item.icon} /> <span>{item.name}</span> </span> : null}
                    {!item.iconCls && !item.icon ? <span>{item.name}</span> : null}
                </NavLink>

            </Menu.Item>
        })
    }



    render() {
        const { data, collapsed } = this.props;
        return (
            <div id="nav-top" className={this.state.mode === 'inline' ? 'width100' : 'horizontal'}>
                <Menu
                    className="nav-menu"
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={[this.state.openKey]}
                    // defaultSelectedKeys={[data[0].url]}
                    onOpenChange={this.onOpenChange}
                >
                    {this.itemRender(data, collapsed)}
                </Menu>
            </div>
        )
    }
}



export default NavLeft;