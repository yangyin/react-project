import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Row, Col, Divider } from 'antd';

import { getPermissListAction } from './store/actions';

import PanelComp from '../../../components/panel/panel';
import { Unauthorized } from './../../error-page/not-found-page';
import PlatfromDrawer from './views/drawer';
import './index.less';




const Panel = Collapse.Panel;
const panelData = {
    title: '平台权限管理',
}

@connect(
    state => ({
        platfrom: state.platformManage
    }),
    { getPermissListAction }
)
class PlatformManage extends React.PureComponent {

    /**
     * 弹出框数据
     */
    modalData = {
        type: 1, //授权 OR 详情， 1：授权，2：详情
        rowData: {} ,//该行数据
        parentjurName:''//项目名称
    }

    state = {
        visible: false
    }


    componentDidMount() {
        this.props.getPermissListAction();
    }

    /**
     *点击，显示drawer
     */
    handleClick = ({ type, rowData,parentjurName }) => {
        this.modalData = {
            type, rowData,parentjurName
        }
        this.setState({
            visible: true
        })
    }

    /**
     *关闭drawer
     */
    onClose = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { isJurisdiction, jurList } = this.props.platfrom;
        const { visible } = this.state;
        return (
            <React.Fragment>
                {!isJurisdiction ? < div className="platfrom-manage">
                    <PanelComp panelData={panelData} />
                    <Collapse style={{ margin: 24 }}>
                        {
                            jurList.map(f => (
                                <Panel header={f['parentjurName']} key={f['parentId']}>
                                    {
                                        f['childList'].map(item => (
                                            <Row type="flex" justify="space-between" align="middle" className="jur-row" key={item['jurId']}>
                                                <Col span={10} offset={1}>
                                                    <p className="jur-name">{item['jurName']}</p>
                                                    <label className="jur-desc">{item['jurDescribe']}</label>
                                                </Col>
                                                <Col span={6}>
                                                    <a href="javascript:;" onClick={() => this.handleClick({ type: 1, rowData: item,parentjurName: f['parentjurName']})}>授权</a>
                                                    <Divider type="vertical" />
                                                    <a href="javascript:;" onClick={() => this.handleClick({ type: 2, rowData: item ,parentjurName: f['parentjurName']})}>详情</a>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </Panel>
                            ))
                        }
                    </Collapse>
                    <PlatfromDrawer
                        visible={visible}
                        modalData={this.modalData}
                        onClose={this.onClose}
                    />
                </div > : <Unauthorized />}
            </React.Fragment>
        )
    }
}

export default PlatformManage;