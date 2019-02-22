import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Collapse, Card, List } from 'antd';



import PanelComp from '@/components/panel/panel';
import PlatfromDrawer from './view/drawer/drawer';
import { Unauthorized } from '@/container/error-page/not-found-page';

import { getJurisdictionListAction } from './store/actions';


import './platform-jurisdiction.less';


const panelData = {
    title: '平台权限',
};

const Panel = Collapse.Panel;



@connect(
    state => ({
        platformData: state.get('platformJurisdiction')

    }),
    { getJurisdictionListAction }
)
class PlatformJurisdiction extends PureComponent {
    state = {
        visible: false,

    }
    drawerData = {
        type: 1, // 0:删除授权 1:授权
        userGroup: [],
        isDrawerShow: false //控制是否加载弹窗
    }

    componentDidMount () {
        const platform = this.props.platformData.get('platform');
        platform.size === 0 && this.props.getJurisdictionListAction();
    }

    //授权
    handleEditClick = (data) => {
        this.drawerData = {
            jurId: data,
            type: 1,
            isDrawerShow: true
        };
        this.setState(() => ({
            visible: true
        }))
    }
    //删除授权 
    handleDelClick = (data) => {
        this.drawerData = {
            jurId: data,
            type: 0,
            isDrawerShow: true
        };
        this.setState(() => ({
            visible: true
        }))
    }

    //关闭
    onCloseDrawer = () => {
        this.setState(() => ({
            visible: false
        }))
    }

    listRender = () => {
        const platform = this.props.platformData.get('platform');
        if (platform.size > 0) {
            let data = platform.toJS();
            console.log(data, '获取到的数据');
            return data.map((item, index) => (
                <Panel header={item.parentjurName} key={index}>
                    <List
                        bordered
                        dataSource={item.childList}
                        renderItem={v => (
                            <List.Item actions={[
                                <a onClick={() => this.handleEditClick(v.jurId)} >授权</a>,
                                <a onClick={() => this.handleDelClick(v.jurId)} >详情</a>
                            ]}>
                                <List.Item.Meta
                                    title={v.jurName}
                                    description={v.jurDescribe}
                                />
                            </List.Item>
                        )}
                    />
                </Panel>
            ))

        }
        return false;
    }
    
    render () {
        const isJur = this.props.platformData.get('isJur');
        const jurMap = this.props.platformData.get('jurMap');
        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div>
                            <PanelComp panelData={panelData} />
                            <Card style={{ margin: 24 }}>
                                <Collapse
                                    accordion
                                // defaultActiveKey={['a_system_platform']}
                                >
                                    {this.listRender()}
                                </Collapse>
                            </Card>
                            {this.drawerData.isDrawerShow === true && <PlatfromDrawer
                                visible={this.state.visible}
                                onCloseDrawer={this.onCloseDrawer}
                                drawerData={this.drawerData}
                                jurMap={jurMap}
                            />}
                        </div>
                        : <Unauthorized />
                }
            </React.Fragment>

        );
    }
}

export default PlatformJurisdiction;