import React, { Component } from 'react';
import { Table, Divider, Modal, Row, Col, InputNumber } from 'antd';
import { connect } from 'react-redux';
import Utils from './../../../../utils/utils';

import Panel from './../../../../components/panel/panel';
import Header from '../plan-task-header';
import { Unauthorized } from './../../../error-page/not-found-page';

import { getTaskList, jurisdictionStatus, planDelete, planDeleteStatus ,updatePlanRateAction,updatePlanRateStatus} from '../store/action';


const panelData = { title: '任务计划' };


@connect(
    state => ({
        topbar: state.topbar,
        planTask: state.planTask
    }),
    { getTaskList, jurisdictionStatus, planDelete, planDeleteStatus ,updatePlanRateAction,updatePlanRateStatus}
)
class PlanTaskListPage extends Component {

    constructor(props) {
        super(props);

        //列表数据
        this.params = {
            pageNum: 1,
            pageSize: 10,
            sectionId: '', taskState: '', taskManagerId: '', paramName: '', myPlanTask: ''

        }
        this.state = {
            proId: '',
            visible: false,
            inputVal: 0,
            taskId:''
        }
        this.columns = [
            { title: '编号', dataIndex: 'taskNo', align: 'center' },
            { title: '单项计划名称', dataIndex: 'taskName', align: 'center' },
            { title: '标段区域', dataIndex: 'sectionName', align: 'center' },
            { title: '负责人', dataIndex: 'taskManager', align: 'center' },
            { title: '状态', dataIndex: 'state', align: 'center' },
            { title: '创建日期', dataIndex: 'createTime', align: 'center' },
            { title: '到期日期', dataIndex: 'planEndTime', align: 'center' },
            { title: '耗费时间（天）', dataIndex: 'costDays', align: 'center' },
            { title: '剩余时间（天）', dataIndex: 'remainingDays', align: 'center' },
            {
                title: '任务进度', dataIndex: 'rate', align: 'center', render: (text,record) => (
                    <a href="javascript:;" onClick={() => this.handleRateClick(record)}>{text}%</a>
                )
            },
            {
                title: '操作', key: 'action', align: 'center', render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => this.handleEdit(record)}>编辑</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.handleDelect(record)}>删除</a>
                    </span>
                )
            }
        ];
    }
    //点击进度
    handleRateClick = ({id,rate}) => {
        // console.log(record)
        this.setState({
            visible: true,
            inputVal: Number(rate),
            taskId:id
        });
    }
    //点击编辑
    handleEdit = (data) => {
        // console.log(data,this.child)
        this.child.parentChangeHandle(data.id);
    }
    //删除
    handleDelect = (data) => {
        const { proId } = this.props.topbar;
        this.props.planDelete(data.id, proId);
    }
    componentDidMount() {
        const { proId } = this.props.topbar;
        if (proId) {
            this.request();
        }

    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;
        const { isMark, isPlanDelete, taskList ,isUpdate} = this.props.planTask;

        if ((proId && prevId !== proId) || !!isMark) {
            this.params.pageNum = 1;
            this.request();
        }

        if(isUpdate) {
            this.props.updatePlanRateStatus(false);
            this.setState({
                visible:false
            });
            this.request();
        }
        /**
         * 判断删除任务，成功时，更改isPlanDelete状态，并且刷新界面
         */
        if (isPlanDelete === true) {
            this.props.planDeleteStatus(false);
            if (taskList.rows.length === 1 && this.params.pageNum > 1) {
                this.params.pageNum = this.params.pageNum - 1;
            }
            this.request();
        }
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    //请求列表
    request = () => {
        // console.log(this.params)
        let { sectionId, taskState, taskManagerId, paramName, myPlanTask, pageSize, pageNum } = this.params;
        // let { pageNum } = this.params;
        const { proId } = this.props.topbar;
        this.props.getTaskList({ proId, sectionId, taskState, taskManagerId, paramName, myPlanTask, pageSize, pageNum });
    }

    //头部Form表单变化时，触发
    handleFormChange = (params) => {
        this.params = { ...this.params, ...params };
        this.request();
    }

    render() {
        const { taskList, isJurisdiction } = this.props.planTask;
        return (
            <div>
                {isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Header handleFormChange={this.handleFormChange} onRef={(el) => this.child = el} />
                    <Table style={{ background: '#fff' }}
                        rowKey="taskNo"
                        columns={this.columns}
                        dataSource={taskList.rows}
                        locale={{ emptyText: '暂无数据' }}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    // console.log(record)
                                }
                            }
                        }}
                        pagination={
                            Utils.pagination({ ...taskList, pageNum: this.params.pageNum }, (current) => {
                                this.params.pageNum = current;
                                this.request();
                            })
                        }
                    />
                    <Modal
                        title="任务进度修改"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Row gutter={24} type="flex" align='middle'>
                            <Col span={6}>任务进度</Col>
                            <Col span={10}>
                                <InputNumber
                                    value={this.state.inputVal}
                                    min={0}
                                    max={100}
                                    style={{ width: 150 }}
                                    onChange={this.handleInputChange}
                                /> %
                            </Col>
                        </Row>
                    </Modal>
                </React.Fragment>
                : <Unauthorized />}

            </div>
        )
    }
    //进度输入框改变时
    handleInputChange = (value) => {
        this.setState({
            inputVal: value
        })
    }
    //提交保存进度
    handleOk = () => {
        const { taskId,inputVal} = this.state;
        this.props.updatePlanRateAction({
            taskId,rate:inputVal
        })
    }
    //关闭进度弹窗
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
}

export default PlanTaskListPage;