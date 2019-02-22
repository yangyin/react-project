import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Input,
  Form,
  Radio,
  Button,
  Collapse,
  Tag,
  Avatar,
  Icon,
  notification,
} from 'antd';
import TopPanel from '../../../components/panel/panel';
import {connect} from 'react-redux';
import {
  getEduDatas,
  deleteTopic,
  editScheme,
  deleteTopicStatus,
  editSchemeStatus,
} from './store/action';
import Utils from '../../../utils/utils';
// import EduTopicAdd from './edu-details-edit';

import './education-details.less';
const EduTopicAdd = React.lazy(() => import('./edu-details-edit'));

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

@withRouter
@connect (
  state => ({
    educationDetailsReducer: state.educationDetailsReducer,
  }),
  {getEduDatas, deleteTopic, editScheme, deleteTopicStatus, editSchemeStatus}
)
@Form.create ()
class EducationAssistantDetails extends React.Component {
  constructor (props) {
    super (props);
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
    this.idList = [];
    this.id = this.props.match.params.id;
  }
  componentDidMount(){
    this.props.getEduDatas (this.id);
  }
  componentWillReceiveProps (nextProps) {
    const {educationDetails} = nextProps.educationDetailsReducer;
    const {scoringMethod,qualifiedProportion,eachSorce} = educationDetails ? educationDetails : {};
    const currentDetails = this.props.educationDetailsReducer.educationDetails;
    
    // 判断教育方案详情
    if (educationDetails &&Array.isArray (educationDetails.answers) &&
      currentDetails &&Array.isArray (currentDetails.answers)) {
      // 设置及格分数格式（分数，百分比）
      this.setState (() => ({
        type: Number (scoringMethod),
        score: scoringMethod === '1' ? eachSorce : qualifiedProportion,
        rightOrWrong: eachSorce,
        qualified: qualifiedProportion,
      }));
    }
    //
    if (educationDetails && currentDetails && JSON.stringify (educationDetails.answers) !== JSON.stringify (currentDetails.answers)) {
      this.setState ({
        itemId: educationDetails.answers.map (item => {
          this.idList.push ({
            anserId: item.anserId,
            answerNo: item.answerNo,
          });
          return item;
        }),
      });
    }
  }
  componentDidUpdate (prevProps, data) {
    // 判断编辑方案、删除题目，成功时，更改educationDetailsDelete状态，并且刷新界面
    const { educationDetailsDelete,educationDetailsEdit} = this.props.educationDetailsReducer;
    if (educationDetailsDelete === true) {
      this.props.deleteTopicStatus (false);
      this.props.getEduDatas (this.id);
    }
    if (educationDetailsEdit === true) {
      this.props.editSchemeStatus (false);
      this.props.getEduDatas (this.id);
      this.props.form.resetFields ();
    }
  }
  render () {
    const panelData = {
      pathname: '项目配置/教育助手',
      title: '教育助手详情',
      desc: '教育助手',
      isBack: true,
    };
    const {getFieldDecorator} = this.props.form;
    const {educationDetails} = this.props.educationDetailsReducer; // 选中列表
    const formItemLayout = {
      labelCol: {span: 0},
      wrapperCol: {span: 17},
    };
    const {text, visible, tips, score, itemId, type} = this.state;
    const editDatas = {
      show: visible,
      itemId:itemId,
    };
    return (
      <div>
        <TopPanel panelData={panelData} />
        <Card bordered={false} style={{background: '#f3f3f3'}}>
          <div className="content form-content">
            <Row>
              <Form onSubmit={this.handleSubmit}>
                <Col span={4}>
                  <label>方案名称</label>
                </Col>
                <Col span={8}>
                  <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator ('planName', {
                      initialValue: educationDetails
                        ? educationDetails.programName
                        : '请输入方案名称',
                      rules: [{required: true, message: '方案名称必填!'}],
                    }) (<Input maxLength="15" />)}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <label>方案备注</label>
                </Col>
                <Col span={8}>
                  <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator ('planMark', {
                      initialValue: educationDetails
                        ? educationDetails.programContent
                        : '请输入备注名称',
                      rules: [],
                    }) (<Input maxLength="15" />)}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <label>计分方式</label>
                </Col>
                <Col span={8}>
                  <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator ('planType', {
                      initialValue: type,
                      rules: [],
                    }) (
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
                    {getFieldDecorator ('planScore', {
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
                    }) (<Input onChange={this.handleScore} />)}

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
                      {itemId.map ((item, i) => {
                        return <span key={i}>#{item.answerNo}</span>;
                      })}
                    </div>
                    <Icon hidden={itemId.length>19?true:false} type="plus-square" onClick={this.showModal} />
                  </div>
                </Col>
                <Col span={4} />
                <Col span={20}>
                  <Button type="primary" htmlType="submit">保存</Button>
                </Col>
              </Form>
            </Row>
          </div>
        </Card>
        <Card bordered={false} style={{background: '#f3f3f3'}}>
          <div className="content">
            <Collapse accordion>
              {educationDetails && Array.isArray (educationDetails.answers)
                ? educationDetails.answers.map ((item, i) => {
                    return (
                      <Panel
                        header={
                          <div>
                            <Row>
                              {/* <Col span={4}><span className="blue">#{item.answerNo}--{item.anserId}</span></Col> */}
                              <Col span={4}>
                                <span className="blue">#{item.answerNo}</span>
                              </Col>
                              <Col span={5}>
                                题型：{item.answerType === 1 ? '单选' : '多选'}
                              </Col>
                              <Col span={5}>难度值：{item.difficulty}</Col>
                              <Col span={6}>
                                解析：
                                {!item.analysisContent
                                  ? '未录'
                                  : `( ${item.analysisContent.substring (0, 15)} )`}
                              </Col>
                              <Col span={4}>
                                <span
                                  className="blue"
                                  onClick={e => this.delete (e, item.anserId)}
                                >
                                  剔除
                                </span>
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
                              ? Utils.jsonToMap (
                                  item.answerOption
                                ).map ((answer, m) => {
                                  let colNode = '';
                                  if (!Utils.checkIsImg (answer.value)) {
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
                            {item.answer
                              ? item.answer.split ('#DYQ$').join (',')
                              : null}
                          </p>
                          <p>
                            解析：
                            {!item.analysisContent
                              ? '未录'
                              : item.analysisContent}
                          </p>
                          <Row>
                            <Col span={12}>
                              标签：
                              {item.labels
                                ? item.labels.map ((subitem, j) => {
                                    return (
                                      <Tag color="blue" key={j}>
                                        {subitem.name}
                                      </Tag>
                                    );
                                  })
                                : null}
                            </Col>
                            <Col span={12}>
                              考点：
                              {item.examinationPoints
                                ? item.examinationPoints.map ((subitem, j) => {
                                    return (
                                      <Tag color="blue" key={j}>
                                        {subitem.name}
                                      </Tag>
                                    );
                                  })
                                : null}
                            </Col>
                          </Row>
                        </div>
                      </Panel>
                    );
                  })
                : null}
            </Collapse>
          </div>
        </Card>
        <EduTopicAdd
          editDatas={editDatas}
          handleShow={this.handleShow.bind (this)}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
  // 计分方式单选框事件
  onChange = e => {
    const val = e.target.value;
    const {qualified, rightOrWrong} = this.state;
    this.setState ({
      type: val,
      text: val === 2?'合格比例':'合格分值',
      score:  val === 2?qualified:rightOrWrong,
    });
    this.props.form.setFields({planScore: {value:val === 2?qualified:rightOrWrong}})
  };
  // 删除题目
  delete = (e, id) => {
    e.stopPropagation ();
    const params = {
      programId: this.id,
      answerId: id,
    };
    this.props.deleteTopic (params);
  };
  // 切换计分方式后，分值的输入处理
  handleScore = e => {
    const {type} = this.state;
    if (type === 1) {
      this.setState ({
        rightOrWrong: e.target.value,
      });
    } else {
      this.setState ({
        qualified: e.target.value,
      });
    }
  };
  // 添加题目弹窗
  showModal = () => {
    this.setState ({
      visible: true,
    });
  };
  // 子组件操作父组件显示隐藏弹窗
  handleShow = event => {
    this.setState ({
      visible: false,
    });
  };
  // 子组件操作父组件显示隐藏弹窗
  handleAdd = options => {
    const contactArr = this.state.itemId.concat (options);
    // 去除重复数据
    let newArr = [];
    let obj = {};
    for (let i = 0; i < contactArr.length; i++) {
      if (!obj[contactArr[i].anserId]) {
        newArr.push (contactArr[i]);
        obj[contactArr[i].anserId] = true;
      }
    }
    this.setState ({
      itemId: newArr,
    });
    this.handleShow ();
  };
  // 保存方案
  handleSubmit = e => {
    e.preventDefault ();
    if (!this.id) {
      this.props.history.go (-1);
      return false;
    }
    this.props.form.validateFields ((err, values) => {
      if (!err) {
        const {rightOrWrong, qualified} = this.state;
        const {planName, planMark, planType,planScore} = values;
        const {itemId} = this.state;
        let answerList = [];
        itemId.map ((item, i) => {
          answerList.push ({
            anserId: item.anserId,
          });
          return item;
        });
        const params = {
          programId: this.id,
          programName: planName,
          programContent: planMark,
          scoringMethod: planType,
          eachSorce: planType===1?planScore:rightOrWrong,
          qualifiedProportion:planType===2?planScore:qualified,
          answerList: JSON.stringify (answerList),
        };
        this.props.editScheme (params);
      }
    });
  };
  // 删除提示
  closeTips = () => {
    this.setState ({
      tips: false,
    });
  };
}
export default EducationAssistantDetails;
