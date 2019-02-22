import React, { PureComponent } from 'react';
import { Form, Tag, Card, Row, Col, Select, Input, Button, Pagination } from 'antd';
import TopPanel from '@/components/panel/panel';
import EduCollapse from './education-collapse';
import EduTopicAdd from './edu-details-edit';
import { connect } from 'react-redux';
import { Unauthorized } from '@/container/error-page/not-found-page';

import './education.less';
import { listAction, InfoAction, listDelAction, statusControl, editEduAction,statusControlPoint } from './store/actions';

const Option = Select.Option;
const Search = Input.Search;
// 题库类型
const questionTypeOptions = [{ name: '单选题', value: '1' }, { name: '多选题', value: '0' }, { name: '阅读题', value: '2' }];
// 难度值
const questionLevelOptions = [{ name: '1', value: '1' }, { name: '2', value: '2' }, { name: '3', value: '3' }, { name: '4', value: '4' }, { name: '5', value: '5' }];

@Form.create()
@connect(
    state => ({
        education: state.get('education'),
    }),
    { editEduAction,statusControlPoint, listAction, InfoAction, listDelAction, statusControl }
)
class Education extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            getInfoId: '',// 折叠数据对应id
            visible: false,
        }
        this.params = {
            type: '',// 类型
            difficulty: '',// 难度
            lablesOrPoint: '',// 标签考点
            eduInfo: {}, // 题目详情
            pageNum:1,
            pageSize: 10,
            modalTil:'',
        }
    }

    componentDidMount () {
        this.request();
    }
    request = () => {
        const {type,difficulty,lablesOrPoint,pageNum,pageSize}=this.params;
        const param = {type,difficulty,lablesOrPoint,pageNum,pageSize};
        this.props.listAction(param);
    }
    componentWillReceiveProps (nextProps) {
        const isRefresh = nextProps.education.get('isRefresh');
        const isRefreshPoint = nextProps.education.get('isRefreshPoint');
        if (isRefresh) {
            this.request();
            this.props.statusControl(false);
        }
        if(isRefreshPoint){
            const {getInfoId}=this.state;
            this.props.InfoAction({ id:getInfoId });
            this.props.statusControlPoint(false);
        }
    }
    handleSearch = (val) => {
        this.params.pageNum=1;
        this.params.handleSearch = val;
        this.request();
    }
    handleTypeChange = (val) => {
        this.params.pageNum=1;
        this.params.type = val;
        this.request();
    }
    handleDifficultyChange = (val) => {
        this.params.pageNum=1;
        this.params.difficulty = val;
        this.request();
    }
    // 折叠面板
    panelClick = (id) => {
        console.log('id的取值',id);
        const { getInfoId } = this.state;
        if (id && getInfoId !== id) {
            this.setState({
                getInfoId: id
            })
            this.props.InfoAction({ id });
        }
    }
    // 列表剔除
    delete = (e, id) => {
        e.stopPropagation();
        this.props.listDelAction({ id });
    };
    // 下拉render
    renderGroup = (data) => {
        return (
            data.map(item => (
                <Option key={item.value}>{item.name}</Option>
            ))
        )

    }
    // 标签修改  id analysisContent id和解析
    saveEdit = (param) => {
        this.props.editEduAction(param);
    }
    // 添加题目弹窗
    showModal = (e, id, eduInfo) => {
        this.setState({
            visible: true,
        });
        if (id) {// 编辑
            this.params.eduInfo = eduInfo;
            this.params.modalTil = 'EDIT';
        } else {
            this.params.eduInfo = {};
            this.params.modalTil='ADD';
        }
        this.props.form.resetFields();
    };
    handleClose = _ => {
        this.setState({
            visible: false,
        });
    }
    // 分页
    pageChange = (pageNumber) => {
        this.params.pageNum=pageNumber;
        this.request(this.params);
    }
    // 保存数据 有id：编辑 / 新增
    savaData=(params)=>{
        const {getInfoId}=this.state;
        this.props.editEduAction({...params,id:getInfoId});
        this.handleClose();
    }
    render () {
        const topPanelData = { title: '教育题库' };
        const listData = this.props.education.get('educationList');
        const educationList = listData.rows || [];
        const { visible } = this.state;
        const { eduInfo,modalTil } = this.params;
        const editDatas = {
            show: visible,
            eduInfo: eduInfo,
            modalTil,
        };
        const isJur = this.props.education.get('isJur');
        return (
            <React.Fragment>
                {!isJur ?
                    <div className="education">
                        <TopPanel panelData={topPanelData} />
                        <Card bordered={false} style={{ margin: 24 }}>
                            <Row className="search_filter">
                                <Col span={4}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择题型"
                                        onChange={this.handleTypeChange}
                                    >
                                        <Option key={1111} value=''>所有题型</Option>
                                        {this.renderGroup(questionTypeOptions)}
                                    </Select>
                                </Col>
                                <Col span={4}>
                                    <Select
                                        style={{ width: '100%' }}
                                        className='ml10'
                                        placeholder="请选择难度值"
                                        onChange={this.handleDifficultyChange}
                                    >
                                        <Option key={100} value=''>所有难度值</Option>
                                        {this.renderGroup(questionLevelOptions)}
                                    </Select>
                                </Col>
                                <Col span={4}>
                                    <Button onClick={this.showModal} style={{ marginLeft: 20 }} type="primary">新增题目</Button>
                                </Col>
                                <Col span={12} className='searchInput'>
                                    <Search
                                        placeholder="请输入标签或者知识考点"
                                        onSearch={this.handleSearch}
                                        style={{ width: 380 }}
                                    />
                                </Col>
                            </Row>
                            {/* 题库列表 */}
                            <EduCollapse
                                educationList={educationList}
                                editEduQues={this.saveEdit}
                                deleteList={this.delete}
                                showEditModal={this.showModal}
                                panelClick={this.panelClick} />
                            <div className='edupageBox'>
                                <Pagination showQuickJumper defaultCurrent={this.params.pageNum} total={listData.total} onChange={this.pageChange} />
                            </div>
                        </Card>
                        {/* 增加题目 */}
                        <EduTopicAdd
                            editDatas={editDatas}
                            handleClose={this.handleClose}
                            savaData={this.savaData}
                        />
                    </div>
                    : <Unauthorized />}
            </React.Fragment>
        );
    }
}
export default Education;






