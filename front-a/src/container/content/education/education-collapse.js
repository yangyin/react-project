import React, { PureComponent } from 'react';
import { Avatar, Tag, Divider, Icon, Input, Popconfirm, Row, Col, Collapse, } from 'antd';
import { connect } from 'react-redux';

import './education.less';
import Utils from '@/utils/utils';
import { editEduLabelAddAction, editEduLabelDelAction, editEduPointAddAction, editEduPointDelAction, statusControl } from './store/actions';
const Panel = Collapse.Panel;

// 教育助手详情 题库list面板

@connect(
    state => ({
        education: state.get('education'),
    }),
    { editEduLabelAddAction, editEduLabelDelAction, editEduPointAddAction, editEduPointDelAction, statusControl }
)
class EduCollapse extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            educationInfo: {}, // 列表展开的详情数据
            analysisStutus: true, // 解析更改状态
            tagsLables: [], // 标签
            labelVisible: false, // 标签输入框显示
            labelInputValue: '',// 标签input录入
            tagsPoint: [],// 考点
            pointVisible: false, // 考点输入框显示
            pointInputValue: '', // 考点input录入
        };
        this.editParams = {
            analysisContent: '',
            id: ''
        };
    }
    componentWillReceiveProps (nextProps) {
        const eduInfo = this.props.education.get('educationInfo');
        const nexteduInfo = nextProps.education.get('educationInfo');
        if (nexteduInfo.size !== 0 && (JSON.stringify(eduInfo) !== JSON.stringify(nexteduInfo))) {
            this.setState({
                tagsLables: nexteduInfo.lables ? nexteduInfo.lables : [],
                tagsPoint: nexteduInfo.point ? nexteduInfo.point : [],
            })
        }
    }
    // 收缩面板的点击事件
    changePopConfirm=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    // 收缩面板的取消事件
    cancelPop=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    delete = (e, id) => {
        this.props.deleteList(e, id);
    }
    // 展开面板获取详情
    panelClick = (id, type, eduInfo) => {
        this.setState({
            pointVisible: false,
            labelVisible: false,
        })
        this.editParams.id = id;
        this.props.panelClick(this.editParams.id);
        //编辑
        if (type === 'MODAL') {
            this.props.showEditModal(null, id, eduInfo);
        }
    }
    // 解析状态
    analysisStutusChange = () => {
        const { analysisStutus } = this.state;
        if (analysisStutus === false) {
            this.props.editEduQues(this.editParams)
        }
        this.setState({
            analysisStutus: !analysisStutus,
        })
    }
    // 解析修改input
    analysisChange = (e, id) => {
        this.editParams.analysisContent = Utils.replaceSpace(e.target.value);
        this.editParams.id = id;
    }
    // modal中修改 type MODAL DETAIL
    editEduMOdal = (e, id, eduInfo) => {
        e.preventDefault();
        e.stopPropagation();
        this.panelClick(id, 'MODAL', eduInfo);
    }
    /**
     * 标签新增
     */
    showInput = () => {
        this.setState({ labelVisible: true }, () => this.input.focus());
    }
    labelSaveInputRef = input => this.input = input
    // 提交标签数据
    handleInputConfirm = (id) => {
        const { labelInputValue } = this.state;
        if (typeof (id) === 'string' && labelInputValue) {
            const labelAdd = {
                id,
                label: labelInputValue
            }
            this.setState({
                labelVisible: false,
                labelInputValue: '',
            });
            this.props.editEduLabelAddAction(labelAdd);
        }

    }
    // 标签 input onchange
    labelHandleInputChange = (e) => {
        let valueLabelInput = Utils.replaceSpace(e.target.value);
        this.setState({ labelInputValue: valueLabelInput });
    }
    // 标签删除
    labelHandleClose = (tagId, itemId) => {
        const labelDelParam = { id: itemId, labelId: tagId };
        this.props.editEduLabelDelAction(labelDelParam);
    }

    /**
     * 考点新增 
     */
    showInputPoint = () => {
        this.setState({ pointVisible: true }, () => this.pointInput.focus());
    }
    labelSaveInputRefPoint = input => this.pointInput = input
    // 提交标签数据
    handleInputConfirmPoint = (id) => {
        const { pointInputValue } = this.state;
        if (typeof (id) === 'string' && pointInputValue) {
            const pointAddParams = { id, point: pointInputValue }
            this.setState({
                pointVisible: false,
                pointInputValue: '',
            });
            this.props.editEduPointAddAction(pointAddParams);
        }
    }
    // 标签 input onchange   
    labelHandleInputChangePoint = (e) => {
        let valuePointInput = Utils.replaceSpace(e.target.value);
        this.setState({ pointInputValue: valuePointInput });
    }
    // 标签删除 
    labelHandleClosePoint = (tagId, itemId) => {
        const pointDelParam = {
            id: itemId,
            pointId: tagId
        };
        this.props.editEduPointDelAction(pointDelParam);
    }
    render () {
        const { educationList } = this.props;

        const { analysisStutus, tagsLables, labelVisible, labelInputValue,
            tagsPoint, pointVisible, pointInputValue } = this.state;
        const educationInfo = this.props.education.get('educationInfo')
        const { option } = educationInfo;
        let options = [];
        if (option) { options = Utils.jsonToMap(JSON.stringify(option)); }
        return (
            <div className="question_list">

                <Collapse accordion onChange={this.panelClick}>
                    {educationList.map((item, i) => {
                        return (
                            <Panel
                                header={
                                    <div>
                                        <Row>
                                            <Col span={4}>
                                                <span className="blue">#{item.answerNo}</span>
                                            </Col>
                                            <Col span={5}>
                                                题型：{item.type === '1' ? '单选' : item.type === '0' ? '多选' : '阅读'}
                                            </Col>
                                            <Col span={5}>难度值：{item.difficulty}</Col>
                                            <Col span={6}>
                                                解析：
                                {!item.analysisContent
                                                    ? '未录'
                                                    : `( ${item.analysisContent.substring(0, 15)} )`}
                                            </Col>
                                            <Col span={4}>
                                                <Popconfirm onCancel={this.cancelPop} onClick={this.changePopConfirm} className='colorBlue' title="确认剔除该条数据?" onConfirm={e => this.delete(e, item.id)}>
                                                    剔除
                                                </Popconfirm>
                                                <Divider type="vertical" />
                                                <a  onClick={e => this.editEduMOdal(e, item.id, educationInfo)}>编辑</a>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                key={item.id}
                            >
                                {Object.keys(educationInfo).length > 0 && <div>
                                    <p>题干：{educationInfo.stem}</p>
                                    <Row className="answerList">
                                        {options.map((answer, m) => {
                                            let colNode = '';
                                            if (!Utils.checkIsImg(answer.value)) {
                                                colNode = (
                                                    <Col span={12} key={m}>
                                                        {answer.key}. {answer.value}
                                                    </Col>
                                                );
                                            } else {
                                                colNode = (
                                                    <Col span={12} key={m}>
                                                        {answer.key}.{' '}
                                                        <Avatar
                                                            shape="square"
                                                            size={68}
                                                            icon="user"
                                                            src={answer.value}
                                                        />
                                                    </Col>
                                                );
                                            }
                                            return colNode;
                                        })}
                                    </Row>
                                    <p>
                                        正确答案：{educationInfo.answer ? educationInfo.answer.split('#DYQ$').join(',') : null}
                                    </p>

                                    <Row style={{ marginBottom: 16 }}>
                                        <Col span={1}>解析:</Col>
                                        <Col span={5}>
                                            <Input maxLength={1000} onChange={(e) => this.analysisChange(e, educationInfo.id)} addonAfter={<Icon type="edit" onClick={this.analysisStutusChange} />}
                                            disabled={analysisStutus} 
                                            defaultValue={educationInfo.analysisContent ? educationInfo.analysisContent:'未录'} />
                                            {/* defaultValue={educationInfo.analysisContent}/> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            标签： {tagsLables.map((tag, index) => {
                                                const tagElem = (
                                                    <Tag key={index} closable={true} afterClose={() => this.labelHandleClose(tag.id, item.id)}>
                                                        {tag.name}
                                                    </Tag>
                                                );
                                                return tagElem;
                                            })}
                                            {labelVisible && (
                                                <Input
                                                    ref={this.labelSaveInputRef}
                                                    type="text"
                                                    size="small"
                                                    maxLength={8}
                                                    style={{ width: 150 }}
                                                    value={labelInputValue}
                                                    defaultValue={labelInputValue}
                                                    onChange={this.labelHandleInputChange}
                                                    onBlur={() => this.handleInputConfirm(item.id)}
                                                    onPressEnter={this.handleInputConfirm}
                                                />
                                            )}
                                            {!labelVisible&&tagsLables.length < 3 && (
                                                <Tag
                                                    onClick={this.showInput}
                                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                                >
                                                    <Icon type="plus" />新增标签
                                                </Tag>
                                            )}
                                        </Col>
                                        <Col span={12}>
                                            考点： {tagsPoint.map((tag, index) => {
                                                const tagElem = (
                                                    <Tag key={index} closable={true} afterClose={() => this.labelHandleClosePoint(tag.id, item.id)}>
                                                        {tag.name}
                                                    </Tag>
                                                );
                                                return tagElem;
                                            })}
                                            {pointVisible && (
                                                <Input
                                                    ref={this.labelSaveInputRefPoint}
                                                    type="text"
                                                    size="small"
                                                    maxLength={8}
                                                    style={{ width: 150 }}
                                                    value={pointInputValue}
                                                    onChange={this.labelHandleInputChangePoint}
                                                    onBlur={() => this.handleInputConfirmPoint(item.id)}
                                                    onPressEnter={this.handleInputConfirmPoint}
                                                />
                                            )}
                                            {!pointVisible&&tagsPoint.length < 3 && (
                                                <Tag
                                                    onClick={this.showInputPoint}
                                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                                >
                                                    <Icon type="plus" />新增考点
                                                </Tag>
                                            )}
                                        </Col>
                                    </Row>
                                </div>}
                            </Panel>
                        );
                    })
                    }
                </Collapse>

            </div>
        );
    }
}

export default EduCollapse;






