import React, { PureComponent } from 'react';
import { Card, Avatar, Popover } from 'antd';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';

import './team.less';
import Utils from '@/utils/utils';
import { teamDetailAction } from './store/actions.js';




@connect(
    state => ({
        team: state.get('team'),
    }),
    { teamDetailAction }
)
class UserDetail extends PureComponent {
    constructor(props) {
        super(props);
        const searchLink = this.props.location.search;
        const {userId,teamId}= Utils.linkParamsToObj(searchLink);
        this.params = {
            userId:userId,
            teamId:teamId
        }
    }

    componentDidMount () {
        // 班组详情
        this.props.teamDetailAction(this.params)
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
            title: '班组管理详情',
            isBack: true
        };
        const userInfo = this.props.team.get('teamDetail')||{};
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
                                            ? <Popover content={<Avatar  size={200} src={userInfo.userHeadPortrait} />} title=""><Avatar size={47} icon="user" src={userInfo.userHeadPortrait} /></Popover>
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
                        {/* 班组信息 */}
                        <Card title="班组信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>年产值</div>
                                    <div>{userInfo.teamOutPutValue}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>专项分包年限</div>
                                    <div>{userInfo.subNumYears}</div>
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


export default UserDetail;






