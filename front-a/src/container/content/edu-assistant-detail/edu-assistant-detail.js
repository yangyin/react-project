import React, { PureComponent } from 'react';
import { Avatar, Icon, Tag, Radio, Card, Row, Col, Select, Input, Button, Collapse, Form, } from 'antd';
import TopPanel from '@/components/panel/panel';
import { connect } from 'react-redux';
import EduAssisCollapse from './edu-assis-collapse';
import EduTopicAdd from './edu-details-edit';

import './edu-assistant.less';
import Utils from '@/utils/utils';
import { listAction, eduAssisSaveAction, operationStatus, listDelAction } from './store/actions';

// const EduTopicAdd = React.lazy(() => import('./edu-details-edit'));
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
@connect(
    state => ({
        eduAssisDetail: state.get('eduAssisDetail'),
    }),
    { listAction, eduAssisSaveAction, operationStatus, listDelAction }
)
class Education extends PureComponent {
    constructor(props) {
        super(props);
        const searchStr = this.props.location.search;
        const { programId } = Utils.linkParamsToObj(searchStr);
        this.state = {
            text: '合格分值',
            score: 0,
            visible: false,
            type: 1, // 计分方式
            rightOrWrong: 0, //按对错积分
            qualified: 0, //按比例积分
            tips: true,
            itemId: [], //增加的题目id
        };
        this.params = {
            programId, // url中的项目id
            idList: [],
        }
    }

    componentDidMount () {
        this.request();
    }
    request = () => {
        // 获取列表
        const { programId } = this.params;
        this.props.listAction({ programId })
    }
    componentWillReceiveProps (nextProps) {
        // 根据状态进行初始化操作
        const isRefresh = nextProps.eduAssisDetail.get('isRefresh');
        const educationDetails = nextProps.eduAssisDetail.get('educationInfo');
        const currentDetails = this.props.eduAssisDetail.get('educationInfo');
        const { scoringMethod, qualifiedProportion, eachSorce } = educationDetails;
        if (isRefresh) {
            this.request();
            this.props.operationStatus(false);
        }
        // 计分方式对应显示
        if (educationDetails && Array.isArray(educationDetails.answers) &&
            currentDetails && Array.isArray(currentDetails.answers)) {
            // 设置及格分数格式（分数，百分比）
            this.setState(() => ({
                type: Number(scoringMethod),
                score: scoringMethod === '1' ? eachSorce : qualifiedProportion,
                rightOrWrong: eachSorce,
                qualified: qualifiedProportion,
            }));
        }

        // 组装已选题目itemId tag
        if (JSON.stringify(educationDetails.answers) !== JSON.stringify(currentDetails.answers)) {
            this.setState({
                itemId: educationDetails.answers.map(item => {
                    this.params.idList.push({
                        anserId: item.anserId,
                        answerNo: item.answerNo,
                    });
                    return item;
                }),
            });
        }
    }

    handleSearch = (val) => {
        this.params.handleSearch = val;
        this.request();
    }
    handleTypeChange = (val) => {
        this.params.type = val;
        this.request();
    }
    handleDifficultyChange = (val) => {
        this.params.difficulty = val;
        this.request();
    }
    // 列表剔除
    delete = (e, id) => {
        e.stopPropagation();
        const { programId } = this.params;
        const params = {
            programId: programId,
            answerId: id,
        };
        this.props.listDelAction(params);
    };
    // 计分方式单选框事件
    /**
     * 1 按对错 rightOrWrong
     * 2 合格比例 qualified
     */
    onChange = e => {
        const val = e.target.value;
        const { qualified, rightOrWrong } = this.state;
        this.setState({
            type: val,
            text: val === 2 ? '合格比例' : '合格分值',
            score: val === 2 ? qualified : rightOrWrong,
        });
        this.props.form.setFields({ planScore: { value: val === 2 ? qualified : rightOrWrong } })
    };
    // 保存方案
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { itemId, rightOrWrong, qualified } = this.state;
                const { planName, planMark, planType, planScore } = values;
                const { programId } = this.params;
                let answerList = [];
                itemId.map((item, i) => {
                    answerList.push({
                        anserId: item.anserId,
                    });
                    return item;
                });
                const params = {
                    programId: programId,
                    programName: planName,
                    programContent: planMark,
                    scoringMethod: planType,
                    eachSorce: planType === 1 ? planScore : rightOrWrong,
                    qualifiedProportion: planType === 2 ? planScore : qualified,
                    answerList: JSON.stringify(answerList),
                };
                this.props.eduAssisSaveAction(params);
            }
        });
    };
    // 删除提示
    closeTips = () => {
        this.setState({
            tips: false,
        });
    };
    // 添加题目弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    // 子组件操作父组件显示隐藏弹窗
    handleShow = event => {
        this.setState({
            visible: false,
        });
    };
    // 子组件操作父组件显示隐藏弹窗
    handleAdd = options => {
        const contactArr = this.state.itemId.concat(options);
        // 去除重复数据
        let newArr = [];
        let obj = {};
        for (let i = 0; i < contactArr.length; i++) {
            if (!obj[contactArr[i].anserId]) {
                newArr.push(contactArr[i]);
                obj[contactArr[i].anserId] = true;
            }
        }
        this.setState({
            itemId: newArr,
        });
        this.handleShow();
    };
    render () {
        const topPanelData = { title: '教育助手详情', isBack: true };
        // 教育方案题库列表
        const educationDetails = this.props.eduAssisDetail.get('educationInfo');
        const listeducationList = educationDetails.answers || [];
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 17 },
        };
        const { getFieldDecorator } = this.props.form;
        const {text, visible, tips, score, itemId, type} = this.state;
        const editDatas = {
            show: visible,
            itemId:itemId,
          };
        return (
            <div className="eduAssistant">
                <TopPanel panelData={topPanelData} />
                <div className="content form-content">
                    <Row>
                        <Form onSubmit={this.handleSubmit}>
                            <Col span={4}>
                                <label>方案名称</label>
                            </Col>
                            <Col span={8}>
                                <FormItem label="" {...formItemLayout}>
                                    {getFieldDecorator('planName', {
                                        initialValue: educationDetails
                                            ? educationDetails.programName
                                            : '请输入方案名称',
                                        rules: [{ required: true, message: '方案名称必填!' }],
                                    })(<Input maxLength="15" />)}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <label>方案备注</label>
                            </Col>
                            <Col span={8}>
                                <FormItem label="" {...formItemLayout}>
                                    {getFieldDecorator('planMark', {
                                        initialValue: educationDetails
                                            ? educationDetails.programContent
                                            : '请输入备注名称',
                                        rules: [],
                                    })(<Input maxLength="15" />)}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <label>计分方式</label>
                            </Col>
                            <Col span={8}>
                                <FormItem label="" {...formItemLayout}>
                                    {getFieldDecorator('planType', {
                                        initialValue: type,
                                        rules: [],
                                    })(
                                        <RadioGroup onChange={this.onChange}>
                                            <Radio value={1}>按对错记分</Radio>
                                            <Radio value={2}>按合格比例记分</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <label>{this.state.text}</label>
                            </Col>
                            <Col span={8}>
                                <FormItem label="" {...formItemLayout}>
                                    {getFieldDecorator('planScore', {
                                        initialValue: score,
                                        rules: [
                                            {
                                                required: false,
                                                message: '请输入正确的分值！',
                                            },
                                            {
                                                validator: Utils.validPercent,
                                            },
                                        ],
                                    })(<Input onChange={this.handleScore} />)}

                                    <span className="educ-type">
                                        {text === '合格分值' ? '' : '%'}
                                    </span>
                                </FormItem>
                            </Col>
                            {tips
                                ? <Col span={24}>
                                    <div className="education-tips">
                                        <Icon type="exclamation-circle" />
                                        您添加的题目分值默认5分，最多可以添加20题，至少添加1题；答题时间默认8小时，如果答题者超过8小时未答完，则不合格
                        <Icon
                                            type="close"
                                            onClick={this.closeTips}
                                            className="tips-close"
                                        />
                                    </div>
                                </Col>
                                : null}
                            <Col span={4}>
                                <label>已选题目</label>
                            </Col>
                            <Col span={20}>
                                <div className="edu-title">
                                    <div className="edu-title-num">
                                        {itemId.map((item, i) => {
                                            return <span key={i}>#{item.answerNo}</span>;
                                        })}
                                    </div>
                                    <Icon hidden={itemId.length > 19 ? true : false} type="plus-square" onClick={this.showModal} />
                                </div>
                            </Col>
                            <Col span={4} />
                            <Col span={20}>
                                <Button type="primary" htmlType="submit">保存</Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
                <Card bordered={false} style={{ margin: 24 }}>
                    <EduAssisCollapse
                        collapseData={listeducationList}
                        deleteList={this.delete} />
                </Card>
                <EduTopicAdd
                    editDatas={editDatas}
                    handleShow={this.handleShow.bind(this)}
                    handleAdd={this.handleAdd}
                />
            </div>
        );
    }
}


export default Education;






