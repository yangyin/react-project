import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Divider, Table, Input, InputNumber, Form} from 'antd';

import Panel from '../../../components/panel/panel';
import {connect} from 'react-redux';
import {
  getAssistantList,
  updateInform,
  copyInform,
  deleteInform,
  jurisdictionStatus,
} from './store/action';
import {Unauthorized} from './../../error-page/not-found-page';

import './assistant-inform.less';


const FormItem = Form.Item;
const EditableContext = React.createContext ();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create () (EditableRow);
const data=[];
class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
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
                          message: `请输入 ${title}!`,
                        },
                      ],
                      initialValue: record[dataIndex],
                    }) (this.getInput ())}
                  </FormItem>
                : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
@connect (
  state => ({
    informList: state.assistantInform.informList.noticeProgrammeList,
    isJurisdiction: state.assistantInform.isJurisdiction,
  }),
  {jurisdictionStatus, getAssistantList, updateInform, copyInform, deleteInform}
)
class AssistantInform extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data,
      editingKey: '',
      redirect: false,
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'notProName',
        width: '20%',
        editable: true,
        key: 'notProName',
      },
      {
        title: '备注',
        dataIndex: 'notProRemark',
        width: '20%',
        editable: true,
        key: 'notProRemark',
      },
      {
        title: '相关项目',
        dataIndex: 'projectList',
        width: '30%',
        editable: false,
        render: (text, record) => {
          var projects = record.projectList;
          var str = '';

          if (record && record.projectList.length > 0) {
            for (let i = 0; i < projects.length; i++) {
              str += projects[i].proName + '、';
            }
          }

          return (
            <span>
              {str}
            </span>
          );
        },
      },

      {
        title: '操作',
        dataIndex: 'operation',
        width: '25%',
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
              <Divider type="vertical" />
              <a onClick={() => this.copy (record.notProId)}>
                复制
              </a>
              <Divider type="vertical" />
              <a className={(record.notProType) === 'A' ? 'hide' : 'lineShow'}
                onClick={() => this.del (record.notProId)}
              >删除</a>
            </div>
          );
        },
      },
    ];
  }
  componentDidMount () {
    this.props.getAssistantList ();
  }
  // 更新 组件接受新的props时调用
  componentWillReceiveProps (nextProps) {
    this.setState ({
      data: nextProps.informList,
    });
  }
  componentWillUnmount () {
    this.props.jurisdictionStatus (false);
  }
  jumpToDetail = () => {
    this.setState ({
      redirect: true,
    });
  };
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
      const newData = [...this.state.data];
      const index = newData.findIndex (item => key === item.notProId);
      if (index > -1) {
        const item = newData[index];
        newData.splice (index, 1, {
          ...item,
          ...row,
        });
        this.setState ({data: newData, editingKey: ''});
      } else {
        newData.push (row);
        this.setState ({data: newData, editingKey: ''});
      }
      // 保存数据
      const updateParams = {
        id: newData[index].notProId,
        notProName: newData[index].notProName,
        notProRemark: newData[index].notProRemark,
      };
      this.props.updateInform (updateParams);
    });
  }

  cancel = () => {
    this.setState ({editingKey: ''});
  };

  copy (key) {
    const newData = [...this.state.data];
    const index = newData.findIndex (item => key === item.notProId);
    // if (index > -1) {
    //   const item = newData[index];
    //   newData.push (item);
    //     this.setState ({data: newData, editingKey: ''});
    // }
    // 复制
    const copyParams = {
      copyNotProId: newData[index].notProId,
      notProName: newData[index].notProName,
      notProRemark: newData[index].notProRemark,
    };
    this.props.copyInform (copyParams);
  }

  del (key) {
    const dataSource = [...this.state.data];
    const index = dataSource.findIndex (item => key === item.notProId);
    // dataSource.splice (index, 1);
    // this.setState ({data: dataSource});
    const delParams = {
      notProId: dataSource[index].notProId,
    };
    this.props.deleteInform (delParams);
  }

  render () {
    const panelData = {title: '通知助手'};
    const {isJurisdiction} = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

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
                  rowKey="notProId"
                  className="content"
                  rowClassName="editable-row"
                  components={components}
                  bordered={false}
                  dataSource={this.state.data}
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

export default AssistantInform;
