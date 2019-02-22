import React, { PureComponent } from 'react';
import { Layout, Icon, Modal ,Avatar} from 'antd';

const { Header } = Layout;

class HeaderComp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }
    //切换
    handleToggle = () => {
        this.props.toggle();
    }
    handleClick = (e) => {
        // console.log(e.target.getAttribute('ids'))
        const ids = e.target.getAttribute('ids');
        this.props.handleKey(ids);
    }
    handleOk = () => {
        this.props.signout();
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    handleLayout = () => {
        this.setState({
            visible:true
        })
    }
    itemRender = (data) => {
        const { currentMenuKey } = this.props;
        return data.map(item => (
            <span className={`item ${currentMenuKey === item.get('id') ? 'home-header-active' : ''}`} key={item.get('id')} ids={item.get('id')} onClick={this.handleClick}>{item.get('name')}</span>
        ))
    }
    render() {
        const { menuList ,toggleVal,user} = this.props;
        // console.log(user.get('userHeadPortrait'))
        return (
            <React.Fragment>

                <Header className="home-header">
                    <Icon
                        className="trigger"
                        type={toggleVal ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.handleToggle}
                    />
                    <div className="content">
                        {this.itemRender(menuList)}
                    </div>
                    <div className="right">
                        {user.get('userHeadPortrait') ? <Avatar src={ user.get('userHeadPortrait') } /> : <Avatar icon="user" />}
                        <label className="user">欢迎你，{user.get('userName')}</label>
                        <Icon type="logout" onClick={this.handleLayout} />
                    </div>
                </Header>
                <Modal
                    title="提示"
                    width={350}
                    closable={false}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>确定退出系统?</p>
                </Modal>
            </React.Fragment>
        );
    }
}

export default HeaderComp;