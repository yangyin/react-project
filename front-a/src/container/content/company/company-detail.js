import React, { PureComponent } from 'react';
import { Card, Avatar, Popover } from 'antd';
import Panel from '@/components/panel/panel';
import Emodal from '@/components/Emodal/Emodal';
import { connect } from 'react-redux';

import './company.less';
import { userDetailInfoAction, companyEditAction, statusControl, } from './store/actions.js';
import { projectTypeAction } from '@/core/common/actions';
import { Utils } from 'handlebars';

@connect(
    state => ({
        company: state.get('company'),
        common: state.get('common'),
    }),
    { userDetailInfoAction, companyEditAction, statusControl, projectTypeAction }
)
class CompanyDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        this.params = {
            modalData: [],
            userId: this.props.match.params.id
        }
    }

    componentDidMount () {
        const { userId } = this.params;
        // 详情
        this.props.userDetailInfoAction({ userId: userId, type: 'B' })
        // 获取认证企业类型
        this.props.projectTypeAction({ dicType: 'companytype' });
    }
    componentWillReceiveProps (nextProps) {
        const isRefresh = nextProps.company.get('isRefresh');
        const { userId } = this.params;
        if (isRefresh) {
            this.props.userDetailInfoAction({ userId: userId, type: 'B' });
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
    /*
     */
    showModal = (label, tagName, defaultValue) => {
        this.setState({
            visible: true
        })
        this.getModalData(label, tagName, defaultValue)
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    // 提交修改数据
    handleSubmit = (param) => {
        const { userId } = this.params;
        this.props.companyEditAction({ userId, ...param });
    }
    getModalData = (label, tagName, defaultValue) => {
        let modalData = [];
        const groupList = this.props.common.get('companyType') || [];
        switch (tagName) {
            case 'companyName':// 企业名称
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlenght:20,
                }];
                break;
            case 'legalPerson':// 法定代表人
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlenght:8,
                }];
                break;
            case 'legalPersonPhone':// 代理人手机号
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlenght:11,
                }];
                break;
            case 'companyType':// 企业类型
                modalData = [{
                    type: 'SELECT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    options: groupList,
                    selectType:'COMPANYTYPE',
                }];
                break;
            case 'companyCode':// 企业执照编号
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule:'',
                    tagName: tagName,
                    defaultValue: defaultValue,
                }];
                break;
            case 'agPhone':// 代理人手机号
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlenght:11,
                }];
                break;
            case 'businessAddr':// 办公地址
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                }];
                break;
            case 'businessBankCode':// 企业银行账户
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                }];
                break;
            case 'busineBankNo':// 企业银行账号
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                }];
                break;
            case 'busineOpenBank':// 企业银行开户行
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                }];
                break;
            case 'registerMoney':// 注册资金
                modalData = [{
                    type: 'INPUTNUM',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                    maxlenght:10,
                }];
                break;
            case 'scopeOperation':// 经营范围
                modalData = [{
                    type: 'INPUT',
                    label: label,
                    rule: '',
                    tagName: tagName,
                    defaultValue: defaultValue,
                }];
                break;

            default:
                break;
        }
        this.params.modalData = modalData;
    }
    render () {
        const panelData = {
            title: '企业详情',
            isBack: true
        };

        const { modalData } = this.params;
        const { visible } = this.state;
        const userInfo = this.props.company.get('userInfo');
        // this.renderString(userInfo);
        return (
            <div className="user">
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <div className="account-cont">

                        <Card title="基本信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>用户账号</div>
                                    <div>{userInfo.userCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>创建时间</div>
                                    <div>{userInfo.createTime}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>用户昵称</div>
                                    <div>{userInfo.userNikeName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>工卡卡号</div>
                                    <div>{userInfo.rfid}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证实名</div>
                                    <div>{userInfo.userName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>身份证号</div>
                                    <div>{userInfo.userCard}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>手机号码</div>
                                    <div>{userInfo.userPhone}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证自拍照</div>
                                    <div>
                                        {userInfo.userHeadPortrait
                                            ? <Popover content={<Avatar size={200} src={userInfo.userHeadPortrait} />} title=""><Avatar size={47} icon="user" src={userInfo.userHeadPortrait} /></Popover>
                                            : null}
                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>家庭地址</div>
                                    <div>{userInfo.userAddrProvince}{userInfo.userAddrCity}{userInfo.userAddrArea}{userInfo.userAddr}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行账户</div>
                                    <div>{userInfo.BankCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行（工资）卡号</div>
                                    <div>{userInfo.bankNo}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行开户行</div>
                                    <div>{userInfo.openBank}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="企业信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>企业账号</div>
                                    <div>{userInfo.userCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>平台信用等级</div>
                                    <div>--</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业名称</div>
                                    <div>{userInfo.companyName}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('企业名称', 'companyName', userInfo.companyName)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>企业执照编号</div>
                                    <div>{userInfo.companyCode}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('企业执照编号', 'companyCode', userInfo.companyCode)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>法定代表人</div>
                                    <div>{userInfo.legalPerson}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('法定代表人', 'legalPerson', userInfo.legalPerson)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>企业代理人</div>
                                    <div>{userInfo.agName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>代理人手机号</div>
                                    <div>{userInfo.legalPersonPhone}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('代理人手机号', 'legalPersonPhone', userInfo.legalPersonPhone)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>企业类型</div>
                                    <div>{userInfo.companyTypeName}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('企业类型', 'companyType', userInfo.companyTypeId)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>办公地址</div>
                                    <div>{userInfo.businessAddr}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('办公地址', 'businessAddr', userInfo.businessAddr)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>企业银行账户</div>
                                    <div>{userInfo.businessBankCode}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('企业银行账户', 'businessBankCode', userInfo.businessBankCode)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>企业银行账号</div>
                                    <div>{userInfo.busineBankNo}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('企业银行账号', 'busineBankNo', userInfo.busineBankNo)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>企业银行开户行</div>
                                    <div>{userInfo.busineOpenBank}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('企业银行开户行', 'busineOpenBank', userInfo.busineOpenBank)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>注册资金</div>
                                    <div>{userInfo.registerMoney} 万元</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('注册资金', 'registerMoney', userInfo.registerMoney)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>经营范围</div>
                                    <div>{userInfo.scopeOperation}</div>
                                    <div className="change">
                                        <span onClick={() => this.showModal('经营范围', 'scopeOperation', userInfo.scopeOperation)}>修改</span>
                                    </div>
                                </li>
                                <li>
                                    <div>认证有效期</div>
                                    <div>{userInfo.approveDate} 至 永久</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Card>
                {/* 修改的modal */}
                <Emodal
                    modalData={modalData}
                    visible={visible}
                    handleCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}


export default CompanyDetail;






