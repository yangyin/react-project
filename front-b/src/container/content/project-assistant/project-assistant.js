import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Select, Divider, Table, Form} from 'antd';
import Panel from '../../../components/panel/panel';
import {connect} from 'react-redux';
import {
  infoAssistantAll,
  assistantNameList,
  assistantNameEdit,
  jurisdictionStatus,
} from './store/action';

import {Unauthorized} from './../../error-page/not-found-page';

import './project-assistant.less';

const FormItem = Form.Item;
const Option = Select.Option;
const EditableContext = React.createContext ();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create () (EditableRow);
var nameValSel='';
@Form.create ()
@connect (
  state => ({
    topbar: state.topbar,
    assistantList: state.projectAssistant.proAssistantList,
    isJurisdiction: state.projectAssistant.isJurisdiction,
    assistantnamelist: state.projectAssistant.proAssistantName,
  }),
  {infoAssistantAll, assistantNameEdit, assistantNameList, jurisdictionStatus}
)
class ProInfoAssistant extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      datas: [],
      nameDatas: [],
      proId: '',
      editingKey: '',
      redirect: false,
    };
    this.params={
        nameValSel:''
    }
    this.columns = [
      {
        title: '通知方案名称',
        dataIndex: 'notProName',
        width: '20%',
        editable: true,
      },
      {
        title: '备注',
        width: '40%',
        editable: false,
        render: () => {
          return '这里是通知方案的说明';
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) => {
          const editable = this.isEditing (record);
          return (
            <div>
              {editable
                ? <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          onClick={() => this.save (form, record.notProId)}
                          style={{marginRight: 8}}
                        >
                          保存
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <a onClick={() => this.cancel (record.notProId)}>取消</a>
                  </span>
                : <a onClick={() => this.edit (record.notProId)}>编辑</a>}

              <Divider type="vertical" />
              <Link
                to={{pathname: `/sdpbusiness/informDetail/${record.notProId}`}}
              >
                详情
              </Link>
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
  request = () => {
    const {proId} = this.props.topbar;
    const params = {
      proId: proId,
    };
    this.props.infoAssistantAll (params);
    this.props.assistantNameList (params);
    this.setState ({
      proId: proId,
    });
  };
  // 更新 组件初始化时不调用，组件接受新的props时调用。
  componentWillReceiveProps (nextProps) {
    const nextAssistantList = nextProps.assistantList;
    let assistantRows = [];
    if (nextAssistantList && Object.keys (nextAssistantList).length) {
      assistantRows = [
        {
          notProId: nextAssistantList.notProId,
          notProName: nextAssistantList.notProName,
          progranmmeProjectId: nextAssistantList.progranmmeProjectId,
        },
      ];
    }
    // 方案下拉
    const assistantName = nextProps.assistantnamelist;
    const nameList = assistantName ? assistantName : [];
    this.setState ({
      datas: assistantRows,
      nameDatas: nameList,
    });
  }
  // 组件初始化时不调用，组件更新完成后调用
  componentDidUpdate (prevProps) {
    const prevId = prevProps.topbar.proId;
    const {proId} = this.props.topbar;
    if (proId && prevId !== proId) {
      this.request ();
    }
  }
  componentWillUnmount () {
    this.props.jurisdictionStatus (false);
  }

  isEditing = record => {
    return record.notProId === this.state.editingKey;
  };

  edit (key) {
    this.setState ({editingKey: key});
  }

  save (form, key) {
    form.validateFields ((error, row) => {
      if (error) {
        return;
      }
      this.setState ({editingKey: ''});
      // 保存数据
      const {proId} = this.state;
      const editparams = {
        proId: proId,
        programId: nameValSel,
      };
      this.props.assistantNameEdit (editparams);
    });
  }

  cancel = () => {
    this.setState ({editingKey: ''});
  };

  render () {
    const panelData = {
      title: '通知方案',
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const {isJurisdiction} = this.props;
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
    return (
      <div>
        {isJurisdiction !== true
          ? <React.Fragment>
              <Panel panelData={panelData} />
              <Card bordered={false} style={{background: '#f3f3f3'}}>
                <Table
                  style={{background: '#fff'}}
                  locale={{emptyText: '暂无数据'}}
                  rowKey="notProId"
                  className="content"
                  rowClassName="editable-row"
                  components={components}
                  dataSource={this.state.datas}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </React.Fragment>
          : <Unauthorized />}
      </div>
    );
  }
}

//修改
@connect (state => ({
  assistantnamelist: state.projectAssistant.proAssistantName,
}))
class EditableCell extends Component {
  getInput = () => {
    const {assistantnamelist} = this.props;

    return (
      <Select
        style={{width: '80%'}}
        onChange={this.handleChangeName}
        placeholder="请选择"
      >
        {assistantnamelist.length > 0 &&
          assistantnamelist.map (item => (
            <Option key={item.notProId} value={item.notProId}>
              {item.notProName}
            </Option>
          ))}
      </Select>
    );
  };
  handleChangeName (value) {
    nameValSel=value;
  }
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
            <td >
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

export default ProInfoAssistant;
