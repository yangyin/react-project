import React, { PureComponent } from 'react';
import { Card, Avatar, Popover } from 'antd';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';

import './organization.less';
import { userDetailInfoAction } from './store/actions.js';

@connect(
    state => ({
        organization: state.get('organization'),
    }),
    { userDetailInfoAction }
)
class CompanyDetail extends PureComponent {
    constructor(props) {
        super(props);

        this.params = {
            orgId: this.props.match.params.id
        }
    }

    componentDidMount () {
        // 详情
        const { orgId } = this.params;
        this.props.userDetailInfoAction({ orgId })
    }
    componentWillReceiveProps (nextProps) {
        
    }
    // 处理空字符显示‘--’
    renderString = (data) => {
        for (let i in data) {
            if (!data[i] && i != 'userHeadPortrait' && i != 'certificateUrls') {
                data[i] = '--';
            }
        }
    }

    render () {
        const panelData = {
            title: '行政部门详情',
            isBack: true
        };
        const orgInfo = this.props.organization.get('orgInfo');
        this.renderString(orgInfo);

        return (
            <div className="org">
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <div className="account-cont">

                        <Card title="基本信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>用户账号</div>
                                    <div>{orgInfo.userCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>创建时间</div>
                                    <div>{orgInfo.createTime}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>用户昵称</div>
                                    <div>{orgInfo.userNikeName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>工卡卡号</div>
                                    <div>{orgInfo.rfid}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证实名</div>
                                    <div>{orgInfo.userName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>身份证号</div>
                                    <div>{orgInfo.userCard}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>手机号码</div>
                                    <div>{orgInfo.userPhone}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证自拍照</div>
                                    <div>
                                        {orgInfo.userHeadPortrait
                                            ? <Popover content={<Avatar size={200} src={orgInfo.userHeadPortrait} />} title="认证自拍照"><Avatar size={47} icon="user" src={orgInfo.userHeadPortrait} /></Popover>
                                            : null}
                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>家庭住址</div>
                                    <div>{orgInfo.userAddrProvince}{orgInfo.userAddrCity}{orgInfo.userAddrArea}{orgInfo.userAddr}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行账户</div>
                                    <div>{orgInfo.BankCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行（工资）卡号</div>
                                    <div>{orgInfo.bankNo}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行开户行</div>
                                    <div>{orgInfo.openBank}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="单位信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>单位账号</div>
                                    <div>{orgInfo.orgAccount}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>信用等级</div>
                                    <div>{orgInfo.orgAccount}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>单位名称</div>
                                    <div>{orgInfo.orgName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>单位企业统一代码</div>
                                    <div>{orgInfo.orgCode}
                                        {orgInfo.orgUrl
                                            ? <Popover content={<Avatar shape="square" size={200} src={orgInfo.orgUrl} />} title=""><Avatar shape="square" style={{marginLeft:20}} size={47} icon="user" src={orgInfo.orgUrl} /></Popover>
                                            : null}
                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>法定代表人</div>
                                    <div>{orgInfo.orgLegalPerson}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>单位负责人</div>
                                    <div>{orgInfo.agName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>负责人证件号</div>
                                    <div>{orgInfo.adminCard}
                                        {orgInfo.adminCardUrl
                                            ? <Popover content={<Avatar  shape="square" size={200} src={orgInfo.adminCardUrl} />} title=""><Avatar style={{marginLeft:20}} shape="square" size={47} icon="user" src={orgInfo.adminCardUrl} /></Popover>
                                            : null}
                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>负责人手机号</div>
                                    <div>{orgInfo.adminPhone}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>单位类型</div>
                                    <div>{orgInfo.orgType}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>办公地址</div>
                                    <div>{orgInfo.orgAddr}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>行政区域</div>
                                    <div>{orgInfo.orgProvince}{orgInfo.orgCity}{orgInfo.orgArea}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Card>
            </div>
        );
    }
}


export default CompanyDetail;






