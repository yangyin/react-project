import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Select, DatePicker, Collapse, Button, List, Progress, Icon, Modal, Radio, Input } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import './task-manage.less';
import Panel from '../../../components/panel/panel';
import CollapseComp from '../../../components/collapse/collapse';
import { taskManageAll } from '../../../redux/taskManage.redux';

const FormItem = Form.Item;
const Option = Select.Option;
const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;
const RadioGroup = Radio.Group;
const Search = Input.Search;

@connect(
    state => state.taskManage,
    { taskManageAll }
)
@Form.create()
class TaskManage extends Component {
    constructor(props) {
        super(props);
        this.props.taskManageAll();
        // console.log(this.props)
        this.state = {
            planBeginTime: null,
            planEndTime: null,
            endOpen: false,
            visible: false,
            modalData: null,
            modalRadioValue:1
        }
    }
    /**
     * 点击表单，设值
     */
    handleChange(key, v) {
        console.log(key, v)
        this.setState({
            [key]: v
        })
        // e.stopPropagation();
    }
    /**
     * 展开组件的头部render函数
     */
    headerNode = () => {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const ColLayout1 = {
            xs: 24,
            sm: 6,
            md: 4
        };
        const ColLayout2 = {
            xs: 24,
            sm: 8,
            md: 8
        };
        const { responsibleList, teamList, bidsList } = this.props;
        return (
            <Form layout="horizontal">
                <Row gutter={24}>
                    <Col {...ColLayout2}>
                        <FormItem
                            {...formItemLayout2}
                            label="按负责人"
                        >
                            <Select
                                mode="multiple"
                                id="select-name"
                                style={{ width: '100%' }}
                                placeholder="请选择负责人姓名"
                                // defaultValue={['a10', 'c12']}
                                onChange={(v) => this.handleChange('taskManagerList', v)}
                            >
                                {
                                    responsibleList.map(item => (
                                        <Option key={item.id} value={item.id}>{item.text}</Option>
                                    ))
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col {...ColLayout1}>
                        <FormItem
                            {...formItemLayout}
                            label="所属标段"
                        >
                            <Select defaultValue="请选择" onChange={(v) => this.handleChange('sectionId', v)}>
                                {
                                    bidsList.map(item => (
                                        <Option key={item.id} value={item.id}>{item.sectionName}</Option>
                                    ))
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col {...ColLayout1}>
                        <FormItem
                            {...formItemLayout}
                            label="项目班组"
                        >
                            <Select defaultValue="请选择" onChange={(v) => this.handleChange('team', v)}>
                                <Option value="">请选择</Option>
                                {teamList.map(item => (
                                    <Option key={item.teamId} value={item.teamId}>{item.teamName}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
    /**
     * 约束开始时间不能大于结束时间
     */
    disabledStartDate = (startValue) => {
        const endValue = this.state.planEndTime;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.planBeginTime;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    /**
     * 渲染列表 进度条
     */
    progressRender = (data) => {
        let obj = {};
        switch (data.taskState) {
            case 'gyI4hLViVpsdf59akAL':
                obj = {
                    title: <Progress percent={0} />,
                    desc: '待分配'
                }
                break;
            case 'gyI4hLViVpswd59akAL':
                obj = {
                    title: <Progress percent={parseInt(data.progress,10)} status="active" />,
                    desc: `剩余时间：${data.remainingDays}天`
                }
                break;
            case 'gyI4hLViVpdfg59akAL':
                obj = {
                    title: <Progress percent={parseInt(data.progress,10)} status="exception" />,
                    desc: `逾期或关闭`
                }
                break;
            case 'gyI4hLViVprty59akAL':
                obj = {
                    title: <Progress percent={parseInt(data.progress,10)} status="success" />,
                    desc: `按时完成`
                }
                break;
            default:
                break;
        }
        return (
            <ListItemMeta title={obj.title} description={obj.desc} />
        )
    }
    /**
     * 显示模态框 及 模态框的操作
     */
    showModal = (item) => {
        this.setState({
            visible: true,
            modalData: item
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    modalRadioChange = (e) => {
        this.setState({
            modalRadioValue: e.target.value,
        });
    }
    radioToInput = () =>{
        const val = this.state.modalRadioValue;
        let str = null;
        switch(val) {
            case 1:
                str = <Search
                    placeholder="请搜索选择"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
                break;
            case 2:
                str = <Search
                placeholder="请搜索选择"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
            break;
        }
        return str;
    }

    render() {
        console.log(this.props)

        const panelData = { pathname: '任务 /任务管理', title: '任务管理', desc: '普通用户是指注册本系统的个人用户，包含不限于商家管理员或系统管理员等账户。' }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const ColLayout1 = {
            xs: 24,
            sm: 6,
            md: 4
        };

        const { taskStatus, taskList, manageList } = this.props;
        const { modalData } = this.state;
        // const text = this.headerDOM();
        return (
            <div>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24, marginBottom: 0 }}>
                    <CollapseComp headerNode={this.headerNode()}>
                        <Form layout="horizontal" style={{ marginTop: 24 }}>
                            <Row gutter={24}>
                                <Col {...ColLayout1}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务状态"
                                    >
                                        <Select defaultValue="请选择" onChange={(v) => this.handleChange('taskState', v)}>
                                            <Option value="">请选择</Option>
                                            {taskStatus.map(item => (
                                                <Option key={item.categoryId} value={item.categoryId}>{item.categoryValue}</Option>
                                            ))}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col {...ColLayout1}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务类型"
                                    >
                                        <Select defaultValue="请选择" onChange={(v) => this.handleChange('taskType', v)}>
                                            <Option value="">请选择</Option>
                                            {taskList.map(item => (
                                                <Option key={item.id} value={item.id}>{item.taskTypeName}</Option>
                                            ))}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col {...ColLayout1}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="开始时间"
                                    >
                                        <DatePicker
                                            disabledDate={this.disabledStartDate}
                                            onChange={(v) => this.handleChange('planBeginTime', moment(v))}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    </FormItem>
                                </Col>
                                <Col {...ColLayout1}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="结束时间"
                                    >
                                        <DatePicker
                                            disabledDate={this.disabledEndDate}
                                            format="YYYY-MM-DD"
                                            onChange={(v) => this.handleChange('planEndTime', v)}
                                            open={this.state.endOpen}
                                            onOpenChange={this.handleEndOpenChange} />
                                    </FormItem>
                                </Col>
                                <Col {...ColLayout1}>
                                    <FormItem
                                        {...formItemLayout}
                                    >
                                        <Button>筛选</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </CollapseComp>
                </Card>
                <Card bordered={false} style={{ margin: 24 }}>
                    <List
                        bordered
                        pagination={true}
                        dataSource={manageList.rows}
                        renderItem={item => (
                            <ListItem actions={[<a onClick={() => this.showModal(item)}>分配</a>, <Link to={{pathname:`/sdpbusiness/common/taskManage/details?params=${JSON.stringify(item)}`}}>详情<Icon type="down" theme="outlined" /></Link>]}>
                                <ListItemMeta title={item.taskNo} />
                                <ListItemMeta title={item.describeStr} />
                                <ListItemMeta title="负责人" description={item.taskManagerName} />
                                <ListItemMeta title="执行人" description={item.performName} />
                                <ListItemMeta title="计划时间" description={item.planDays + '天'} />
                                <ListItemMeta title="人力计划(人数)" description={item.peopleNum + '人'} />
                                <ListItemMeta title="任务造价" description={item.taskCost < 1 ? '--万' : item.taskCost + '万'} />
                                {
                                    this.progressRender(item)
                                }
                            </ListItem>
                        )}
                    />
                </Card>
                <Modal
                    title="分配任务"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Card bordered={false} style={{ paddingTop: 0 }} bodyStyle={{ paddingTop: 0 }}>
                        {modalData ? (
                            <div>
                                <Row gutter={24} style={{ borderBottom: '1px solid #ddd', paddingBottom: 10, marginBottom: 10 }}>
                                    <Col span={12}>项目名称： <span>{modalData.proName}</span></Col>
                                    <Col span={12}>任务类型： <span>{modalData.taskTypeName}</span></Col>
                                    <Col span={12}>标段模块： <span>{modalData.sectionName ? modalData.sectionName : '--'}</span></Col>
                                    <Col span={12}>负责人： <span>{modalData.taskManagerName}</span></Col>
                                    <Col span={12}>{modalData.taskNo} <span>{modalData.describeStr}</span></Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={4}>分配给</Col>
                                    <Col span={6}>
                                        <RadioGroup onChange={this.modalRadioChange} value={this.state.modalRadioValue}>
                                            <Radio className="radio-style" value={1}>某一班组</Radio>
                                            <Radio className="radio-style" value={2}>负责人</Radio>
                                            <Radio className="radio-style" value={3}>我自己</Radio>
                                        </RadioGroup>
                                        
                                    </Col>
                                    <Col span={10}>
                                        {this.radioToInput()}
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col offset={4}>注意：通一任务不能分配多个执行对象</Col>
                                </Row>
                            </div>
                        ) : null
                        }
                    </Card>
                    {console.log(this.state.modalData)}
                </Modal>
            </div>
        )
    }



}

export default TaskManage;