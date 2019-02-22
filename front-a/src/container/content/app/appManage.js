import React , { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Checkbox  } from 'antd';

import './app.less';
import Panel from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';
import { appManageAction, appManageUpdateAction, appManageUpdateSuccess, jurisdictionStatus } from './store/actions';


@connect(
    state => ({
        app: state.get('app')
    }),
    { appManageAction, appManageUpdateAction, appManageUpdateSuccess, jurisdictionStatus }
)
class AppManage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.params = {
        }       
    }

    render() {
        const panelData = { title: '应用设置' };
        const isJurisdiction = this.props.app.get('isJurisdiction');
        const appManage = this.props.app.get('appManage') || {};
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    {
                        appManage && Array.isArray(appManage) 
                        ? appManage.map((item, index) => {
                            return (
                                <Card title={item.menuName} key={index} style={{ margin: ' 15px 24px'}}>
                                    <Row>
                                        <Col span={2}>
                                            公司类型
                                        </Col>
                                        <Col span={22}>
                                            {
                                                item.companyTypeList && Array.isArray(item.companyTypeList)
                                                ? item.companyTypeList.map((subItem, subIndex) => {
                                                    return (
                                                        <label key={subItem.targetId} style={{ marginRight: '15px'}}>
                                                            <Checkbox 
                                                                checked={subItem.isSelected === '1'} 
                                                                value={subItem.targetId}
                                                                onChange={(e) => this.handleChange(e, subItem, item, 'company')}
                                                            /> {subItem.targetName}
                                                        
                                                        </label>
                                                    )
                                                })
                                                : null
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={2}>
                                            用户组
                                        </Col>
                                        <Col span={22}>
                                            {
                                                item.groupList && Array.isArray(item.groupList)
                                                ? item.groupList.map((subItem, subIndex) => {
                                                    return (
                                                        <label key={subItem.targetId} style={{ marginRight: '15px'}}>
                                                            <Checkbox 
                                                                checked={subItem.isSelected === '1'} 
                                                                value={subItem.targetId}
                                                                onChange={(e) => this.handleChange(e, subItem, item, 'group')}
                                                            /> {subItem.targetName}
                                                        
                                                        </label>
                                                    )
                                                })
                                                : null
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })
                        : null
                    }
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取应用设置列表
        this.props.appManageAction();
    }
    componentWillReceiveProps (nextProps) {
        const appManageUpdate = nextProps.app.get('appManageUpdate');
        if (appManageUpdate) {
            // 把更新状态重置为false
            this.props.appManageUpdateSuccess({status: false});
            // 获取应用设置列表
            this.props.appManageAction();
        }
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
        this.setState = (state,callback)=>{
            return;
        };
    }
    handleChange = (checkedValues, data, menuData, type) => {
        const sonArr = [{
            menuTargetId: data.menuTargetId,
            targetId: data.targetId,
            isSelected: checkedValues.target.checked ? 1 : 0 
        }];
        const list = [{
            id: menuData.id,
            menuName: menuData.menuName,
            companyTypeList: type === 'company' ? sonArr : [],
            groupList: type === 'group' ? sonArr : []
        }];
        this.props.appManageUpdateAction(list)
    }
}


export default AppManage;


