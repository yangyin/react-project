import React, {Component} from 'react';
import {Card, Button, Row, Col, Select, Divider, Table, Form} from 'antd';
import Panel from '../../../components/panel/panel';
import {connect} from 'react-redux';
import {
  jurisdictionStatus,
  getCompanyList,
  editcompanyinfo,
  deleteCompany,
  addCompanyForm,
} from './store/action';
import {
  selectcompanyName,
  getSelCompanyType,
} from '../../../redux/findField/actions';
import {Unauthorized} from './../../error-page/not-found-page';

import './project-company.less';
const FormItem = Form.Item;
const Option = Select.Option;
const EditableContext = React.createContext ();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create () (EditableRow); //查询公司对应参建单位

@Form.create ()
@connect (
  state => ({
    topbar: state.topbar,
    companyList: state.companyReducer.getCompanyList,
    isJurisdiction: state.companyReducer.isJurisdiction,
    companyTypeSel: state.findField.selCompanyType,
    selComName: state.findField.selectCompanyList,
  }),
  {
    getSelCompanyType,
    jurisdictionStatus,
    getCompanyList,
    editcompanyinfo,
    deleteCompany,
    selectcompanyName,
    addCompanyForm,
  }
)
class ProjectCompany extends Component {
  constructor (props) {
    super (props);
    this.params = {
      companyName: '',
      companyId: '',
      contactId: '',
      proId: '',
    };
    this.state = {
      datas: [],
      companyNameList: [],
      editingKey: '',
      redirect: false,
      isDisable: true,
      companyTypeId: '',
    };
    this.columns = [
      {title: '参建单位类型', dataIndex: 'companyTypeName'},
      {title: '参建单位名称', dataIndex: 'companyName', editable: true},
      {title: '单位联系人', dataIndex: 'contactName'},
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
                : <a onClick={() => this.edit (record.id, record.companyType)}>
                    编辑
                  </a>}

              <Divider type="vertical" />
              <a onClick={() => this.delete (record)}>删除</a>
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
    const companyListrows = nextProps.companyList;
    const {companyList} = this.props;
    if (companyList && companyList !== companyListrows)
      this.setState ({
        datas: companyListrows,
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
    this.props.getCompanyList ({proId: proId});
    this.props.getSelCompanyType ({proId: proId});
  };
  // 根据单位类型获取对应单位名称
  handleChangeComType = value => {
    if (value) {
      this.setState (
        prevState => ({
          isDisable: false,
          companyTypeId: value,
        }),
        () => {
          const param = {
            type: 'A',
            param: '',
            companyType: value,
          };

          this.props.selectcompanyName (param);
        }
      );
    }
  };
  // 选择参建单位（新增）
  handleChangeComName = value => {
    const {proId} = this.props.topbar;
    this.params = {
      companyName: value[0],
      companyId: value[1],
      contactId: value[2],
      proId: proId,
    };
  };
  isEditing = record => {
    return record.id === this.state.editingKey;
  };

  edit (id, nameId) {
    this.setState (
      prevState => ({editingKey: id}),
      () => {
        const param = {
          type: 'A',
          param: '',
          companyType: nameId,
        };
        this.props.selectcompanyName (param);
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
      const editCompName = newData[index].companyName;
      const editparams = {
        proId: proId,
        id: newData[index].id,
        companyType: newData[index].companyType,
        companyId: editCompName[1],
        companyName: editCompName[0],
        contactId: editCompName[2],
      };

      this.props.editcompanyinfo (editparams);
    });
  }
  // 删除参建单位
  delete (result) {
    this.props.deleteCompany ({id: result.id}, {proId: result.proId});
  }

  cancel = () => {
    this.setState ({editingKey: ''});
  };
  // 新增保存
  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields ((errors, values) => {
      if (!errors) {
        this.params.companyType = values.companyType;
        this.props.addCompanyForm (this.params);
        this.props.form.resetFields ();
      }
    });
  };
  // 搜索负责人框获取焦点
  searchLeader = val => {
    const {companyTypeId} = this.state;
    const param = {
      type: 'A',
      param: val,
      companyType: companyTypeId,
    };
    this.props.selectcompanyName (param);
  };
  render () {
    const panelData = {
      title: '参建单位',
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const {isDisable} = this.state;
    const {isJurisdiction, companyTypeSel, selComName} = this.props;
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
                        {getFieldDecorator ('companyType', {
                          rules: [{required: true, message: '请选择单位类型'}],
                        }) (
                          <Select
                            placeholder="请选择单位类型"
                            onChange={this.handleChangeComType}
                          >
                            {companyTypeSel.length > 0 &&
                              companyTypeSel.map (item => (
                                <Option key={item.id} value={item.id}>
                                  {item.name}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col {...ColLayout1}>
                      <FormItem {...formItemLayout}>
                        {getFieldDecorator ('companyName', {
                          rules: [{required: true, message: <div>请输入!</div>}],
                        }) (
                          <Select
                            disabled={isDisable}
                            onChange={this.handleChangeComName}
                            placeholder="请输入单位名称进行搜索选择"
                            showSearch={true}
                            onSearch={this.searchLeader}
                            filterOption={false}
                            notFoundContent="暂无数据"
                          >
                            {selComName.length > 0 &&
                              selComName.map (item => (
                                <Option
                                  key={item.companyId}
                                  value={[
                                    item.companyName,
                                    item.companyId,
                                    item.contactId,
                                  ]}
                                >
                                  {item.companyName}
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
    selComNameEdit: state.findField.selectCompanyList,
  }),
  {selectcompanyName, editcompanyinfo}
)
class EditableCell extends Component {
  getInput = () => {
    const {selComNameEdit} = this.props;
    return (
      <Select
        placeholder="请输入单位名称进行搜索选择"
        showSearch={true}
        onSearch={this.handleSearch}
        filterOption={false}
        notFoundContent="暂无数据"
        style={{width: 250}}
      >
        {selComNameEdit.map (item => (
          <Option
            key={item.companyId}
            value={[item.companyName, item.companyId, item.contactId]}
          >
            {item.companyName}
          </Option>
        ))}
      </Select>
    );
  };
  handleSearch = value => {
    let selCompanyName = {
      type: 'A',
      param: value,
      companyType: this.props.record.companyType,
    };
    this.props.selectcompanyName (selCompanyName);
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
