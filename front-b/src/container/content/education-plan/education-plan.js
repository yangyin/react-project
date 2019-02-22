import React from 'react';
import {Card, Divider, Table, Checkbox} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { initEducationPlan, useEducationPlan, jurisdictionStatus, usePlanStatus } from './store/action';
import Panel from '../../../components/panel/panel';
import './education-plan.less';

@connect(
    state => ({
        topbar: state.topbar,
        educationPlanReducer: state.educationPlanReducer
    }),
    { initEducationPlan, useEducationPlan, jurisdictionStatus, usePlanStatus }
)

class EducationPlan extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            check: true,
            planList: []
        };
        this.columns = [{
            title: '方案名称',
            dataIndex: 'programName',
            key: 'programName'
          }, {
            title: '备注',
            dataIndex: 'programContent',
            key: 'programContent',
          }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        <Checkbox checked={record.user === 'yes'} onChange={() => this.useHandle(record)}>使用</Checkbox>
                        <Divider type="vertical" />
                        {/* <Link to={
                            {
                                pathname: `/sdpbusiness/education/educationDetails`,
                                state: { id: record.programId }
                            }
                        }>详情</Link> */}
                        {/* <a onClick={() => this.goToDetails(record.programId)}>详情</a> */}
                        <Link to={{pathname: `/project/educationDetails/${record.programId}`}}>详情</Link>
                    </div>
                );
            }
        }];          
        
    }

    componentDidMount() {
        const { proId } = this.props.topbar;
        if (proId) {
            this.props.initEducationPlan(proId);
        }
    }
    // 完成更新后
    componentDidUpdate(prevProps) {
        const prevId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;
        if (proId && prevId !== proId) {
            this.props.initEducationPlan(proId);
        }
        /**
        * 判断使用方案，成功时，更改usePlan状态，并且刷新界面
        */
       const { usePlan } = this.props.educationPlanReducer;
       if(usePlan === true) {
           this.props.usePlanStatus(false);
           this.props.initEducationPlan(proId);
       }
   }
    render () {
        const panelData = {
            pathname: '系统 / 项目设置 / 教育方案',
            title: '教育方案',
            desc: '教育方案',
        };
        const { planList } = this.props.educationPlanReducer;
        return (
            <div>
            <Panel panelData={panelData} />
            <Card bordered={false} style={{background: '#f3f3f3'}}>
                <Table
                className="content"
                columns={this.columns}
                rowKey="programId"
                locale={{emptyText: '暂无数据'}}   
                dataSource={ planList}
                pagination={false}
                />
            </Card>
            </div>
        );
    }
    componentWillUnmount () {
        this.props.jurisdictionStatus (false);
    }
    // 使用
    useHandle = (record) => {
        const { proId } = this.props.topbar;
        const option = [{
            proId: proId,
            programId: record.programId,
            id: record.id,
            user: record.user === 'yes' ?'no':'yes'
        }]
        const params = {
            proId: proId,
            programeProjects: JSON.stringify(option)
        }
        this.props.useEducationPlan(params);
    }
    goToDetails (id) {
        this.props.history.push(`/sdpbusiness/education/educationDetails?id=${id}`);
    }
}

export default EducationPlan;
