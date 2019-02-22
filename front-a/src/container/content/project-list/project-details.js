import React from 'react';
import { connect } from 'react-redux';
import { Table, List, Card, Tabs, Modal, Badge  } from 'antd';

import './project-list.less';
import Panel from '@/components/panel/panel';
import { projectDetailAction, companyAction, unitEmployeeAction, unitTeamAction, unitWorkerAction } from './store/actions';

const TabPane = Tabs.TabPane;

@connect(
    state => ({
        project: state.get('project')
    }),
    { projectDetailAction, companyAction, unitEmployeeAction, unitTeamAction, unitWorkerAction }
)

class ProjectList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, // 行政单位人员是否显示
            teamVisible: false,
            workerVisible: false
        };
        this.params = {
            pageNum: 1,
            pageSize: 10,
            queryStr: ''
        };
        
        this.columns = [{
            title: '单位名称',
            dataIndex: 'companyName',
            key: 'companyName'
        }, {
            title: '负责人',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }, {
            title: '人员',
            dataIndex: 'userCount',
            key: 'userCount',
            render: (text, record) => (
                <span><a onClick={() => this.handleEmployee(record.id)} href="javascript:;" >{text}</a></span>
            )
        }];
        this.employeeColumns = [{
            title: '员工姓名',
            dataIndex: 'userName',
            key: 'userName'
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }, {
            title: '项目角色',
            dataIndex: 'roleName',
            key: 'roleName'
        }];
        this.teamColumns = [{
            title: '班组名称',
            dataIndex: 'teamName',
            key: 'teamName'
        }, {
            title: '班组负责人',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }, {
            title: '工人人数',
            dataIndex: 'teamWorkerCount',
            key: 'teamWorkerCount',
            render: (text, record) => (
                <span><a onClick={()=> this.handleWorker(record.id)} href="javascript:;">{text}</a></span>
            )
        }];
        this.workerColumns = [{
            title: '工人姓名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '联系电话',
            dataIndex: 'userPhone',
            key: 'userPhone',
        }];
    }

    render() {
        const panelData = {
            title: '项目详情',
            isBack: true
        };
        const projectDetail = this.props.project.get('projectDetail');
        const companyList = Array.isArray(this.props.project.get('companyList')) ? this.props.project.get('companyList') : [];
        const unitEmployeeList = Array.isArray(this.props.project.get('unitEmployeeList')) ? this.props.project.get('unitEmployeeList') : [];
        const unitTeamList = Array.isArray(this.props.project.get('unitTeamList')) ? this.props.project.get('unitTeamList') : [];
        const unitWorkerList = Array.isArray(this.props.project.get('unitWorkerList')) ? this.props.project.get('unitWorkerList') : [];
        const data1 = [{
            name: '项目名称',
            value: projectDetail.proName
        }, {
            name: '项目简称',
            value: projectDetail.proShortName
        }, {
            name: '项目编号',
            value: projectDetail.proNo
        }, {
            name: '项目造价（万元）',
            value: projectDetail.proPrice
        }]
        const data2 = [{
            name: '负责人',
            value: projectDetail.proResponsibleName
        }, {
            name: '项目类型',
            value: projectDetail.proTypeName
        }, {
            name: '项目类别',
            value: projectDetail.proCategoryName
        }, {
            name: '项目位置',
            value: projectDetail.proProvinceName + ',' + projectDetail.proCityName + ',' + projectDetail.proAreaName + ',' + projectDetail.proAddr
        }]
        const data3 = [{
            name: '开工时间',
            value: projectDetail.proBeginTime
        }, {
            name: '竣工时间',
            value: projectDetail.proEndTime
        }, {
            name: '项目状态',
            value: projectDetail.proStateName
        }, {
            name: '项目标签',
            value: projectDetail.proLable
        }]
        const { visible, teamVisible, workerVisible } = this.state;
        return (
            <div>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24}}>
                    <Tabs onChange={this.changeTabPane} type="card">
                        <TabPane tab="项目介绍" key="0">
                            <Card bordered={false}>
                                <List
                                    header={
                                        <div className='detail-title' >
                                            <div className='detail-w25' style={{ width: '25%'}}>信息项</div>
                                            <div className='flex1' >信息项数据</div>
                                        </div>
                                    }
                                    bordered
                                    dataSource={data1}
                                    renderItem={item => (<List.Item><div className='detail-w25' >{item.name}</div><div>{item.value}</div></List.Item>)}
                                />
                                <List
                                    bordered
                                    dataSource={data2}
                                    style={{ marginTop: '20px' }}
                                    renderItem={item => (<List.Item><div className='detail-w25' >{item.name}</div><div>{item.value}</div></List.Item>)}
                                />
                                <List
                                    bordered
                                    dataSource={data3}
                                    style={{ marginTop: '20px' }}
                                    renderItem={item => (<List.Item><div className='detail-w25' >{item.name}</div><div>{item.value}</div></List.Item>)}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="行政单位" key="QSjnnNzSgk2MnoemiQ4">
                            <Card bordered={false}>
                                <Table 
                                    columns={this.columns} 
                                    dataSource={companyList} 
                                    rowKey="id"
                                    pagination={false}
                                    locale={{emptyText: '暂无数据'}}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="建设单位" key="1HLcJSdvLFoUlld0voH">
                            <Card bordered={false}>
                                <Table 
                                    columns={this.columns} 
                                    dataSource={companyList} 
                                    rowKey="id"
                                    pagination={false}
                                    locale={{emptyText: '暂无数据'}}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="施工单位" key="7Va1tNd94LBrr0CKvc1">
                            <Card bordered={false}>
                                <Table 
                                    columns={this.columns} 
                                    dataSource={companyList} 
                                    rowKey="id"
                                    pagination={false}
                                    locale={{emptyText: '暂无数据'}}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="劳务公司" key="x1Ba1qoEhfyP6S2qTvN">
                            <Card bordered={false}>
                                <Table 
                                    columns={this.columns} 
                                    dataSource={companyList} 
                                    rowKey="id"
                                    pagination={false}
                                    locale={{emptyText: '暂无数据'}}
                                />
                            </Card>
                        </TabPane>
                    </Tabs>                   
                </Card>
                {/* 人员详情 */}
                <Modal
                    title="人员详情"
                    width="700px"
                    wrapClassName="employ-box"
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <Table 
                        columns={this.employeeColumns} 
                        dataSource={unitEmployeeList} 
                        rowKey="id"
                        pagination={false}
                        locale={{emptyText: '暂无数据'}}
                    />
                </Modal>
                {/* 班组详情 */}
                <Modal
                    title="班组详情"
                    width="700px"
                    wrapClassName="employ-box"
                    visible={teamVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    {
                        workerVisible 
                        ? 
                        <Table 
                            columns={this.workerColumns} 
                            dataSource={unitWorkerList} 
                            rowKey="id"
                            pagination={false}
                            locale={{emptyText: '暂无数据'}}
                        />
                        :
                        
                        <Table 
                            columns={this.teamColumns} 
                            dataSource={unitTeamList} 
                            rowKey="id"
                            pagination={false}
                            locale={{emptyText: '暂无数据'}}
                        />
                    }
                </Modal>
            </div>
        );
    }
    componentDidMount () {
        const id = this.props.match.params.id;
        // 获取项目详情
       this.props.projectDetailAction({proId: id});
    }
    // 切换tabs
    changeTabPane = (key) => {
        if(key !== '0') {
            if (key === '7Va1tNd94LBrr0CKvc1' || key === 'x1Ba1qoEhfyP6S2qTvN') {
                if(this.columns.length < 5){
                    this.columns.push({
                        title: '班组',
                        dataIndex: 'teamCount',
                        key: 'teamCount',
                        render: (text, record) => (
                            <span><a onClick={() => this.handleTeam(record.id)} href="javascript:;">{text}</a></span>
                        )
                    });
                }
            } else if(this.columns.length > 4){
                this.columns.splice(4,1);
            }
            const id = this.props.match.params.id;
            this.props.companyAction({
                proId: id,
                companyType: key
            });
        }
    }
    // 查看人员详情
    handleEmployee = (id) => {
        this.setState({
            visible: true
        });
        this.props.unitEmployeeAction({
            companyId: id
        });
    }
    // 查看班组详情
    handleTeam = (id) => {
        const proId = this.props.match.params.id;
        this.setState({
            teamVisible: true
        });
        this.props.unitTeamAction({
            companyId: id,
            proId
        });
    }
    // 查看工人列表
    handleWorker= (id) => {
        this.setState({
            workerVisible: true
        });
        this.props.unitWorkerAction({
            teamId: id
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            teamVisible: false,
            workerVisible: false
        });
    }
}


export default ProjectList;


