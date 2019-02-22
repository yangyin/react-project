import React , { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
// import { getInformation } from '../../../redux/systemConfiguration.redux';
import Panel from '../../../components/panel/panel';

@connect(
    state => state,
    // { getInformation }
)
class EnterpriseInfo extends Component {
    constructor(props) {
        super(props);
        //this.props.getInformation();
    }
    render() {
        const panelData = { pathname: '系统 / 信息配置', title: '信息配置', desc: '信息配置，是用来设置企业用户信息及认证的功能' }
        const information = this.props.systemConfiguration.information;
        return (
            <div>
               <Panel panelData={panelData} />
               <Card bordered={false} style={{ margin: 24 }}>
                    <div className="account-cont">
                        <Card title="企业信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>企业账号</div>
                                    <div className="info">{information.businessId}</div>
                                    <div className="change"></div>
                                    <div className="text">系统自动生成的企业识别信息。</div>
                                </li>
                                <li>
                                    <div>平台信用等级</div>
                                    <div className="info">{information.businessLevel}</div>
                                    <div className="change"></div>
                                    <div className="text">系统自动评级数据。</div>
                                </li>
                                <li>
                                    <div>企业名称</div>
                                    <div className="info">{information.companyName}</div>
                                    <div className="change no-change">不可操作</div>
                                    <div className="text">提交审核后不可修改。</div>
                                </li>
                                <li>
                                    <div>企业执照编号</div>
                                    <div className="info">{information.companyCode}</div>
                                    <div className="change no-change">不可操作</div>
                                    <div className="text">提交审核后不可修改。</div>
                                </li>
                                <li>
                                    <div>法定代表人</div>
                                    <div className="info">{information.legalPerson}</div>
                                    <div className="change no-change">不可操作</div>
                                    <div className="text">提交审核后不可修改。</div>
                                </li>
                                <li>
                                    <div>法人身份证号</div>
                                    <div className="info">{information.legalPersonCard}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                                <li>
                                    <div>法人手机号</div>
                                    <div className="info">{information.legalPersonPhone}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                                <li>
                                    <div>企业类型</div>
                                    <div className="info">{information.companyType}</div>
                                    <div className="change no-change">不可操作</div>
                                    <div className="text">不可修改。</div>
                                </li>
                                <li>
                                    <div>企业位置</div>
                                    <div className="info">{information.businessAddr}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                                <li>
                                    <div>详细地址</div>
                                    <div className="info">{information.businessAddr}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                                <li>
                                    <div>企业银行账户</div>
                                    <div className="info">{information.busineBankNo}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                                <li>
                                    <div>企业银行账号</div>
                                    <div className="info">{information.businessBankCode}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                                <li>
                                    <div>企业银行开户行</div>
                                    <div className="info">{information.busineOpenBank}</div>
                                    <div className="change">设置</div>
                                    <div className="text">提交后不可修改。</div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="联系人信息" bordered={false} style={{ marginTop: 20}}>
                            <ul className="my-account">
                                <li>
                                    <div>管理员</div>
                                    <div className="info no-change">{information.adminPhone}</div>
                                    <div className="change">修改</div>
                                    <div className="text">支持企业可以更换管理员。</div>
                                </li>
                                <li>
                                    <div>管理员姓名</div>
                                    <div className="info no-change">{information.adminName}</div>
                                    <div className="change"></div>
                                    <div className="text">系统流程自动完成，不支持用户修改</div>
                                </li>
                                <li>
                                    <div>管理员账户</div>
                                    <div className="info no-change">{information.adminCode}</div>
                                    <div className="change"></div>
                                    <div className="text">系统根据您的项目数据自动完成。</div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Card>
            </div>
        )
    }



}

export default EnterpriseInfo;