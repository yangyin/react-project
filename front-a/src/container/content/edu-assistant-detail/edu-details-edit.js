import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Modal,
    Collapse,
    Checkbox,
    Avatar,
    Row,
    Col,
    Tabs,
} from 'antd';
import { modalTopicsAction } from './store/actions';
import './edu-assistant.less';
import Utils from '@/utils/utils';
import { notification } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;


@connect(
    state => ({
        eduAssisDetail: state.get('eduAssisDetail'),
    }),
    { modalTopicsAction }
)
class EduTopicAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            labelParam: '',
            difficulty: '',
            examinationPoint: '',
            answerType: 'listSingle',
            idItem: [],
            listSingle: [], // 单选列表
            listMultiple: [], // 多选列表
            listReading: [], // 阅读列表
        };
        this.ids = [];
    }
    componentDidMount () {
        const { labelParam, difficulty, examinationPoint, answerType } = this.state;
        const params = {
            pageNum: 1,
            pageSize: 10,
            labelParam,
            difficulty,
            examinationPoint,
            answerType,
        };
        this.props.modalTopicsAction(params);
    }
    componentWillUpdate () {
        const visible = this.props.editDatas.show;
        if (!visible) {
            return false;
        } else {
            return true;
        }
    }
    componentWillReceiveProps (nextProps) {
        const listSingle = nextProps.eduAssisDetail.get('listSingle');
        const listMultiple = nextProps.eduAssisDetail.get('listMultiple');
        const listReading = nextProps.eduAssisDetail.get('listReading');
        const { itemId } = this.props.editDatas;
        const { answerType } = this.state;

        // 初始化数据未选中状态
        if (
            answerType === 'listSingle' &&
            JSON.stringify(listSingle) !== JSON.stringify(this.state.listSingle)
        ) {
            this.setState(() => ({
                listSingle: listSingle.map(v => {
                    v.ischecked = false;
                    if (JSON.stringify(itemId).includes(v.anserId)) {
                        v.isDisabled = true;
                    } else {
                        v.isDisabled = false;
                    }
                    return v;
                }),
            }));
        }
        if (
            answerType === 'listMultiple' &&
            JSON.stringify(listMultiple) !== JSON.stringify(this.state.listMultiple)
        ) {
            this.setState(() => ({
                listMultiple: listMultiple.map(v => {
                    v.ischecked = false;
                    if (JSON.stringify(itemId).includes(v.anserId)) {
                        v.isDisabled = true;
                    } else {
                        v.isDisabled = false;
                    }
                    return v;
                }),
            }));
        }
        if (
            answerType === 'listReading' &&
            JSON.stringify(listReading) !== JSON.stringify(this.state.listReading)
        ) {
            this.setState(() => ({
                listReading: listReading.map(v => {
                    v.ischecked = false;
                    if (JSON.stringify(itemId).includes(v.anserId)) {
                        v.isDisabled = true;
                    } else {
                        v.isDisabled = false;
                    }
                    return v;
                }),
            }));
        }
    }
    componentDidUpdate (prevProps) { }
    itemRender = data => {
        if(data){
        return data&&data.length > 0
            ? data.map((item, i) => {
                return (
                    <Panel
                        header={
                            <div>
                                <Row>
                                    <Col span={4}>
                                        <span className="blue">
                                            #{item.answerNo}
                                        </span>
                                    </Col>
                                    <Col span={14}>
                                        解析：
                      {!item.analysisContent
                                            ? '未录'
                                            : `( ${item.analysisContent.substring(0, 15)} )`}
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox
                                            checked={item.ischecked}
                                            disabled={item.isDisabled}
                                            onChange={e => this.joinTopic(item, i, e)}
                                        >
                                            加入
                      </Checkbox>
                                    </Col>
                                </Row>
                            </div>
                        }
                        key={i}
                    >
                        <div>
                            <p>题干：{item.answerStem}</p>
                            <Row className="answerList">
                                {item.answerOption
                                    ? Utils.jsonToMap(item.answerOption).map((answer, m) => {
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
                                                    {answer.key}
                                                    .
                              {' '}
                                                    <Avatar
                                                        shape="square"
                                                        size={100}
                                                        icon="user"
                                                        src={answer.value}
                                                    />
                                                </Col>
                                            );
                                        }
                                        return colNode;
                                    })
                                    : null}
                            </Row>
                            <p>
                                正确答案：
                  {item.answer ? item.answer.split('#DYQ$').join(',') : ''}
                            </p>
                        </div>
                    </Panel>
                );
            })
            : null;
        }else{
            return false;
        }
    };
    render () {
        const { listSingle, listMultiple, listReading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        return (
            <div>
                <Modal
                    title="添加题目"
                    visible={this.props.editDatas.show}
                    width={640}
                    bodyStyle={{
                        height: 520,
                        overflowY: 'auto',
                    }}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="提交"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="测试难度" hasFeedback>
                            <Select
                                placeholder="请选择题目难度"
                                onChange={this.selectChange}
                                notFoundContent="暂无数据"
                            >
                                <Option value="">请选择题目难度</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} label="题目标签" hasFeedback>
                            <Search placeholder="请搜索题目标签" onSearch={this.searchLabelParam} />
                        </FormItem>
                        <FormItem {...formItemLayout} label="题目考点" hasFeedback>
                            <Search placeholder="请搜索题目考点" onSearch={this.searchPoint} />
                        </FormItem>
                        <FormItem {...formItemLayout} label="测试类型" hasFeedback>

                            <Tabs
                                tabPosition="top"
                                defaultActiveKey={this.state.answerType}
                                onChange={this.answerType}
                                activeKey={this.state.answerType}
                            >

                                <TabPane tab="单选题" key="listSingle">
                                    <Collapse accordion>
                                        {listSingle&&this.itemRender(listSingle)}
                                    </Collapse>
                                </TabPane>
                                <TabPane tab="多选题" key="listMultiple">
                                    <Collapse accordion>
                                        {listMultiple&&this.itemRender(listMultiple)}
                                    </Collapse>
                                </TabPane>
                                <TabPane tab="阅读题" key="listReading">
                                    <Collapse accordion>
                                        {listReading&&this.itemRender(listReading)}
                                    </Collapse>
                                </TabPane>
                            </Tabs>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
    // 提交编辑
    handleOk = e => {
        const { idItem } = this.state;
        const { itemId } = this.props.editDatas;
        let dataLen = itemId.length + idItem.length;
        if (idItem.length > 0) {
            this.props.handleAdd(this.state.idItem);
            this.clearIschecked();
        } else if (dataLen > 20) {
            notification.error({
                key: '1',
                message: '提示',
                description: '最多可以添加20题',
            });
            return false;
        } else {
            notification.error({
                key: '1',
                message: '提示',
                description: '请至少选择一道题目',
            });
            return false;
        }
    };
    /** 
     * 清除所有选中状态并清空选中数据
     */
    clearIschecked = () => {

        this.setState(() => ({
            listSingle: [],
            listMultiple: [],
            listReading: [],
            idItem: [],
            answerType: 'listSingle',
        }));
    };
    // 取消编辑
    handleCancel = e => {
        this.clearIschecked();
        this.props.handleShow();
    };
    // 搜索部门负责人框获取焦点
    fetchUser = value => {
        this.props.searchLink(value);
    };
    // 加入
    joinTopic = (data, i, e) => {
        const { answerType } = this.state;
        this.setState (prevState => ({
          [answerType]: prevState[answerType].map(v => {
              v.ischecked = v.anserId === data.anserId ? !v.ischecked : v.ischecked;
            return v;
          }),
        }));

        if (this.state.idItem.length > 0) {
          this.state.idItem.map ((v, i) => {
            if (e.target.checked) {
              if (!(v.anserId === data.anserId)) {
                this.setState (prevState => ({
                  idItem: [
                    ...prevState['idItem'],
                    {
                      anserId: data.anserId,
                      answerNo: data.answerNo,
                    },
                  ],
                }));
              }
            } else {
              if (v.anserId === data.anserId) {
                this.setState (prevState => ({
                  idItem: prevState['idItem'].splice (i, 1),
                }));
              }
            }
          });
        } else {
          this.setState (() => ({
            idItem: [
              {
                anserId: data.anserId,
                answerNo: data.answerNo,
              },
            ],
          }));
        }
    };
    // 选择难度
    selectChange = value => {
        const { labelParam, examinationPoint, answerType } = this.state;
        const params = {
            pageNum: 1,
            pageSize: 10,
            labelParam,
            difficulty: value,
            examinationPoint,
            answerType,
        };
        this.setState({
            difficulty: value,
        });
        this.props.modalTopicsAction(params);
        this.clearIschecked();
    };
    // 搜索题目标签
    searchLabelParam = value => {
        const { difficulty, examinationPoint, answerType } = this.state;
        const params = {
            pageNum: 1,
            pageSize: 10,
            labelParam: value,
            difficulty,
            examinationPoint,
            answerType,
        };
        this.setState({
            labelParam: value,
        });
        this.props.modalTopicsAction(params);
    };
    // 搜索题目考点
    searchPoint = value => {
        const { labelParam, difficulty, answerType } = this.state;
        const params = {
            pageNum: 1,
            pageSize: 10,
            labelParam,
            difficulty,
            examinationPoint: value,
            answerType,
        };
        this.setState({
            examinationPoint: value,
        });
        this.props.modalTopicsAction(params);
    };

    // 切换类型
    answerType = e => {
        const { labelParam, difficulty, examinationPoint } = this.state;
        const params = {
            pageNum: 1,
            pageSize: 10,
            labelParam,
            difficulty,
            examinationPoint,
            answerType: e,
        };
        this.setState({
            answerType: params.answerType,
        });

        this.state[e].length === 0 && this.props.modalTopicsAction(params);
    };
}

export default EduTopicAdd;
