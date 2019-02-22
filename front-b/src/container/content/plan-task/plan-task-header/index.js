import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { Card, Form, Select, Button, Input, Icon } from 'antd';
import { getSectionList,getProAddressBook } from './../../../../redux/findField/actions';
import { findPlanDetail,deleteDetail } from './../store/action';
import PlanTaskModal from '../plan-task-modal';

const FormItem = Form.Item;
const Option = Select.Option;

const fieldSelector = createSelector(
    state=>state,
    state => {
        let { sectionList ,proLeaderList } = state;
        if(sectionList.length > 0 && !(JSON.stringify(sectionList).includes('我负责的')) ) {
            const list = [{id:0,sectionName:'我负责的'},{id:'',sectionName:'全部标段'}]
            state.sectionList = [...list,...sectionList];
        }
        if(proLeaderList.length >0 && !(JSON.stringify(proLeaderList).includes('全部')) ) {
            let list = [{userId:'',userName:'全部'}];
            state.proLeaderList = [...list,...proLeaderList];
        }
        return state;
    }
)

@withRouter
@connect(
    state =>({
        topbar:state.topbar,
        field:fieldSelector(state.findField)
    }),
    { getSectionList,getProAddressBook ,findPlanDetail,deleteDetail}
)
@Form.create({
    onValuesChange:(props, changedValues, allValues)=>{
        // console.log(props, changedValues, allValues)
        props.handleFormChange(allValues);
    }
})
class PlanTaskHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status:[{id:'',name:'全部'},{id:'gyI4hLViVprty59akAL',name:'已完成'},{id:'gyI4hLViVpswd59akAL',name:'进行中'}],
            myPlanTask:[{id:'0',name:'我计划的'},{id:'gyI4hLViVpswd59akAL',name:'进行中'},{id:'gyI4hLViVprty59akAL',name:'已完成'}],
            //弹框数据
            visible:false,
            //编辑时，父级传入当前点击行的ID
            editCurrentId:'',
            isEdit:false //是否为编辑  编辑时，隐藏计划标题及审批人
        }
    }
    componentDidMount() {
        const { proId } = this.props.topbar;
        this.props.onRef(this);
        if(proId) {
            this.props.getSectionList(proId);
            this.props.getProAddressBook(proId);
        }
    }

    componentDidUpdate(prevProps) {
        const prevId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;

        /**
         * 判断是否切换项目，若切换项目，更新字段
         */
        if( proId && prevId != proId) {
            this.props.getSectionList(proId);
            this.props.getProAddressBook(proId);
        }
    }

    //创建计划
    planTaskAddHandle = () => {
        this.setState((prevState) => ({
            visible:true,
            editCurrentId:'',
            isEdit:false
        }))
    }
    //modal 返回数据
    handleModalChange = (data) => {
        // console.log('****',data);
        this.setState((prevState) => ({
            ...data
        }))
    }
    //父级调用方法,编辑时
    parentChangeHandle = (editCurrentId) => {
        this.setState(()=> ({
            editCurrentId,
            visible:true,
            isEdit:true
        }));
        //请求编辑详情
        this.props.findPlanDetail(editCurrentId);
    }
    //点击Icon，切换至 详情页/列表页
    handleClickIcon = () => {
        const { history , location} = this.props;
        const { pathname } = location;
        this.props.deleteDetail();
        pathname === '/sdpbusiness/task/returnPlanPage' ? history.push('/sdpbusiness/task/returnPlanDetailPage') : history.push('/sdpbusiness/task/returnPlanPage');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { sectionList,proLeaderList } = this.props.field;
        const { status,myPlanTask,visible,editCurrentId,isEdit } = this.state;
        //模态框所需数据
        let modalData = { visible,title:'创建计划',proLeaderList,editCurrentId};
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
        return (
            <Card>
                <Form layout="inline">
                    <FormItem
                        {...formItemLayout}
                        label="标段"
                    >
                        {getFieldDecorator('sectionId', {
                            rules: [],
                        })(
                            <Select
                                showSearch
                                style={{ width: 150 }}
                                placeholder="请搜索或选择标段"
                                optionFilterProp="children"
                                // onChange={}
                                // onFocus={}
                                // onBlur={}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                
                                {sectionList.map(v => (
                                    <Option value={v.id} key={v.id}>{v.sectionName}</Option>
                                ))}
                                
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="状态"
                    >
                        {getFieldDecorator('taskState', {
                            rules: [],
                        })(
                            <Select
                                style={{ width: 150 }}
                                placeholder="全部"
                                optionFilterProp="children"
                                // onChange={}
                                // onFocus={}
                                // onBlur={}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                
                                {status.map(v => (
                                    <Option value={v.id} key={v.id}>{v.name}</Option>
                                ))}
                                
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="负责人"
                    >
                        {getFieldDecorator('taskManagerId', {
                            rules: [],
                        })(
                            <Select
                                showSearch
                                style={{ width: 180 }}
                                placeholder="请搜索或选择负责人"
                                optionFilterProp="children"
                                // onChange={}
                                // onFocus={}
                                // onBlur={}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                
                                {proLeaderList.map(v => (
                                    <Option value={v.userId} key={v.userId}>{v.userName}</Option>
                                ))}
                                
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label=" "
                        colon={false}
                    >
                        {getFieldDecorator('paramName', {
                            rules: [],
                        })(
                            <Input suffix={<Icon type="search" style={{cursor:'pointer'}}/>} placeholder="请输入编号或者计划名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                    >
                        <Button onClick={this.planTaskAddHandle}>创建计划</Button>
                    </FormItem>
                    <FormItem  {...formItemLayout} label=" " colon={false} style={{marginRight:10,float:"right"}}><Icon onClick={this.handleClickIcon} type="menu-unfold" theme="outlined" style={{fontSize:20,marginTop:10,cursor:'pointer'}} /></FormItem>
                    <FormItem
                        {...formItemLayout}
                        label=" "
                        colon={false}
                        style={{float:"right",marginRight:50}}
                    >
                        {getFieldDecorator('myPlanTask', {
                            rules: [],
                        })(
                            <Select
                                style={{ width: 150 }}
                                placeholder="我计划的"
                                optionFilterProp="children"
                                // onChange={}
                                // onFocus={}
                                // onBlur={}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                
                                {myPlanTask.map(v => (
                                    <Option value={v.id} key={v.id}>{v.name}</Option>
                                ))}
                                
                            </Select>
                        )}
                    </FormItem>  
                </Form>
                <PlanTaskModal data={modalData} handleChange={this.handleModalChange} isEdit={isEdit}/>
            </Card>
        )
    }
}

export default PlanTaskHeader;