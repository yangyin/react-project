import React, { PureComponent } from 'react';
import {Form, Card, Avatar, Popover } from 'antd';
import Emodal from '@/components/Emodal/Emodal';
import TopBar from '@/components/topBar/topBar';
import { connect } from 'react-redux';
import Utils from '@/utils/utils';
import { Unauthorized } from '@/container/error-page/not-found-page';


import './my-account.less';
import { addressSelector } from '../address/address';
import { accountInfoAction, statusControl, accountEditAction } from './store/actions.js';
import { projectTypeAction, getProvinceAction } from '@/core/common/actions';


@Form.create()
@connect(
    state => ({
        myAccount: state.get('myAccount'),
        common: state.get('common'),
        address: addressSelector(state.get('common'))
    }),
    { accountInfoAction, projectTypeAction, statusControl, accountEditAction, getProvinceAction }
)
class MyAccount extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // options,
        }
        this.params = {
            modalData: [],
        }
        this.clearInter = null;
    }

    componentDidMount () {
        this.request();
        this.props.getProvinceAction({ type: 1, id: 1 });
    }
    request = () => {
        // 详情
        this.props.accountInfoAction()
        // 获取认证企业类型
        this.props.projectTypeAction({ dicType: 'worktype' });
    }
    componentWillReceiveProps (nextProps) {
        const isRefresh = nextProps.myAccount.get('isRefresh');
        if (isRefresh) {
            this.request();
            this.props.statusControl(false);
        }
    }
    // 处理空字符显示‘--’
    renderString = (data) => {
        for (let i in data) {
            if (!data[i] && i != 'userHeadPortrait' && i != 'certificateUrls') {
                data[i] = '--';
            }
        }
    }
    showModal = (label, tagName, defaultValue) => {
        this.setState({
            visible: true
        })
        this.clearInter=null;
        this.getModalData(label, tagName, defaultValue);
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    // 提交修改数据
    handleSubmit = (param) => {
        this.props.accountEditAction({ ...param });
    }
    // 修改modal数据组装
    getModalData = (label, tagName, defaultValue) => {
        const {userPhone}=this.props.myAccount.get('userData');
        let modalData = [];
        const groupList = this.props.common.get('teamType') || [];
        const addressOptions=this.props.address;
        switch (tagName) {
            case 'userNikeName':// 用户名称
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlength:10,
                }];
                break;

            case 'userPhone':// 手机号码
                modalData = [{
                    type: 'PHONECODE',
                    label: label,
                    rule: null,
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlength:11,
                    rule:Utils.validFhone,
                }];
                break;
            case 'emergencyContactName':// 紧急联系人
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlength:8,
                }];
                break;
            case 'emergencyContactPhone':// 联系人电话
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule:Utils.validFhone,
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlength:11,
                }];
                break;
            case 'userWorkType':// 擅长工种
                modalData = [{
                    type: 'SELECT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    options: groupList,
                    selectType: 'COMPANYTYPE',
                }];
                break;
            case 'userAddr':// 家庭地址
                modalData = [{
                    type: 'ADDRESS',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    options: addressOptions,
                    maxlength:30,
                }];
                break;
            case 'bankNo':// 银行账号
                modalData = [{
                    type: 'PHONECODE',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlength:20,
                    userPhone,
                    rule:Utils.validBankNo
                }];
                break;
            case 'openBank':// 银行开户行
                modalData = [{
                    type: 'PHONECODE',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlength:15,
                    userPhone,
                }];
                break;
            case 'passwordManage':// 密码管理
                modalData = [{
                    type: 'INPUT',
                    label: '旧密码',
                    rule: null,
                    tagName: 'userPwd',
                    defaultValue: defaultValue,
                    maxlength:10,
                }, {
                    type: 'INPUT',
                    label: '新密码',
                    tagName: 'oldPwd',
                    defaultValue: defaultValue,
                    maxlength:10,
                    rule:null
                }];
                break;

            default:
                break;
        }
        this.params.modalData = modalData;
    }
  
    // 省市区加载数据
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];// 对象
        this.props.getProvinceAction({ type: targetOption['key'], id: targetOption['regionValue'] });
    }

    render () {
        const { modalData } = this.params;
        const { visible } = this.state;
        const userInfo = this.props.myAccount.get('userData');
        const topBarData = {
            title: '我的信息',
            userName: userInfo.userName || '',
            headImg: userInfo.userHeadPortrait,
        }
        const isJur = this.props.myAccount.get('isJur');
        return (
            <React.Fragment>
            {!isJur ? 
            <div className="count">
                <TopBar topBarData={topBarData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <div className="myCount">
                        <Card title="基本信息" bordered={false}>
                            <ul>
                                <li>
                                    <div>用户账号</div>
                                    <div>{userInfo.userCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>用户昵称</div>
                                    <div>{userInfo.userNikeName}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('用户昵称', 'userNikeName', userInfo.userNikeName)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>手机号码</div>
                                    <div>{userInfo.userPhone}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('手机号码', 'userPhone', userInfo.userPhone)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>姓名</div>
                                    <div>{userInfo.userName}
                                        {userInfo.userHeadPortrait
                                            ? <Popover content={<Avatar shape="square" size={200} src={userInfo.userCardUrl} />} title=""><Avatar shape="square" style={{ marginLeft: 20 }} size={47} icon="user" src={userInfo.userCardUrl} /></Popover>
                                            : null}

                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>身份证号</div>
                                    <div>{userInfo.userCard}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>家庭地址</div>
                                    <div><p className="homeAddr">{userInfo.userAddr}</p></div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('家庭地址', 'userAddr', userInfo.userAddr)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>紧急联系人</div>
                                    <div>{userInfo.emergencyContactName}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('紧急联系人', 'emergencyContactName', userInfo.emergencyContactName)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>联系人电话</div>
                                    <div>{userInfo.emergencyContactPhone}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('联系人电话', 'emergencyContactPhone', userInfo.emergencyContactPhone)}>修改</span>
                                    </div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="扩展信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>擅长工种</div>
                                    <div>{userInfo.userWorkType}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('擅长工种', 'userWorkType', userInfo.userWorkType)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>技能等级</div>
                                    <div>--</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>出没城市</div>
                                    <div>--</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行账户</div>
                                    <div>{userInfo.userName}</div>
                                    <div className="change">
                                    </div>
                                </li>
                                <li>
                                    <div>银行账号</div>
                                    <div>{userInfo.bankNo}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('银行账号', 'bankNo', userInfo.bankNo)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>银行开户行</div>
                                    <div>{userInfo.openBank}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('银行开户行', 'openBank', userInfo.openBank)}>修改</span>
                                    </div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="安全设置" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>密码管理</div>
                                    <div>*****</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('密码', 'passwordManage', '')}>修改</span>
                                    </div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Card>
                {/* 修改的modal */}
                <Emodal
                    modalData={modalData}
                    visible={visible}
                    clearInter={this.clearInter}
                    handleCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                />
                
            </div>
            
            : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default MyAccount;






