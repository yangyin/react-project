import React, {Component} from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Input,
  Select,
  Divider,
  Table,
  Form,
} from 'antd';
import Panel from '../../../components/panel/panel';
import {connect} from 'react-redux';
import {
  jurisdictionStatus,
  addSectionForm,
  getSectionList,
  deleteProSection,
  editSectionInfo,
} from './store/action';
import Utils from '../../../utils/utils';
import {getSectionManager} from '../../../redux/findField/actions';
import {Unauthorized} from './../../error-page/not-found-page';

import './project-section.less';
const FormItem = Form.Item;
const Option = Select.Option;
const EditableContext = React.createContext ();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create () (EditableRow); //查询公司对应参建单位 // 列表 // 负责人

@Form.create ()
@connect (
  state => ({
    topbar: state.topbar,
    proSectionList: state.projectSection.proSectionList,
    isJurisdiction: state.projectSection.isJurisdiction,
    selsectionmanager: state.findField.selSectionManager,
  }),
  {
    getSectionList,
    jurisdictionStatus,
    getSectionManager,
    deleteProSection,
    addSectionForm,
    editSectionInfo,
  }
)
class ProjectCompany extends Component {
  constructor (props) {
    super (props);
    this.params = {
      teamId: '',
      sectionMnagerId: '',
      sectionMnagerPhone: '',
      sectionName: '',
    };
    this.state = {
      datas: [],
      companyNameList: [],
      editingKey: '',
      redirect: false,
    };
    this.columns = [
      {title: '标段名称', width: '20%', dataIndex: 'sectionName', editable: true},
      {title: '负责人', width: '20%', dataIndex: 'userName', editable: true},
      {title: '联系电话', dataIndex: 'sectionMnagerPhone'},
      {
        title: '操作',
        render: (text, record) => {
          const editable = this.isEditing (record);
          return (
            <div>
              {editable
                ? <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          onClick={() => this.save (form, record.id)}
                          style={{marginRight: 8}}
                        >
                          保存
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <a onClick={() => this.cancel (record.id)}>取消</a>
                  </span>
                : <a onClick={() => this.edit (record.id)}>
                    编辑
                  </a>}

              <Divider type="vertical" />
              <a onClick={() => this.delete (record.id)}>移除</a>
            </div>
          );
        },
      },
    ];
  }
  // 组建渲染之后调用  只调用一次
  componentDidMount () {
    const {proId} = this.props.topbar;
    if (proId) {
      this.request ();
    }
  }
  // 更新 组件初始化时不调用，组件接受新的props时调用。
  componentWillReceiveProps (nextProps) {
    const sectionListrows = nextProps.proSectionList;
    const {proSectionList} = this.props;
    if (proSectionList && proSectionList !== sectionListrows)
      this.setState ({
        datas: sectionListrows,
      });
  }
  // 组件初始化时不调用，组件更新完成后调用
  componentDidUpdate (prevProps) {
    const prevId = prevProps.topbar.proId;
    const {proId} = this.props.topbar;
    if (prevId !== proId) {
      this.request ();
    }
  }
  componentWillUnmount () {
    this.props.jurisdictionStatus (false);
  }
  request = () => {
    const {proId} = this.props.topbar;
    this.params.proId = proId;
    this.props.getSectionList ({proId: proId});
    this.props.getSectionManager ({proId: proId, phone: ''});
  };

  isEditing = record => {
    return record.id === this.state.editingKey;
  };

  edit (id) {
    const {proId} = this.props.topbar;
    this.setState (
      prevState => ({editingKey: id}),
      () => {
        this.props.getSectionManager ({proId: proId, phone: ''});
      }
    );
  }

  save (form, key) {
    form.validateFields ((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.datas];
      const index = newData.findIndex (item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice (index, 1, {
          ...item,
          ...row,
        });
        this.setState ({datas: newData, editingKey: ''});
      } else {
        newData.push (row);
        this.setState ({datas: newData, editingKey: ''});
      }
      // 修改保存数据
      const {proId} = this.props.topbar;
      const editManagerInfo = newData[index].userName;
      const editparams = {
        proId: proId,
        id: newData[index].id,
        sectionName: newData[index].sectionName,
        sectionMnagerId: editManagerInfo[1],
        sectionMnagerPhone: editManagerInfo[2],
      };
      this.props.editSectionInfo (editparams);
    });
  }
  // 删除参建单位
  delete (id) {
    const {proId} = this.props.topbar;
    this.props.deleteProSection ({id: id}, {proId: proId});
  }

  cancel = () => {
    this.setState ({editingKey: ''});
  };
  // 新增保存
  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields ((errors, values) => {
      const {proId} = this.props.topbar;
      if (!errors) {
        let managerInfo = values.companyName;
        const addParams = {
          teamId: managerInfo[3],
          sectionMnagerId: managerInfo[2],
          sectionMnagerPhone: managerInfo[1],
          sectionName: values.sectionName,
          proId: proId,
        };
        this.props.addSectionForm (addParams);
        this.props.form.resetFields ();
      }
    });
  };
  // 搜索负责人框获取焦点
  searchLeader = val => {
    this.props.getSectionManager ({
      proId: this.props.topbar.proId,
      phone: val,
    });
  };
  render () {
    const panelData = {
      title: '标段管理',
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const {isJurisdiction, selsectionmanager} = this.props;
    const columns = this.columns.map (col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing (record),
        }),
      };
    });
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
      },
    };

    const ColLayout1 = {
      xs: 24,
      sm: 12,
      md: 5,
    };

    return (
      <div>
        {isJurisdiction !== true
          ? <React.Fragment>
              <Panel panelData={panelData} />
              <Card bordered={false} style={{background: '#f3f3f3'}}>
                <Table
                  style={{background: '#fff'}}
                  locale={{emptyText: '暂无数据'}}
                  rowKey="id"
                  className="content"
                  rowClassName="editable-row"
                  components={components}
                  dataSource={this.state.datas}
                  columns={columns}
                  pagination={false}
                />
                <Form className="companyForm" onSubmit={this.handleSubmit}>
                  <Row gutter={24}>
                    <Col {...ColLayout1}>
                      <FormItem>
                        {getFieldDecorator ('sectionName', {
                          rules: [
                            {required: true, message: '请输入标段名称'},
                            {validator: Utils.validSpace},
                          ],
                        }) (<Input maxLength={15} placeholder="请输入标段名称" />)}
                      </FormItem>
                    </Col>
                    <Col {...ColLayout1}>
                      <FormItem {...formItemLayout}>
                        {getFieldDecorator ('companyName', {
                          rules: [
                            {required: true, message: <div>请输入搜索选择!</div>},
                          ],
                        }) (
                          <Select
                            placeholder="请输入手机号或姓名搜索选择"
                            showSearch={true}
                            onSearch={this.searchLeader}
                            filterOption={false}
                            notFoundContent="暂无数据"
                          >
                            {selsectionmanager.length > 0 &&
                              selsectionmanager.map (item => (
                                <Option
                                  key={item.teamId}
                                  value={[
                                    item.userName,
                                    item.userPhone,
                                    item.teamManager,
                                    item.teamId,
                                  ]}
                                >
                                  {item.userName} {item.userPhone}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </FormItem>

                    </Col>

                    <Col {...ColLayout1}>
                      <FormItem wrapperCol={{span: 4, offset: 2}}>
                        <Button type="primary" htmlType="submit">保存</Button>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </React.Fragment>
          : <Unauthorized />}
      </div>
    );
  }
}

//修改
@connect (
  state => ({
    topbar: state.topbar,
    selsectionmanager: state.findField.selSectionManager,
  }),
  {}
)
class EditableCell extends Component {
  getInput = () => {
    const {selsectionmanager} = this.props;
    if (this.props.dataIndex === 'userName') {
      return (
        <Select
          placeholder="请输入手机号或姓名搜索选择"
          showSearch={true}
          onSearch={this.searchLeader}
          filterOption={false}
          notFoundContent="暂无数据"
          style={{width: 250}}
        >
          {selsectionmanager.length > 0 &&
            selsectionmanager.map (item => (
              <Option
                key={item.teamId}
                value={[item.userName,item.teamManager, item.userPhone]}
              >
                {item.userName} {item.userPhone}
              </Option>
            ))}
        </Select>
      );
    }
    return <Input style={{width: '80%'}} />;
  };

  render () {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const {getFieldDecorator} = form;
          return (
            <td {...restProps}>
              {editing
                ? <FormItem style={{margin: 0}}>
                    {getFieldDecorator (dataIndex, {
                      rules: [
                        {
                          required: true,
                          message: `请选择 ${title}!`,
                        },
                      ],
                      initialValue: record[dataIndex],
                    }) (this.getInput (this.props))}
                  </FormItem>
                : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default ProjectCompany;
