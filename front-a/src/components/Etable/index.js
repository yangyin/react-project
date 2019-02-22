import React, { PureComponent } from 'react';
import { Table, Form ,Input} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);



class EditableCell extends React.Component {

    getInput = ()=><Input />;

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
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `${title}不能为空!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


class ETable extends PureComponent {


    state = {
        editingKey: ''
    }
    //主要是暴露外面调用，更改state
    updateState = (key) => {
        this.setState({
            editingKey:key
        })
    }
    getContext = () => EditableContext;
    render() {
        const {pagination} = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.props.columns.map((col) => {

            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.props.isEditing(record, this.state.editingKey),
                }),
            };
        });

        return (
            <div>
                <Table
                    rowKey={this.props.rowKey}
                    components={components}
                    bordered={false}
                    dataSource={this.props.data}
                    columns={columns}
                    rowClassName="editable-row"
                    style={{background:'#fff',margin:24}}
                    pagination={pagination === false&&false}
                />
            </div>
        );
    }
}

ETable.propTypes = {
    data:PropTypes.array.isRequired,
    columns:PropTypes.array.isRequired,
    isEditing:PropTypes.func.isRequired,
    rowKey:PropTypes.string
}


export default ETable;

//this.props.data ：数据源
//this.props.columns：colums定义
//this.props.isEditing ：比较key,是否可编辑