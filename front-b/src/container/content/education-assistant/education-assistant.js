import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Table, Divider, Input, InputNumber, Form} from 'antd';
import Panel from '../../../components/panel/panel';
import { connect } from 'react-redux';
import { educationAssistantAll, editEducation, copyEducation, deleteEducation, jurisdictionStatus, editEducationStatus, copyEducationStatus, deleteEducationStatus } from './store/action';
import { Unauthorized } from './../../error-page/not-found-page';
import './education-assistant.less';

const FormItem = Form.Item;
const EditableContext = React.createContext ();

const EditableRow = ({form, index, ...props}) =>{
    return (
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>  
    )
} ;

const EditableFormRow = Form.create () (EditableRow);

class EditableCell extends React.Component {
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
            {
                editing
                ? <FormItem style={{margin: 0}}>
                    {getFieldDecorator (dataIndex, {
                      rules: [
                        {
                          required: true,
                          message: `${title}不能为空!`,
                        },
                      ],
                      initialValue: record[dataIndex],
                    }) (this.getInput ())}
                  </FormItem>
                : restProps.children
            }
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

@connect(
    state => ({
        educationAssistantReducer: state.educationAssistantReducer
    }),
    { educationAssistantAll, editEducation, copyEducation, deleteEducation, jurisdictionStatus, editEducationStatus, copyEducationStatus, deleteEducationStatus }
)
class EducationAssistant extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
        editingKey: ''
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'programName', //可忽略key
        width: '20%',
        editable: true,
        key: 'programName'
      },
      {
        title: '备注',
        dataIndex: 'programContent',
        width: '30%',
        editable: true,
        key: 'programContent'
      },
      {
        title: '应用项目',
        dataIndex: 'proList', //可忽略key
        width: '30%',
        editable: false,
        key: 'proList',
        render: (text, record) => {
            const projects = record.proList;
            let str = '';
            for(let i = 0; i < projects.length; i++) {
                str += projects[i].proName + '，';
            }
            str = str.substring(0, str.length - 1);  
            return (
              <div>
                {str}
              </div>
            );
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing (record); //false
          return (
            <div>
              {editable
                ? <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a onClick={() => this.save (form, record.key, record.programId)} style={{marginRight: 8}} >
                          保存
                        </a>
                      )}
                    </EditableContext.Consumer>
                   
                      <a onClick={() => this.cancel (record.key)}>取消</a>
                      
                  </span>
                : <a onClick={() => this.edit (record.programId)}>编辑</a>
                }
                <Divider type="vertical" />
                {/* <Link to={
                    {
                        pathname: `/sdpbusiness/education/educationDetails`,
                        state: { id: record.programId }
                    }
                }>详情</Link> */}
                {/* <a onClick={() => this.goToDetails(record.programId)}>详情</a> */}
                <Link to={{pathname: `/sdpbusiness/education/educationDetails/${record.programId}`}}>详情</Link>
                <Divider type="vertical" />
                <a onClick={() => this.copy (record)} >复制</a>
                {
                    record.programType !== "A"
                    ? <span>
                            <Divider type="vertical" />
                            <a onClick={() => this.delete (record)} >删除</a>
                        </span>
                    :  '' 
                }
              
            </div>
          );
        },
      },
    ];
  }

    isEditing = record => {
        return record.programId === this.state.editingKey;
    };

    edit (key) {
        this.setState ({editingKey: key});
    }

    save (form, key, id) {
        form.validateFields ((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex (item => key === item.key);
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
            const datas = {
                id: id,
                name: newData[0].programName,
                content: newData[0].programContent
            }
            this.props.editEducation(datas);

        });
    }
    goToDetails (id) {
        this.props.history.push(`/sdpbusiness/education/educationDetails?id=${id}`);
    }
    copy (result) {
        // 保存数据
        const datas = {
            id: result.programId,
            name: result.programName,
            content: result.programContent
        }
        this.props.copyEducation(datas);
    }

    delete (result) {
        this.props.deleteEducation(result.programId);
    }

    cancel = () => {
        this.setState ({editingKey: ''});
    };
    componentDidMount() {
        this.props.educationAssistantAll();
        this.setState({
            data: this.props.educationAssistantReducer.educationList
        })
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    componentDidUpdate(prevProps) {
        /**
         * 判断删除任务，成功时，更改editList状态，并且刷新界面
         */
        const { editList, copyList, delList } = this.props.educationAssistantReducer;
        if(editList === true) {
            this.props.editEducationStatus(false); 
            this.props.educationAssistantAll();
        }
        if(copyList === true) {
            this.props.copyEducationStatus(false); 
            this.props.educationAssistantAll();
        }
        if(delList === true) {
            this.props.deleteEducationStatus(false); 
            this.props.educationAssistantAll();
        }
    }
    render () {
        const panelData = {
            pathname: '项目配置/教育助手',
            title: '教育助手',
            desc: '教育助手',
        };
        const components = {
            body: {
            row: EditableFormRow,
            cell: EditableCell,
            },
        };
        const { isJurisdiction, educationList } = this.props.educationAssistantReducer;
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
            {isJurisdiction !== true ?<React.Fragment>
                <Panel panelData={panelData} />
                <Card bordered={false} style={{background: '#f3f3f3'}}>
                    <div className="content">
                        <Table
                        components={components}
                        bordered={false}
                        dataSource={educationList}
                        rowKey="programId"
                        columns={columns}
                        locale={{emptyText: '暂无数据'}}
                        rowClassName="editable-row"
                        pagination={false}
                        />
                    </div>
                </Card>
                </React.Fragment> : <Unauthorized />}
            </div>
        );
    }
}
export default EducationAssistant;
