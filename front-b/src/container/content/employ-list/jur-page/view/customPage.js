import React from 'react';
import { connect } from 'react-redux';
import { Table, Divider,Popconfirm } from 'antd';


import CommonPage from './commonPage';


import {
    getCustomList,
    getEmployCommonJurList,
    updateListChecked,
    saveJurList,
    updateStatus,
} from './../../store/action';




@connect(
    state => ({
        staff: state.staffManagerReducer
    }),
    { getCustomList, getEmployCommonJurList, updateListChecked, saveJurList, updateStatus }
)
class CustomPage extends React.PureComponent {

    state = {
        isShow: false,
        type: '',// 1-项目通用权限保存 2 - 设置项目自定义权限 3 - 修改自定义权限 4 - 重置权限
        proId: ''
    }


    columns = [{
        title: '项目名称',
        dataIndex: 'proName'
    }, {
        title: '项目地址',
        dataIndex: 'proAddr'
    }, {
        title: '项目角色',
        dataIndex: 'roleName',
    }, {
    }, {
        title: '权限类型',
        dataIndex: 'permissionType'
    }, {
        title: '操作',
        key: 'isDefault',
        render: (text, record) => (
            <React.Fragment>
                {text['isDefault'] === '1' ? <span>
                    <a href="javascript:;" onClick={() => this.handleUpdate(record, '2')}>设置自定义权限</a>
                </span> : <span>
                        <a href="javascript:;" onClick={() => this.handleUpdate(record, '3')}>修改自定义权限</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定重置权限?"
                            onConfirm={() => this.resetSave(record,'4')}
                        >
                            <a href="javascript:;">重置为默认</a>
                        </Popconfirm>
                    </span>}
            </React.Fragment>
        ),
    }];


    componentDidMount() {
        this.props.getCustomList({ type: 2, userId: this.props.userId });
    }
    componentDidUpdate() {
        const { isUpdate } = this.props.staff;

        if (isUpdate) {
            this.props.updateStatus(false);
            this.props.getCustomList({ type: 2, userId: this.props.userId });
            this.setState({
                isShow: false
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            isShow: false
        })
    }

    /**
     *修改自定义权限 或者 设置自定义权限
     * @memberof CustomPage
     * getEmployCommonJurList(type:1-项目通用权限 2 - 项目自定义权限 3 - 设置自定义权限 4 - 修改自定义权限)
     * saveType:1-项目通用权限保存 2 - 设置项目自定义权限 3 - 修改自定义权限 4 - 重置权限
     */
    handleUpdate = (record, saveType) => {

        this.props.getEmployCommonJurList({ type: saveType === '2' ? '3' : '4', userId: this.props.userId, proId: record.proId });
        this.setState({
            type: saveType,
            proId: record.proId,
            isShow: true,
        })
    }

    /**
         *改变checkbox值，更改
         *
         * @memberof CurrencyPage
         */
    updateListChecked = (params) => {
        this.props.updateListChecked(params);
    }

    //保存
    save = () => {
        const { type, proId } = this.state;
        const { userId } = this.props;
        this.props.saveJurList({
            type,
            proId,
            userId,
            list: JSON.stringify(this.props.staff.employJurList)
        })
    }

    //重置权限保存
    resetSave = (record,type) => {
        const { userId } = this.props;
        this.setState({
            type,
            proId: record.proId,
            isShow: false,
        })
        this.props.saveJurList({
            type,
            userId,
            proId:record.proId
        })
    }

    render() {
        const { customList, employJurList } = this.props.staff;
        const { isShow } = this.state;
        return (
            <div>
                <p style={{ fontSize: 12 }}>*项目自定义权限：指该用户在某个项目下有与默认权限不同的权限！</p>
                <Table
                    rowKey="proId"
                    columns={this.columns}
                    dataSource={customList}
                    pagination={false}
                    style={{ marginBottom: 20 }}
                />
                {isShow && <CommonPage
                    jurList={employJurList}
                    updateListChecked={this.updateListChecked}
                    save={this.save}
                />}
            </div>
        )
    }
}


export default CustomPage;