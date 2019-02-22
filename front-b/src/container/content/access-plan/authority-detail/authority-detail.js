import React, { Component } from 'react';
import { Card, Row, Col, Icon, Modal, Select, Button, Checkbox, Radio } from 'antd';
import { connect } from 'react-redux';
import { getAuthDetailList, getUserListByJurRelation, getRoleList, saveJurRelation, deleteJurRelation } from '../store/action';
import Panel from '../../../../components/panel/panel';

import '../authority-detail/authority-detail.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;

@connect(
    state => state.authorityAssistantReducer,
    { getAuthDetailList, getUserListByJurRelation, getRoleList, saveJurRelation, deleteJurRelation }
)
class AuthroityDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: [true],
            clearModalVisible: false,
            editModalVisible: false,
            pgeId: this.props.match.params.id,
            targetType: 'M'
        }

        this.params = {
            targetType: 'M',
            parameter: '',
            jurProRelationId: '',
            targetd: '',
            jurUserList: null,
            rolelist: null,
            jurType: '',
            removeRationCheck: []
        }

    }

    componentDidMount() {
        const { pgeId } = this.state;

        this.props.getAuthDetailList(pgeId)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);

        const auth = nextProps.authoritylist;
        const authName = auth && auth.pgeName;
        const authlist = [];

        if (auth) {
            for (let key in auth) {
                if (key.includes('project_')) {
                    authlist.push(auth[key])
                }
            }
        }


        this.setState({
            assistantName: authName,
            assistantDatas: authlist,
        })

        this.params.jurUserList = nextProps.userlist && nextProps.userlist;
        this.params.rolelist = nextProps.rolelist && nextProps.rolelist;

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
                            <div key={plist[0].jurType}>
                                <div className="permiss_header">
                                    <Row>
                                        <Col span={18} className="bold">{plist[0].jurTypeName}</Col>
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
                                            <Row className="permiss_item" key={pitem.jurProRelationId} style={{ display: `${isShow[listkey] ? 'block' : 'none'}` }}>
                                                <Col span={18}>
                                                    <p className="bold">{pitem.jurName}</p>
                                                    <p className="desc">{pitem.jurDescribe}</p>
                                                </Col>
                                                <Col span={6} className="operation">
                                                    <span onClick={() => this.showEdit(pitem.jurProRelationId,pitem.jurName)}>授权</span>
                                                    <span className="line">|</span>
                                                    <span onClick={() => this.showDetail(pitem.jurProRelationId)}>详情</span>
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

    showEdit = (id,type) => {
        this.params.jurProRelationId = id;

        this.setState({
            jurType: type,
            editModalVisible: true
        })
    }

    showDetail = (id) => {
        this.props.getUserListByJurRelation(id);

        this.setState({
            clearModalVisible: true
        })
    }

    handleDelete = () => {
        this.props.deleteJurRelation({
            'pgeId': this.state.pgeId,
            'jsonJrrRelationList':JSON.stringify({
                'jrrRelationList': this.params.removeRationCheck
            })
        })

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

        if(e.target.checked === false){
            for( let i = 0; i < removeArr.length; i++ ){
                if(e.target.value === removeArr[i] ){
                    removeArr.splice(i,1)
                    break;
                }
            }
        }else if(e.target.checked === true){
            removeArr.push(e.target.value)
        }

        // removeRationCheck = checkedValues;
    }

    // 查询授权账户
    handleSearch = ( val ) => {
        let jurId = this.params.jurId;
        let type = this.params.targetType;
        let value = val;

        this.props.getRoleList({ 
            jurProRelationId: jurId,
            type: type,
            parameter: value
        })
    }

    handleChange = (value) => {
        // console.log(value)
        this.params.targetd = value;
    }

    onRoleChange = (e) => {
        this.params.targetType = e.target.value;
        this.setState({
            targetType: e.target.value
        })

        if(e.target.value === 'P' || e.target.value === 'R'){
            this.props.getRoleList({ 
                jurProRelationId: this.params.jurProRelationId,
                type: this.params.targetType,
                parameter: ''
            })
        }else{
            this.params.rolelist = [];
        }
    }

    submitAuth = () => {
        this.props.saveJurRelation({
            targetType: this.params.targetType,
            targetd: this.params.targetd,
            jurProRelationId: this.params.jurProRelationId,
            pgeId: this.state.pgeId
        })
        this.setState({
            editModalVisible: false
        })
    }


    render() {
        const panelData = {
            title: `${this.state.assistantName?this.state.assistantName:''}的权限方案`,
            isBack: true
        }

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }

        const { assistantDatas, clearModalVisible, editModalVisible, targetType } = this.state;
        const { jurUserList, rolelist } = this.params;

        let options = [];

        this.params.removeRationCheck = jurUserList && jurUserList.jrrRelationList.map((item)=>{
            return item.relationId
        })

        if(targetType === 'P' || targetType === 'R'){
            options = rolelist && rolelist.map(d => <Option key={d.id}>{d.name}</Option>);
        }else{
            options = rolelist && rolelist.map(d => <Option key={d.id}>{`${d.userPhone}   ${d.name}`}</Option>);
        }


        return (
            <div>
                <Panel panelData={panelData}></Panel>
                {assistantDatas && this.initPermissList(assistantDatas)}

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
                        <Col span={20}>{jurUserList && jurUserList.jurName}</Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={4}>从中删除</Col>
                        <Col span={20} className="delete_permiss_box">
                            <Row>
                                {
                                    (jurUserList && jurUserList.jurMap)
                                        ?
                                        <Col span={24} className="delete_item" >
                                            {jurUserList.jurMap.type} <span style={{ display: `${jurUserList.jurMap.name ? 'inline-block' : 'none'}` }}>——— {jurUserList.jurMap.name}</span>
                                        </Col>
                                        : ''
                                }
                                {
                                    jurUserList && jurUserList.jrrRelationList.map((item, index) => {
                                        return (
                                            <Col span={24} className="delete_item" key={item.relationId}>
                                                <Checkbox
                                                    defaultChecked={true}
                                                    value={item.relationId}
                                                    index={index}
                                                    onChange={this.onRemoveChange}
                                                >{item.type} <span style={{ display: `${item.name ? 'inline-block' : 'none'}` }}>——— {item.name}</span>
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
                            <Col span={20}>{this.state.assistantName}</Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={3} offset={1} style={{ textAlign: 'right' }}>授权项：</Col>
                            <Col span={20}>{this.state.jurType}</Col>
                        </Row>
                        <Row style={{ marginBottom: 10, padding: '10px 0 0 0', borderTop: '1px solid #ddd' }}><Col offset={2}>选择需要关联的授权对象设置</Col></Row>
                        <Row className="shouq_box">
                            <Col span={6} offset={2}>
                                <RadioGroup onChange={this.onRoleChange} defaultValue={targetType}>
                                    <Radio style={radioStyle} value={'D'}>项目创建人</Radio>
                                    <Radio style={radioStyle} value={'M'}>我自己(当前账户)</Radio>
                                    <Radio style={radioStyle} value={'B'}>项目负责人</Radio>
                                    <Radio style={radioStyle} value={'SCB'}>标段负责人</Radio>
                                    <Radio style={radioStyle} value={'TB'}>班组负责人</Radio>
                                    <Radio style={radioStyle} value={'U'}>某一账户</Radio>
                                    <Radio style={radioStyle} value={'P'}>部门</Radio>
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
                                        defaultValue={'请选择部门'}
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                        className={targetType === 'P' ? 'show' : 'hide'}
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

            </div>

        )
    }
}

export default AuthroityDetail;
