import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ProjectTopBar from './project';
import { getProjectList, updateProId } from './store/action';
import { read } from './../../utils/localStorage';

import './topbar.less';

@connect(
    state => state,
    { getProjectList, updateProId }
)
@withRouter
class TopBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowProject: true,
            isShowTeam: true,
            visible: false //控制项目是否显示下拉
        }
        this.params = {
            donePageNum: 1, //已完成项目当前页数
            donePageSize: 8, //已完成项目每页显示个数
            doingPageNum: 1, //进行中的项目当前页数
            doingPageSize: 8, //进行中项目每页显示个数
            preparePageNum:1, //准备中的项目当前页数
            preparePageSize:8 //准备中项目每页显示个数
        }
    }


    componentDidMount() {
        //初始化项目列表
        this.props.getProjectList(this.params);
        
        let projectInfo = read('projectInfo');
        if( projectInfo && typeof projectInfo === 'object') {
            const { id,name } = projectInfo;
            this.props.updateProId(id, name);
        }
    }

    componentDidUpdate() {
        const { proId, doingProjectList, doneProjectList } = this.props.topbar;
        let projectInfo = read('projectInfo');
        if (!proId && typeof projectInfo !== 'object') {
            if (doingProjectList.length > 0) {
                const { proId, proName } = doingProjectList[0];
                this.props.updateProId(proId, proName);
            } else if (doneProjectList.length > 0) {
                const { proId, proName } = doneProjectList[0];
                this.props.updateProId(proId, proName);
            }
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    // handlePanel = () => {
    //     const { hasCompany } = this.props;
    //     if (hasCompany === true) {
    //         this.props.handleMenuSwitch2();
    //     } else {
    //         this.props.handleMenuSwitch();
    //     }
    // }

    //接收proid 更新值,并通知HOME组件，手动刷新当前Content组件
    handleCurrentProject = (id, name) => {
        const { home: { menusList } } = this.props;
        this.props.updateProId(id, name);
        this.props.handleMenuSwitch2(menusList[2].children);
        this.props.history.push('/project');
        this.setState(() => ({
            visible: false
        }))
    }
    //点击加载更多
    handleMoreClick = (type) => {
        this.params[type] += 1;
        this.props.getProjectList(this.params);
    }
    render() {
        return (
            <div className="topbar">
                {this.topItemRender()}
            </div>
        )
    }

    topItemRender = () => {
        const { home: { menusList }, topbar: { proName, proId }, hasCompany, topbar } = this.props;
        const { visible } = this.state;
        // console.log(menusList)
        return menusList.length > 0
            ? <React.Fragment>
                {menusList.map(v => (
                    v.id === 'U7h9GxhwnxU1ReZvtFw'
                        ? <Popover
                            placement="bottomLeft"
                            content={<ProjectTopBar data={topbar} params={this.params} handleCurrentProject={this.handleCurrentProject} handleMoreClick={this.handleMoreClick} />}
                            trigger="click"
                            visible={visible}
                            onVisibleChange={this.handleVisibleChange}
                            style={{ padding: 0, width: 500, border: 'none' }}
                            key={v.id}
                        >
                            <Button style={{ color: '#1890ff' }} disabled={!hasCompany}>{proName || v.name}</Button>
                        </Popover>
                        : <Button onClick={this.handleItem} key={v.id} id={v.id} >{v.name}</Button>
                ))}
            </React.Fragment>
            : null

    }
    //点击顶部Item，切换左侧菜单
    handleItem = (e) => {
        let data = [];
        let url = '/';
        const { home: { menusList }, hasCompany } = this.props;
        switch (e.target.id) {
            case 'D5O9pMC24W4AjORn4ah': //工作台
                data = menusList[0].children;
                url = '/';
                break;
            case 'QJmL4E3IFneDibbY7yG': //人员管理
                data = menusList[1].children;
                url = '/employ';
                break;
            case 'U7h9GxhwnxU1ReZvtFw': //项目管理
                return;
            case '4ePgNivpShtZ37WHTkQ': //系统设置
                data = menusList[3].children;
                url = '/setting';
                break;
            case '3qVjxJyNEXzdtKvOUCl': //系统日志
                data = menusList[4].children;
                url = '/logger';
                break;
            default:
                data = menusList[0].children;
                url = '/';
        }

        if (hasCompany === true) {
            this.props.handleMenuSwitch2(data);
            this.props.history.push(url);
        } else {
            this.props.handleMenuSwitch();
        }

    }
}

export default TopBar;