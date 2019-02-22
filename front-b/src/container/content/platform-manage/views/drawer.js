import React from 'react';
import { Drawer, Button, Row, Col, Divider, Radio, Select, Checkbox,notification } from 'antd';
import { connect } from 'react-redux';

import { getRoleListAction, clearRoleSearchList, saveAction, updateStatus, getJurRelationListAction, initDelList ,deleteRelationAction} from './../store/actions';

const RadioGroup = Radio.Group;
const Option = Select.Option;

@connect(
    state => ({
        platfrom: state.platformManage
    }),
    { getRoleListAction, clearRoleSearchList, saveAction, updateStatus, getJurRelationListAction, initDelList,deleteRelationAction }
)
class PlatfromDrawer extends React.Component {

    state = {
        targetType: 'M',
        label: '', //员工 或者 账户的选中名称
        key: '',//员工 或者 账户的选中id
    }


    chooseDelList = [] //移除授权对象，选中列表

    /**
     * modalData { 
     *      type: 1：授权，2：详情
     *      rowData:
     * }
     *  */

    shouldComponentUpdate(nextProps) {
        // if(!nextProps['visible']) {
        //     return false;
        // }
        return true;
    }
    componentDidUpdate() {
        const { visible, modalData, platfrom } = this.props;
        if (visible && JSON.stringify(platfrom['delList']) === '{}') {
            if (modalData['type'] === 2) { //详情请求
                this.props.getJurRelationListAction({ jurId: modalData.rowData.jurId });
            }
        }

        if(!visible) {
            this.chooseDelList = [];
        }

        if (platfrom['isUpdate']) {
            this.props.updateStatus(false);
            this.setState({
                targetType: 'M',
                label: '', //员工 或者 账户的选中名称
                key: '',//员工 或者 账户的选中id
            })
            this.onClose();
        }
    }
    /**
     *授权时，切换单选按钮
     */
    radioChange = (e) => {
        const { value } = e.target;

        switch (value) {
            case 'D': //部门
                const { deptList } = this.props.platfrom;
                deptList.length === 0 && this.props.getRoleListAction({ type: 'D' });
                break;
            case 'U':
                this.props.clearRoleSearchList();
                break;
            case 'E':
                this.props.clearRoleSearchList();
                break;
            default: ;
        }

        this.setState({
            targetType: value,
            key: '',
            label: ''
        });

    }

    /**
     *员工 或者 账户 或者 部门 选择下拉框时，选择的值
     *
     * @memberof PlatfromDrawer
     */
    handleChange = (e) => {
        this.setState({
            key: e.key,
            label: e.label
        })
    }

    // 查询授权账户或员工
    handleSearch = (val) => {
        this.props.getRoleListAction({
            type: this.state.targetType,
            parameter: val
        })
    }

    //保存 或者 删除时
    handleActive = () => {
        const { modalData } = this.props;
        if (modalData['type'] === 1) { //保存
            this.props.saveAction({
                targetType: this.state.targetType,
                jurId: modalData.rowData.jurId,
                targetd: this.state.key
            })
        } else { //删除
            if(this.chooseDelList.length === 0) {
                return notification.warning({
                    key:'1',
                    message: '提示',
                    description: '请先选择要删除的对象！',
                    duration:2
                })
            }
            this.props.deleteRelationAction({
                deleteList:JSON.stringify({userList:this.chooseDelList})
            })
        }
    }
    _renderAddItem = () => {
        const { modalData, platfrom } = this.props;
        const { targetType, key, label } = this.state;
        return (
            <div>
                <Row style={{ marginBottom: 10 }}>
                    <Col span={3} offset={1} style={{ textAlign: 'right' }}>权限方案：</Col>
                    <Col span={20}>{modalData.parentjurName}</Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                    <Col span={3} offset={1} style={{ textAlign: 'right' }}>授权项：</Col>
                    <Col span={20}>{modalData.rowData.jurName}</Col>
                </Row>
                <Divider />
                <Row><Col offset={2}>选择需要关联的授权对象设置</Col></Row>
                <Row style={{ marginTop: 10 }}>
                    <Col offset={2} span={9}>
                        <RadioGroup value={targetType} onChange={this.radioChange}>
                            <Radio className="radio-style" value={'M'}>我自己(当前账户)</Radio>
                            <Radio className="radio-style" value={'U'}>某一账户</Radio>
                            <Radio className="radio-style" value={'E'}>员工</Radio>
                            <Radio className="radio-style" value={'D'}>部门</Radio>
                            {/* <Radio className="radio-style" value={'R'}>项目角色</Radio> */}
                        </RadioGroup>
                    </Col>
                    <Col span={9}>
                        <div>
                            <Select
                                showSearch
                                value={{ key, label }}
                                placeholder={targetType === 'U' ? '请输入搜选账户' : '请输入搜选员工'}
                                style={{ width: '100%' }}
                                onSearch={this.handleSearch}
                                onChange={this.handleChange}
                                notFoundContent={null}
                                labelInValue={true}
                                className={(targetType === 'U' || targetType === 'E') ? 'show' : 'hide'}
                            >
                                {
                                    platfrom['searchList'].map(d => <Option key={d.id}>{`${d.userPhone}   ${d.name}`}</Option>)
                                }
                            </Select>
                            <Select
                                placeholder='请选择部门'
                                value={{ key, label }}
                                style={{ width: '100%' }}
                                onChange={this.handleChange}
                                labelInValue={true}
                                className={targetType === 'D' ? 'show' : 'hide'}
                            >
                                {
                                    platfrom['deptList'].map(f => (
                                        <Option key={f.id}>{f.name}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
    _renderRemoveItem = () => {
        const { modalData, platfrom } = this.props;
        const { jurMap, jrrRelationList } = platfrom.delList;

        return (
            <div>
                <Row>
                    <Col span={3} offset={1} style={{ textAlign: 'right' }}>权限：</Col>
                    <Col span={20}>{modalData.rowData.jurName}</Col>
                </Row>
                <Row>
                    <Col span={3} offset={1} style={{ textAlign: 'right' }}>从中删除：</Col>
                    <Col span={20}>
                        <Row>
                            {jurMap && <Col span={24}>{`${jurMap.type} -- ${jurMap.userName}`}</Col>}
                            {jrrRelationList && jrrRelationList.map(f => (
                                <Col span={24} key={f['relationId']}>
                                    <Checkbox onChange={this.delCheckboxChange} value={f}>{`${f.type} -- ${f.userName}`}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    delCheckboxChange = (e) => {
        // console.log(e.target)
        const { checked , value } = e.target;
        if(checked) {
            this.chooseDelList.push(value);
        } else {
            this.chooseDelList = this.chooseDelList.filter(v => v['relationId'] !== value['relationId']);
        }
    }

    render() {
        const { visible, modalData } = this.props;
        // const { targetType, key, label } = this.state;
        return (
            <Drawer
                className="platform-drawer"
                title={modalData['type'] === 1 ? '授权对象设置' : '移除授权对象'}
                width={720}
                onClose={this.onClose}
                visible={visible}
            >
                {modalData['type'] === 1 ? this._renderAddItem() : this._renderRemoveItem()}
                <div className="footer">
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>关闭</Button>
                    <Button onClick={this.handleActive} type="primary">
                        {modalData['type'] === 1 ? '保存' : '删除'}
                    </Button>
                </div>
            </Drawer>
        )
    }

    /**
     *关闭drawer
     */
    onClose = () => {
        this.props.onClose();
        this.props.initDelList();
    };
}

export default PlatfromDrawer;