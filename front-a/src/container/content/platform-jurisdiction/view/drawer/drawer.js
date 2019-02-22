import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Drawer, Button, Select, Radio, Spin, notification, Checkbox } from 'antd';

import {
    platformSearchUser,
    platformUserGroupClear,
    platJurisdictionSave,
    platJurisdictionSaveStatus,
    platformJurisdictionGetDelAction,
    platformJurisdictionDelAction,
    platformJurisdictionDelStatus,
    platformDelClear
} from './../../store/actions';

const { Option } = Select;
const RadioGroup = Radio.Group;


@connect(
    state => ({
        platform: state.get('platformJurisdiction')
    }),
    {
        platformSearchUser,
        platformUserGroupClear,
        platJurisdictionSave,
        platJurisdictionSaveStatus,
        platformJurisdictionGetDelAction,
        platformJurisdictionDelAction,
        platformDelClear,
        platformJurisdictionDelStatus
    }
)
class PlatformDrawer extends PureComponent {
    state = {
        radioValue: 2,
        value: [],
        fetching: false,
        delList: []
    }
    userGroup = '';
    componentDidMount() {
        const { drawerData } = this.props;
        if (drawerData.type === 0) {
            this.props.platformJurisdictionGetDelAction({ jurId: drawerData.jurId });
        }
    }
    componentWillReceiveProps(nextProps) {

        //保存授权成功
        const isSave = nextProps.platform.get('isSave');
        if (isSave) {
            this.props.platJurisdictionSaveStatus(false);
            this.props.onCloseDrawer();
            this.setState(() => ({
                value: [],
                radioValue:2
            }));
        }

        //删除成功
        const isDel = nextProps.platform.get('isDel');
        if (isDel) {
            this.props.platformJurisdictionDelStatus(false);
            this.props.onCloseDrawer();
            this.setState(() => ({
                value: [],
                radioValue:2
            }));
        }

        //进入弹窗，请求删除对象
        const { drawerData } = nextProps;
        const delList = nextProps.platform.get('delList');
        if (drawerData.type === 0 && nextProps.visible && delList.size === 0) {
            this.props.platformJurisdictionGetDelAction({ jurId: drawerData.jurId });
        }
        //关闭弹窗，清除数据
        if (nextProps.visible === false) {
            //清除用户组的数据 TODO
            this.props.platformUserGroupClear();

            //清除delList数据
            this.props.platformDelClear();
        }
        //如果props的delList有数据，全部复制给state的delList
        // if (delList.size > 0) {
        this.setState(() => ({
            delList: delList.toJS().map(v => {
                v.isChecked = false;
                return v;
            })
        }))
        // }

    }

    onClose = () => {
        this.setState(() => ({
            value: [],
            radioValue:2
        }));
        this.props.onCloseDrawer();
    }

    //单选切换
    radioChange = (e) => {
        this.setState({
            radioValue: e.target.value,
        }, () => {
            const { radioValue } = this.state;
            if (radioValue === 1) {
                //获取用户组信息
                const userGroupList = this.props.platform.get('userGroupList');
                userGroupList.size === 0 && this.props.platformSearchUser({ type: 'G' });
            }
        });
    }

    //点击option，选中当前值 ,用户
    onSelect = (value) => {
        this.setState(() => ({
            value: value,
            fetching: false,
        }));
    }
    //用户组选中的值
    onSelectGroup = (value) => {
        this.userGroup = value;
    }
    //删除选中值
    onDeselect = () => {
        this.setState(() => ({
            value: [],
            fetching: false,
        }));
    }

    //删除时，改变checkbox值
    onCheckChange = (index, e) => {
        this.setState((prevState) => ({
            delList: prevState['delList'].map((v, i) => {
                if (i === index) {
                    v.isChecked = !v.isChecked;
                }
                return v;
            })
        }))




    }

    //请求下拉数据
    fetchUser = (value) => {
        this.props.platformSearchUser({ type: 'U', userName: value });
        this.setState({ fetching: true });
    }

    //保存 / 删除 授权
    onHandleClick = () => {
        const { drawerData } = this.props;
        if (drawerData['type'] === 1) { //授权
            const { radioValue } = this.state;
            let params = {
                jurId: drawerData.jurId,
                jgrRelationState: 'y'
            }
            if (radioValue === 1) { // 用户组
                params.type = 'G';
                params.userId = this.userGroup;

                if (!this.userGroup) {
                    return notification['warning']({
                        message: '提示',
                        description: '请选择用户组后再提交'
                    });
                }

            } else { //用户
                const { key } = this.state.value;
                if (!key) {
                    return notification['warning']({
                        message: '提示',
                        description: '请选择用户后再提交'
                    });
                }
                params.type = 'U';
                params.userId = key;
            }

            this.props.platJurisdictionSave(params);
        } else { //删除授权
            const delList = this.state.delList.filter(v => v.isChecked === true);
            this.props.platformJurisdictionDelAction({ deleteList: JSON.stringify({ userIds: delList }) });
        }
    }

    itemRender = () => {
        const { drawerData } = this.props;
        const { radioValue, fetching, value } = this.state;
        const userList = this.props.platform.get('user');
        const userGroupList = this.props.platform.get('userGroupList');
        const { delList } = this.state;

        if (drawerData['type'] === 1) { //授权
            return (
                <div>
                    <Select allowClear={true} placeholder="请选择" style={{ width: '100%' }} className={radioValue === 2 ? 'hide' : ''} onSelect={this.onSelectGroup}>

                        {userGroupList.map(v => (
                            <Option key={v.get('userId')} value={v.get('userId')}>{v.get('userName')}</Option>
                        ))}
                    </Select>
                    <Select className={radioValue === 1 ? 'hide' : ''}
                        mode={"multiple"}
                        labelInValue
                        value={value}
                        placeholder="请搜索选择"
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={this.fetchUser}
                        onSelect={this.onSelect}
                        onDeselect={this.onDeselect}
                        style={{ width: '100%' }}
                    >
                        {userList.map(d => <Option key={d.get('userId')}>{d.get('userName') || '没有名字'}--{d.get('userPhone')}</Option>)}
                    </Select>
                </div>
            )
        } else { //删除授权
            const jurMap = this.props.jurMap;
            return (
                <div>
                    <div className="del">
                        <p className="del-left">浏览用户</p>
                        <p className="del-right">给予浏览用户的权限</p>
                    </div>
                    <div className="del">
                        <p className="del-left">从中删除</p>
                        <div className="del-right">
                            {jurMap.size > 0 &&
                                <div className="del-item">
                                    <Checkbox className="del-checkbox" disabled/>
                                    <label>{jurMap.get('type')}---{jurMap.get('name')}</label>
                                </div>
                            }
                            {delList.map((v, i) => (
                                <div className="del-item" key={v.relationId}>
                                    <Checkbox className="del-checkbox" checked={v.isChecked} onChange={(e) => this.onCheckChange(i, e)} />
                                    <label>{v.type}---{v.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    }


    render() {
        const { drawerData } = this.props;
        const { radioValue } = this.state;
        return (
            <Drawer
                title={drawerData.type === 0 ? '删除授权' : '授权'}
                width={600}
                placement="right"
                open={false}
                closable={false}
                onClose={this.onClose}
                visible={this.props.visible}
            >
                <div className="drawer-content">
                    {drawerData.type === 1 && <RadioGroup className="radio-style" defaultValue={radioValue} value={radioValue} onChange={this.radioChange} buttonStyle="solid" size="large">
                        <Radio.Button value={1}>用户组</Radio.Button>
                        <Radio.Button value={2}>用户</Radio.Button>
                    </RadioGroup>}
                    {this.itemRender()}
                </div>
                <div className="drawer-footer">
                    <Button className="colose-btn" onClick={this.onClose} >取消</Button>
                    <Button onClick={this.onHandleClick} type="primary">确定</Button>
                </div>
            </Drawer>
        );
    }
}

export default PlatformDrawer;