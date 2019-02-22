// 通知详情
import React, {Component} from 'react';
import {
  Card,
  Row,
  Col,
  Modal,
  Checkbox,
  Radio,
  Select,
  Button,
  Divider,
  Table,
} from 'antd';

import Panel from '../../../../components/panel/panel';
import {connect} from 'react-redux';
import {Unauthorized} from './../../../error-page/not-found-page';

import {
  addTarget,
  getDetailTitle,
  getDetailList,
  getRoleList,
  getSelectUser,
  getInformObjList,
  deleteInformRelation,
  jurisdictionStatus,
} from '../store/action';
import {getStaffList} from '../../../../redux/findField/actions';
import './inform-detail.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;

@connect (
  state => ({
    detailTitle: state.assistantInform.detailTitle,
    informDetailList: state.assistantInform.informDetailList,
    staffList: state.findField.companyStaffList,
    selRoleList: state.assistantInform.selRoleList,
    selUserList: state.assistantInform.selUserList,
    informObjList: state.assistantInform.informObjList,
  }),
  {
    getDetailTitle,
    getDetailList,
    getStaffList,
    addTarget,
    getRoleList,
    getSelectUser,
    getInformObjList,
    deleteInformRelation,
    jurisdictionStatus,
  }
)
class InformDetail extends Component {
  constructor (props) {
    super (props);
    this.state = {
      notProId: this.props.match.params.id,
      clearModalVisible: false,
      editModalVisible: false,
      targetType: 'A',
    };
    this.params = {
      eventName: '', // 单条方案对应权限名称
      targetd: '', // 通知对象id（下拉框里选的）
      programmedReId: '', // 通知事件id
      roleList: [], // 项目角色
      userList: [], // 某一用户搜索结果
      removeRationCheck: [], // 移除对象
    };
    this.columns = [
      {title: '通知事件及描述', dataIndex: 'eventName'},
      {title: '模板内容', dataIndex: 'messageContent'},
      {
        title: '通知对象设置',
        dataIndex: 'id',
        render: (text, record) => {
          return (
            <div>
              <a
                onClick={() => this.showEditModal (record.id, record.eventName)}
              >
                添加
              </a>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  this.showClearModal (record.id, record.eventName)}
              >
                详情
              </a>
            </div>
          );
        },
      },
    ];
  }
  // 组建渲染之后调用只调用一次
  componentDidMount () {
    const {notProId} = this.state;
    if (notProId) {
      this.request ();
    }
  }

  //接受新的props调用
  componentWillReceiveProps (nextProps) {
    const {selRoleList, selUserList, targetType} = nextProps;
    this.params.roleList = selRoleList;
    this.params.userList = selUserList;
    if (targetType !== 'R' || targetType !== 'U') {
      this.params.targetd = '';
    }
  }
  componentWillUnmount () {
    this.props.jurisdictionStatus (false);
  }
  request = () => {
    const {notProId} = this.state;
    this.props.getDetailTitle ({notProId});
    this.props.getDetailList ({notProId});
    this.props.getStaffList ();
  };

  handleSearch = () => {};
  onChange = () => {};
  handleOk = () => {};
  // 关闭弹窗
  handleCancel = () => {
    this.setState ({
      clearModalVisible: false,
      editModalVisible: false,
    });
  };
  // 新增通知对象
  submitAuth = () => {
    const {targetType} = this.state;
    const {programmedReId, targetd} = this.params;
    this.props.addTarget ({
      programmedReId: programmedReId,
      targetType: targetType,
      targetd: targetd,
    });
    this.setState ({
      editModalVisible: false,
    });
  };
  // 详情 modal（移除通知对象）
  showClearModal = (id, eventName) => {
    this.props.getInformObjList ({programmedReId: id});
    this.setState ({
      clearModalVisible: true,
    });
    this.params.eventName = eventName;
    this.params.programmedReId = id;
  };
  // 添加 modal
  showEditModal = (id, eventName) => {
    this.setState ({
      editModalVisible: true,
    });
    this.params.eventName = eventName;
    this.params.programmedReId = id;
  };
  // 项目角色
  onRoleChange = e => {
    this.setState (
      {
        targetType: e.target.value,
      },
      () => {
        const {programmedReId} = this.params;
        const {targetType} = this.state;
        if (targetType === 'R') {
          this.props.getRoleList ({programmedReId: programmedReId});
        } else {
          this.params.roleList = [];
        }
      }
    );
  };
  handleChange = value => {
    this.params.targetd = value;
  };
  handleSearchUser = value => {
    const {programmedReId} = this.params;
    this.props.getSelectUser ({
      programmedReId: programmedReId,
      type: 0,
      param: value,
    });
  };
  // 删除通知权限
  handleDelete = () => {
    const {removeRationCheck} = this.params;
    this.props.deleteInformRelation ({
      idList: removeRationCheck.join (),
    });
    this.setState (prevState => ({clearModalVisible: false}));
  };
  // 删除选择
  onRemoveChange = e => {
    let removeArr = this.params.removeRationCheck;

    if (e.target.checked === false) {
      for (let i = 0; i < removeArr.length; i++) {
        if (e.target.value === removeArr[i]) {
          removeArr.splice (i, 1);
          break;
        }
      }
    } else if (e.target.checked === true) {
      removeArr.push (e.target.value);
    }
    this.params.removeRationCheck = removeArr;
  };
  render () {
    const {detailTitle, informObjList} = this.props;
    const panelData = {
      title: `${detailTitle}-通知详情`,
      isBack: true,
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {eventList} = this.props.informDetailList;
    
    const {isJurisdiction} = this.props;
    const {targetType, editModalVisible, clearModalVisible} = this.state;
    const {eventName, roleList, userList} = this.params;
    this.params.removeRationCheck =
      informObjList &&
      informObjList.map (item => {
        return item.id;
      });
    return (
      <div>
        {isJurisdiction !== true
          ? <React.Fragment>
              <Panel panelData={panelData} />
              <Card bordered={false} style={{margin: 24}}>
                <Table
                  columns={this.columns}
                  rowKey="id"
                  dataSource={eventList}
                  locale={{emptyText:'暂无数据'}}
                />
                {/* 添加 */}
                <Modal
                  title="授权对象设置"
                  visible={editModalVisible}
                  // onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  width={700}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                    <Button
                      key="submit"
                      type="primary"
                      onClick={this.submitAuth}
                    >
                      保存
                    </Button>,
                  ]}
                >

                  <Row style={{marginBottom: 10}}>
                    <Col span={3} offset={1} style={{textAlign: 'right'}}>
                      通知方案：
                    </Col>
                    <Col span={20}>{detailTitle}</Col>
                  </Row>
                  <Row style={{marginBottom: 10}}>
                    <Col span={3} offset={1} style={{textAlign: 'right'}}>
                      通知权限：
                    </Col>
                    <Col span={20}>{eventName}</Col>
                  </Row>
                  <Row
                    style={{
                      marginBottom: 10,
                      padding: '10px 0 0 0',
                      borderTop: '1px solid #ddd',
                    }}
                  >
                    <Col offset={2}>选择需要关联的授权对象设置</Col>
                  </Row>
                  <Row className="shouq_box">
                    <Col span={6} offset={2}>
                      <RadioGroup
                        onChange={this.onRoleChange}
                        defaultValue={targetType}
                      >
                        <Radio style={radioStyle} value={'A'}>我自己(当前账户)</Radio>
                        <Radio style={radioStyle} value={'D'}>项目负责人</Radio>
                        <Radio style={radioStyle} value={'E'}>标段负责人</Radio>
                        <Radio style={radioStyle} value={'F'}>班组负责人</Radio>
                        <Radio style={radioStyle} value={'G'}>项目创建人</Radio>
                        <Radio style={radioStyle} value={'U'}>某一用户</Radio>
                        <Radio style={radioStyle} value={'R'}>项目角色</Radio>
                      </RadioGroup>
                    </Col>
                    <Col span={2} />
                    <Col span={9}>
                      <div>
                        <Select
                          showSearch
                          style={{width: 200}}
                          placeholder={'请搜索选择'}
                          optionFilterProp="children"
                          onChange={this.handleChange}
                          onSearch={this.handleSearchUser}
                          className={targetType === 'U' ? 'show' : 'hide'}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase ()
                              .indexOf (input.toLowerCase ()) >= 0}
                        >
                          {(userList || []).map (item => (
                            <Option value={item.id} key={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>

                        <Select
                          defaultValue={'请选择项目角色'}
                          style={{width: '100%'}}
                          onChange={this.handleChange}
                          className={targetType === 'R' ? 'show' : 'hide'}
                        >
                          {roleList.map (item => (
                            <Option value={item.id} key={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                  </Row>
                </Modal>
                {/* 详情 */}
                <Modal
                  title="移除授权对象"
                  visible={clearModalVisible}
                  onCancel={this.handleCancel}
                  width={700}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button
                      key="submit"
                      type="primary"
                      onClick={this.handleDelete}
                    >
                      删除
                    </Button>,
                  ]}
                >
                  <Row style={{marginBottom: 10}}>
                    <Col span={3} offset={1} style={{textAlign: 'right'}}>
                      通知方案：
                    </Col>
                    <Col span={20}>{detailTitle}</Col>
                  </Row>
                  <Row style={{marginBottom: 10}}>
                    <Col span={3} offset={1} style={{textAlign: 'right'}}>
                      通知权限：
                    </Col>
                    <Col span={20}>{eventName}</Col>
                  </Row>
                  <Row
                    style={{
                      marginBottom: 10,
                      padding: '10px 0 0 0',
                      borderTop: '1px solid #ddd',
                    }}
                  >
                    <Col span={3} offset={1} style={{textAlign: 'right'}}>
                      从中删除：
                    </Col>
                    <Col span={20} className="delete_permiss_box">
                      <Row>
                        {informObjList.map ((item, index) => (
                          <Col span={24} className="delete_item" key={item.id}>
                            <Checkbox
                              defaultChecked={true}
                              value={item.id}
                              index={index}
                              delType={item.deleteType}
                              onChange={this.onRemoveChange}
                            >
                              {item.targetTypeName}
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Modal>
              </Card>
            </React.Fragment>
          : <Unauthorized />}
      </div>
    );
  }
}

export default InformDetail;
