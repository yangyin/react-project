import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: window.systemBaseConfig.iconUrl,
});

@withRouter
class SiderComp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    itemRender = (list) => {
        return list.map(item => {
            if (item.children.length > 0) {
                return (
                    <SubMenu
                        key={item.id}
                        onTitleClick={this.handleSubMenu}
                        title={
                            <span>
                                {item.iconCls ? <IconFont type={item.iconCls} style={{ fontSize: 16 }} /> : <Icon type="folder-open" />}

                                <span>{!this.props.collapsed && item.name}</span>
                            </span>}
                    >
                        {this.itemRender(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.url}>
                    <Link to={item.url}>
                        {item.iconCls ?
                            <span><IconFont type={item.iconCls} style={{ fontSize: 16 }} /><span>{item.name}</span></span> :
                            <span><Icon type="copy" /><span>{item.name}</span> </span>
                        }
                    </Link>
                </Menu.Item>
            )
        })
    }
    //点击submenu时
    handleSubMenu = ({ key }) => {
        this.props.changeOpenKey(key);
    }

    render() {
        const list = (this.props.list).toJS();
        const { pathname } = this.props.location;
        const { openKey, collapsed } = this.props;
        return (
            <div className="home-sider">
                <p className="system-title">司空</p>
                {
                    !collapsed ?
                    <Menu
                        theme="dark"
                        mode="inline"
                        inlineCollapsed={true}
                        openKeys={openKey ? [openKey] : []}
                        selectedKeys={[pathname]}
                    >
                        {this.itemRender(list)}
                    </Menu>
                    : <Menu
                        theme="dark"
                        mode="inline"
                        inlineCollapsed={true}
                        selectedKeys={[pathname]}
                    >
                        {this.itemRender(list)}
                    </Menu>
                }
            </div>
        );
    }
}

export default SiderComp;