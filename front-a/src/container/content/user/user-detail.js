import React, { PureComponent } from 'react';
import { Card, Avatar, Popover } from 'antd';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';

import './user.less';
import { userDetailInfoAction, statusControl,userDetailJoinAction } from './store/actions.js';




@connect(
    state => ({
        user: state.get('user'),
    }),
    { userDetailInfoAction,statusControl, userDetailJoinAction }
)
class UserDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: 1, // 1加入黑名单 2移出黑名单
        }
        this.params = {
            userId: this.props.match.params.id
        }
    }

    componentDidMount () {
       this.request();
    }
    request =()=>{
        // 详情
        const { userId } = this.params;
        this.props.userDetailInfoAction({ userId })
    }
    componentWillReceiveProps (nextProps) {
        const userInfo = this.props.user.get('userInfo');
        const nextUserInfo = nextProps.user.get('userInfo');
        if (userInfo.type != nextUserInfo.type && nextUserInfo.type){
            this.setState({ type: nextUserInfo.type });
        }
        // 操作刷新
        const isRefresh = nextProps.user.get('isRefresh');
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
    // 加入黑名单
    joinBlack = _ => {
        const { type } = this.state;
        const { userId } = this.params;
        const joinParams = {
            userId: userId,
            type: type
        }
        this.props.userDetailJoinAction(joinParams);
    }
    render () {
        const panelData = {
            title: '用户资料',
            isBack: true
        };
        const userInfo = this.props.user.get('userInfo');
        const { type } = this.state;
        this.renderString(userInfo);

        return (
            <div className="user">
                <Panel panelData={panelData} />
                <Card bordered={false} style={{ margin: 24 }}>
                    <div className="account-cont">
                        <Card title="权限信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>用户组</div>
                                    <div>{userInfo.groupName}</div>
                                    <div className="change"><span onClick={this.joinBlack}>{type === 1 ? '加入黑名单' : '移出黑名单'}</span></div>
                                </li>
                            </ul>
                        </Card>
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
                        <Card title="账户高级信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>工种或岗位</div>
                                    <div>{userInfo.userWorkType}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>工作年限</div>
                                    <div>{userInfo.workLife}年</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>最高学历</div>
                                    <div>{userInfo.education}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>毕业学校</div>
                                    <div>{userInfo.graduateSchool}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>毕业时间</div>
                                    <div>{userInfo.graduateTime}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>所学专业</div>
                                    <div>{userInfo.major}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>相关证书</div>
                                    {/* <div>{userInfo.certificateUrls}</div> */}
                                    <div>
                                        {userInfo.certificateUrls
                                            ? <Popover content={<Avatar shape="square" size={200} src={userInfo.certificateUrls} />} title=""><Avatar shape="square" size={47} icon="user" src={userInfo.certificateUrls} /></Popover>
                                            : null}
                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>技能等级</div>
                                    <div>2T</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>紧急联系人</div>
                                    <div>{userInfo.emergencyContactName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>紧急联系人手机号</div>
                                    <div>{userInfo.emergencyContactPhone}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>紧急联系人关系</div>
                                    <div>{userInfo.emergencyContactRelation}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                        {/* 数据录入信息 */}
                        <Card title="账户录入信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>录入人</div>
                                    <div>{userInfo.inputPersonName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>录入人手机号</div>
                                    <div>{userInfo.inputPersonPhone}</div>
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
                        {/* 商务信息 */}
                        <Card title="商务信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>商务类型</div>
                                    <div>{userInfo.companyTypeName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证主体</div>
                                    <div>{userInfo.companyName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>主体代码</div>
                                    <div>{userInfo.companyCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证法人</div>
                                    <div>{userInfo.legalPerson}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>预留手机号</div>
                                    <div>{userInfo.legalPersonPhone}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业银行账户</div>
                                    <div>{userInfo.businessBankCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业银行(工资)卡号</div>
                                    <div>{userInfo.busineBankNo}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业银行开户行</div>
                                    <div>{userInfo.busineOpenBank}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业注册资本</div>
                                    <div>{userInfo.registerMoney}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业经营范围</div>
                                    <div>{userInfo.scopeOperation}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证有效期</div>
                                    <div>{userInfo.examineTime}至{userInfo.endTime}</div>
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






