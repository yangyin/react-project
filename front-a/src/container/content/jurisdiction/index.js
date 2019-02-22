import React, { PureComponent } from 'react';
import { Form, Input, Popconfirm, Radio, Card, Checkbox,Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getJurisdictionAction, editJurAction, jurUpdateSuccess, copyJurAction, delJurAction, getJurNewListAction,updateListChecked,jurSaveAction } from './store/actions';

import PanelComp from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';


import './jurisdiction.less';


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const EditableContext = React.createContext();


const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
    getInput = () => {
        return <Input />;
    };

    render() {
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
                {(form) => {
                    const { getFieldDecorator } = form;

                    return (
                        <td {...restProps}>
                            {editing ? (
                                <React.Fragment>
                                    <FormItem style={{ margin: 0 }}>
                                        {getFieldDecorator(dataIndex, {
                                            rules: [{ required: true, message: `${title}不能为空!` }],
                                            initialValue: record[dataIndex],
                                        })(this.getInput())}
                                    </FormItem>
                                </React.Fragment>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


const panelData = {
    title: '默认权限方案',
};


@connect(
    state => {
        return {
            jur: state.get('jurisdction')
        };
    },
    { getJurisdictionAction, editJurAction, jurUpdateSuccess, copyJurAction, delJurAction, getJurNewListAction,updateListChecked,jurSaveAction }
)
class Jurisdiction extends PureComponent {


    constructor(props) {
        super(props);
        this.state = { 
            editingKey: '',
            isSave:true,
            radioValue:'QSjnnNzSgk2MnoemiQ4',
            isAllChecked:false 
        };
        this.columns = [
            { title: '方案名称', dataIndex: 'pgeName', editable: true },
            { title: '说明', dataIndex: 'pgeRemarks', editable: true },
            {
                title: '操作', dataIndex: 'pgeType', render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {
                                editable ? (
                                    <span>
                                        <EditableContext.Consumer>
                                            {(form) => (
                                                <a
                                                    href="#"
                                                    onClick={(e) => this.save(form, record, e)}
                                                    style={{ marginRight: 8 }}
                                                >保存</a>
                                            )}
                                        </EditableContext.Consumer>
                                        <Popconfirm
                                            title="确定取消?"
                                            onConfirm={() => this.cancel(record.key)}
                                        >
                                            <a href="#">取消</a>
                                        </Popconfirm>
                                    </span >
                                ) : (
                                        <span>
                                            <a href="#" onClick={(e) => this.edit(record.pgeId, e)}>编辑 </a>|
                                            <a href="#" onClick={(e) => this.copy(record, e)}> 复制 </a>|
                                            {text === 'B' && (
                                                <span>
                                                    <Popconfirm title="确定要删除?" onConfirm={() => this.del(record)} okText="确定" cancelText="取消">
                                                        <a href="#"> 删除 </a>
                                                    </Popconfirm>
                                                    |</span>)}
                                            <Link to={`/setting/Jurisdiction/details?name=${encodeURI(record.pgeName)}&id=${record.pgeId}`}> 详情</Link>
                                        </span>
                                    )
                            }
                        </div>
                    )
                }
            },
        ]
    }

    isEditing = record => record.pgeId === this.state.editingKey;

    //点击编辑
    edit = (key, e) => {
        e.preventDefault();
        this.setState({ editingKey: key });
    }
    //取消 保存
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    //save 保存编辑
    save = (form, record, e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                this.props.editJurAction({ ...values, pgeId: record.pgeId });
            }
        });
    }

    //复制
    copy = (record, e) => {
        e.preventDefault();
        this.props.copyJurAction({ ...record, copyPgeId: record.pgeId, pgeId: '' });
    }

    //删除
    del = (record) => {
        this.props.delJurAction({ pgeId: record.pgeId });
    }


    componentDidMount() {
        //获取列表
        // this.props.getJurisdictionAction();
        //改版后请求
        this.props.getJurNewListAction('QSjnnNzSgk2MnoemiQ4');
    }
    componentWillMount() {
        this.setState({
            isSave:true
        })
    }

    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.jur.get('isUpdate');
        const jurList = this.props.jur.get('jurList').toJS();
        const nextList = nextProps.jur.get('jurList').toJS();

        if( (JSON.stringify(nextList) !== JSON.stringify(jurList)) ) {
            let arr = nextList.filter(v => !v.parentPerTargetId);
            if(arr.length === 0) {
                this.setState({
                    isAllChecked:true
                })
            }
        }

        if (isUpdate) {
            this.props.jurUpdateSuccess({ status: false });
            // this.props.getJurisdictionAction();
            this.props.getJurNewListAction(this.state.radioValue);
            this.state.editingKey && this.setState({ editingKey: '' });
        }
    }

    render() {
        /*         const pgeList = this.props.jur.get('pgeList').toJS();
                
                const components = {
                    body: {
                        row: EditableFormRow,
                        cell: EditableCell,
                    },
                };
                const columns = this.columns.map((col) => {
                    if (!col.editable) {
                        return col;
                    }
                    return {
                        ...col,
                        onCell: record => {
                            return {
                                record,
                                inputType: 'text',
                                dataIndex: col.dataIndex,
                                title: col.title,
                                editing: this.isEditing(record),
                            }
                        },
                    };
                }); */
        const jurList = this.props.jur.get('jurList').toJS();
        const isJur = this.props.jur.get('isJur');
        console.log(this.state)

        return (
            <React.Fragment>
                {
                    !isJur
                        ? <div id="jurisdction-page">
                            <PanelComp panelData={panelData} />
                            <Card style={{ margin: 24 }}>
                                <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
                                    <RadioButton value="QSjnnNzSgk2MnoemiQ4">行政单位</RadioButton>
                                    <RadioButton value="1HLcJSdvLFoUlld0voH">建设单位</RadioButton>
                                    <RadioButton value="7Va1tNd94LBrr0CKvc1">施工单位</RadioButton>
                                    <RadioButton value="x1Ba1qoEhfyP6S2qTvN">劳务公司</RadioButton>
                                    <RadioButton value="sUgIgRg59csISVYbByH">班组</RadioButton>
                                </RadioGroup>

                                <div style={{marginTop:10}}>
                                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                                        <Checkbox checked={this.state.isAllChecked} style={{margin:10}} onChange={this.checkboxChange} parentId="all" permissionId="all" >全选/取消全选</Checkbox>
                                        <Button type="primary" disabled={this.state.isSave} onClick={this.save}>保存</Button>
                                    </div>
                                    { jurList.length>0 && jurList.map(f => (
                                        <Card title={f['parentPerName']} key={f['parentId']}>
                                        {
                                            f['childList'].length>0 && f['childList'].map(v =>(
                                                <div key={v.permissionId} style={{marginBottom:10}}>
                                                    <Checkbox checked={parseInt(v.isSelected)} onChange={this.checkboxChange} permissionId={v.permissionId} parentId={v.parentId}>{v.permissionName}</Checkbox>
                                                    <label style={{color:'#999',fontSize:12}}>{v.description}</label>
                                                </div>
                                            ))
                                        }
                                        </Card>
                                    ))}
                                </div>

                            </Card>


                            {/* <Table
                                rowKey="pgeId"
                                style={{ margin: 24 }}
                                columns={columns}
                                dataSource={pgeList}
                                pagination={false}
                                components={components}
                                rowClassName="editable-row"
                            /> */}
                        </div>
                        : <Unauthorized />
                }
            </React.Fragment>

        );
    }

    onRadioChange = (e) => {
        const { value } = e.target;
        this.props.getJurNewListAction(value);
        this.setState({
            radioValue:value,
            isAllChecked:false
        })
    }

    checkboxChange = (e) => {
        
        const {parentId, permissionId,checked} = e.target;
        if(parentId === 'all') {
            this.props.updateListChecked({parentId, permissionId:e.target.checked});
        } else {
            this.props.updateListChecked({parentId, permissionId});
        }
        console.log(checked)
        this.setState({
            isSave:false,
            isAllChecked:checked
        })
    }

    //保存
    save = () => {
        const jurList = this.props.jur.get('jurList').toJS();
        this.props.jurSaveAction({roleId:this.state.radioValue,list:JSON.stringify(jurList)});
    }


}



export default Jurisdiction;