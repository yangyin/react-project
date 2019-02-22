import React, { Component } from 'react';
import { Card, Row, Col, Icon, Modal, Checkbox, Radio, Select, Button } from 'antd';
import { connect } from 'react-redux';
import {
    initSystemPermissList,
    getUserListByJurRelation,
    getRoleList,
    saveJurRelation,
    deleteJurRelation,
    jurisdictionStatus
} from './store/action';
import Panel from '../../../components/panel/panel';
import { Object } from 'core-js';
import { Unauthorized } from './../../error-page/not-found-page';

import './system-permiss.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;

@connect(
    state => ({
        systemPermissReducer: state.systemPermissReducer,
    }),
    { initSystemPermissList, getUserListByJurRelation, getRoleList, saveJurRelation, deleteJurRelation, jurisdictionStatus }
)
class SystemPermiss extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: [true],
            clearModalVisible: false,
            editModalVisible: false,
            targetType: 'M'
        }

        this.params = {
            targetType: 'M',
            targetd: '',
            jurId: '',
            jurType: '',
            jurName: '',
            removeRationCheck: []
        }
    }

    componentDidMount() {
        this.props.initSystemPermissList();
    }

    initPermissList = (permiss) => {

        const { isShow } = this.state;
        const list = Object.values(permiss).filter((item) => {
            return item.length > 0
        });

        return (
            <Card style={{ margin: 24 }}>
                {
                    list.map((plist, listkey) => {
                        return (
                            <div key={plist[0].type}>
                                <div className="permiss_header">
                                    <Row>
                                        <Col span={18} className="bold">{plist[0].type}</Col>
                                        <Col span={1}>授权给</Col>
                                        <Col span={5}>
                                            <a onClick={this.handleShow.bind(this, listkey)}>{isShow[listkey] ? '收起' : '展开'}</a>
                                            {isShow[listkey]
                                                ? <Icon type="up" style={{ margin: 5, fontSize: '8px', color: '#1890ff' }} />
                                                : <Icon type="down" style={{ margin: 5, fontSize: '8px', color: '#1890ff' }} />}
                                        </Col>
                                    </Row>
                                </div>
                                {
                                    plist.map((pitem) => {
                                        return (
                                            <Row className="permiss_item" key={pitem.jurId} style={{ display: `${isShow[listkey] ? 'block' : 'none'}` }}>
                                                <Col span={18}>
                                                    <p className="bold">{pitem.jurName}</p>
                                                    <p className="desc">{pitem.jurDescribe}</p>
                                                </Col>
                                                <Col span={6} className="operation">
                                                    <span onClick={this.showEditModal.bind(this, pitem.jurId, pitem.type, pitem.jurName)}>授权</span>
                                                    <span className="line">|</span>
                                                    <span onClick={this.showClearModal.bind(this, pitem.jurId)}>详情</span>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
            </Card>
        )

    }


    handleShow = (idx) => {
        const { isShow } = this.state;

        isShow[idx] = !isShow[idx];

        this.setState({
            isShow: isShow
        })
    }

    showEditModal = (id, type, name) => {

        this.params.jurId = id;

        this.setState({
            editModalVisible: true,
            jurType: type,
            jurName: name
        });
    }

    showClearModal = (id) => {
        this.props.getUserListByJurRelation(id);

        this.setState({
            clearModalVisible: true
        });
    }

    handleDelete = () => {
        this.props.deleteJurRelation(JSON.stringify({ 'userList': this.params.removeRationCheck }))

        this.setState({
            clearModalVisible: false,
        });
    }

    handleCancel = () => {
        this.setState({
            clearModalVisible: false,
            editModalVisible: false
        });
    }

    onRemoveChange = (e) => {
        let removeArr = this.params.removeRationCheck;

        if (e.target.checked === false) {
            for (let i = 0; i < removeArr.length; i++) {
                if (e.target.delType === removeArr[i].deleteType) {
                    removeArr.splice(i, 1)
                    break;
                }
            }
        } else if (e.target.checked === true) {
            removeArr.push({
                deleteType: e.target.delType,
                relationId: e.target.value
            })
        }

        // removeRationCheck = checkedValues;
    }

    handleChange = (value) => {
        this.params.targetd = value;
    }

    onRoleChange = (e) => {
        this.params.targetType = e.target.value;
        this.setState({
            targetType: e.target.value
        })

        if (e.target.value === 'D' || e.target.value === 'R') {
            this.props.getRoleList({
                jurId: this.params.jurId,
                type: this.params.targetType,
                parameter: ''
            })
        } else {
            this.props.getRoleList({
                jurId: '',
                type: '',
                parameter: ''
            })
        }
    }

    // 查询授权账户
    handleSearch = (val) => {
        let jurId = this.params.jurId;
        let type = this.params.targetType;
        let value = val;

        this.props.getRoleList({
            jurId: jurId,
            type: type,
            parameter: value
        })
    }

    submitAuth = () => {
        this.props.saveJurRelation({
            targetType: this.params.targetType,
            targetd: this.params.targetd,
            jurId: this.params.jurId,
        })
        this.setState({
            editModalVisible: false
        })
    }

    render() {
        const panelData = {
            title: '系统权限',
        }

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }

        let options = '';

        const { clearModalVisible, editModalVisible, targetType, jurType, jurName } = this.state;
        const {
            permisslist,
            userlist,
            rolelist,
            isJurisdiction
        } = this.props.systemPermissReducer;

        this.params.removeRationCheck = userlist && userlist.jrrRelationList.map((item) => {
            return { deleteType: item.deleteType, relationId: item.relationId }
        })

        if (targetType === 'D' || targetType === 'R') {
            options = rolelist && rolelist.map(d => <Option key={d.id}>{d.name}</Option>);
        } else {
            options = rolelist && rolelist.map(d => <Option key={d.id}>{`${d.userPhone}   ${d.name}`}</Option>);
        }


        return (
            <div>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData}></Panel>
                        {permisslist && this.initPermissList(permisslist)}

                        {/* 移除权限对象mode */}
                        {clearModalVisible && <Modal title="移除授权对象"
                            visible={clearModalVisible}
                            onCancel={this.handleCancel}
                            width={700}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" onClick={this.handleDelete}>删除</Button>
                            ]}
                        >
                            <Row>
                                <Col span={4}>权限</Col>
                                <Col span={20}>系统权限</Col>
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <Col span={4}>从中删除</Col>
                                <Col span={20} className="delete_permiss_box">
                                    <Row>
                                        {
                                            (userlist && userlist.jurMap)
                                                ?
                                                <Col span={24} className="delete_item" >
                                                    <span>{userlist.jurMap.type} ——— {userlist.jurMap.userName}</span>
                                                </Col>
                                                : ''
                                        }
                                        {
                                            userlist && userlist.jrrRelationList.map((item, index) => {
                                                return (
                                                    <Col span={24} className="delete_item" key={item.relationId}>
                                                        <Checkbox
                                                            defaultChecked={true}
                                                            value={item.relationId}
                                                            index={index}
                                                            delType={item.deleteType}
                                                            onChange={this.onRemoveChange}
                                                        >{item.type} ——— {item.userName}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })

                                        }

                                    </Row>
                                </Col>
                            </Row>
                        </Modal>
                        }

                        {/* 授权对象modal */}
                        {
                            editModalVisible && <Modal title="授权对象设置"
                                visible={editModalVisible}
                                // onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                width={700}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                                    <Button key="submit" type="primary" onClick={this.submitAuth}>保存</Button>
                                ]}
                            >
                                <Row style={{ marginBottom: 10 }}>
                                    <Col span={3} offset={1} style={{ textAlign: 'right' }}>权限方案：</Col>
                                    <Col span={20}>{jurType}</Col>
                                </Row>
                                <Row style={{ marginBottom: 10 }}>
                                    <Col span={3} offset={1} style={{ textAlign: 'right' }}>授权项：</Col>
                                    <Col span={20}>{jurName}</Col>
                                </Row>
                                <Row style={{ marginBottom: 10, padding: '10px 0 0 0', borderTop: '1px solid #ddd' }}><Col offset={2}>选择需要关联的授权对象设置</Col></Row>
                                <Row className="shouq_box">
                                    <Col span={6} offset={2}>
                                        <RadioGroup onChange={this.onRoleChange} defaultValue={targetType}>
                                            <Radio style={radioStyle} value={'M'}>我自己(当前账户)</Radio>
                                            <Radio style={radioStyle} value={'U'}>某一账户</Radio>
                                            <Radio style={radioStyle} value={'E'}>员工</Radio>
                                            <Radio style={radioStyle} value={'D'}>部门</Radio>
                                            <Radio style={radioStyle} value={'R'}>项目角色</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span={2}></Col>
                                    <Col span={9}>
                                        <div>
                                            <Select
                                                showSearch
                                                allowClear={true}
                                                placeholder={'请输入搜选账户'}
                                                style={{ width: '100%' }}
                                                defaultActiveFirstOption={false}
                                                showArrow={false}
                                                filterOption={false}
                                                onSearch={this.handleSearch}
                                                onChange={this.handleChange}
                                                notFoundContent={null}
                                                className={targetType === 'U' ? 'show' : 'hide'}
                                            >
                                                {options}
                                            </Select>
                                            <Select
                                                showSearch
                                                allowClear={true}
                                                placeholder={'请输入搜选员工'}
                                                style={{ width: '100%' }}
                                                defaultActiveFirstOption={false}
                                                showArrow={false}
                                                filterOption={false}
                                                onSearch={this.handleSearch}
                                                onChange={this.handleChange}
                                                notFoundContent={null}
                                                className={targetType === 'E' ? 'show' : 'hide'}
                                            >
                                                {options}
                                            </Select>
                                            <Select
                                                defaultValue={'请选择部门'}
                                                style={{ width: '100%' }}
                                                onChange={this.handleChange}
                                                className={targetType === 'D' ? 'show' : 'hide'}
                                            >
                                                {options}
                                            </Select>
                                            <Select
                                                defaultValue={'请选择项目角色'}
                                                style={{ width: '100%' }}
                                                onChange={this.handleChange}
                                                className={targetType === 'R' ? 'show' : 'hide'}
                                            >
                                                {options}
                                            </Select>
                                        </div>
                                    </Col>
                                </Row>
                            </Modal>

                        }
                    </React.Fragment>
                    : <Unauthorized />
                }


            </div>
        )
    }



}

export default SystemPermiss;