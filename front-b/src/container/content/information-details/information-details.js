import React, { Component } from 'react';
import { Card, Avatar, Popover } from 'antd';
import { connect } from 'react-redux';
import Panel from '../../../components/panel/panel';
import { initUserInfo, updateInformation, updateInfoStatus } from './store/action';
import Dailog from '../../../components/dailog/dailog'

import '../information-details/information-details.less';

@connect(
    state => ({
        infoManagementReducer: state.infoManagementReducer
    }),
    { initUserInfo, updateInformation, updateInfoStatus }
)
class InformationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '修改',
            type: '',
            defaultVal: ''
        }
    }
    componentDidMount() {
        this.props.initUserInfo();
    }
    
    componentDidUpdate(prevProps) {
        const { updateInfo } = this.props.infoManagementReducer;
        /**
         * 判断删除任务，成功时，更改isPlanDelete状态，并且刷新界面
         */
        if(updateInfo === true) {
            this.props.updateInfoStatus(false);
            this.props.initUserInfo();
        }
    }
    render() {
        const panelData = { pathname: '账户 / 基本资料 / 资料管理', title: '资料管理', desc: '亲们，您可以轻松的维护您的资料信息。',isBack:true }
        const { infoList } = this.props.infoManagementReducer;
        const { visible, title, type, defaultVal } = this.state;
        const address = [infoList&&infoList['userAddrProvinceId'],infoList&&infoList['userAddrCityId'],infoList&&infoList['userAddrAreaId'],infoList&&infoList['userAddr']];
        let certificateUrls = [];
        if (Array.isArray(infoList.certificateUrls)) {
            infoList.certificateUrls.map((item, i) => {
                certificateUrls.push({url: item})
                return i
            })
        }
        return (
            <div>
                <Panel panelData={panelData}></Panel>
                <Card bordered={false} style={{ margin: 24 }}>
                    <div className="account-cont">
                        <Card title="权限信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>用户组</div>
                                    <div>{infoList.groupName}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="账户基本信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>用户账号</div>
                                    <div>{infoList.userCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>创建时间</div>
                                    <div>{infoList.createtime}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>用户昵称</div>
                                    <div>{infoList.userNikeName}</div>
                                    <div className="change"><span onClick={() => this.showModal('用户昵称', 'userNikeName', infoList.userNikeName)}>修改</span></div>
                                </li>
                                <li>
                                    <div>工卡卡号</div>
                                    <div>{infoList.rfid}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证实名</div>
                                    <div>{infoList.userName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>身份证号</div>
                                    <div>{infoList.userCard}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>手机号码</div>
                                    <div>{infoList.userPhone}</div>
                                    <div className="change"><span onClick={() => this.showModal('手机号码', 'userPhone', infoList.userPhone)}>修改</span></div>
                                </li>
                                <li>
                                    <div>认证自拍照</div>
                                    <div>
                                        {
                                            infoList.userHeadPortrait 
                                            ? <Popover content={<Avatar shape="square" size={200} src={infoList.userHeadPortrait} />} title=""><Avatar shape="square" size={47} icon="user" src={infoList.userHeadPortrait} /></Popover>
                                            : null
                                        }
                                        
                                    </div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>家庭地址</div>
                                    <div>{infoList.userAddrProvince}省{infoList.userAddrCity}市{infoList.userAddrArea}区{infoList.userAddr}</div>
                                    <div className="change"><span onClick={() => this.showModal('家庭地址', 'userAddress', address)}>修改</span></div>
                                </li>
                                <li>
                                    <div>银行账户</div>
                                    <div>{infoList.BankCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行卡号</div>
                                    <div>{infoList.bankNo}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>银行开户行</div>
                                    <div>{infoList.openBank}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="账户高级信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>岗位或工种</div>
                                    <div>{infoList.userWorkType}</div>
                                    <div className="change"><span onClick={() => this.showModal('岗位或工种', 'userWorkType', infoList.userWorkType)}>修改</span></div>
                                </li>
                                <li>
                                    <div>最高学历</div>
                                    <div>{infoList.education}</div>
                                    <div className="change"><span onClick={() => this.showModal('最高学历', 'education', infoList.education)}>修改</span></div>
                                </li>
                                <li>
                                    <div>毕业学校</div>
                                    <div>{infoList.graduateSchool}</div>
                                    <div className="change"><span onClick={() => this.showModal('毕业学校', 'graduateSchool', infoList.graduateSchool)}>修改</span></div>
                                </li>
                                <li>
                                    <div>毕业时间</div>
                                    <div>{infoList.graduateTime}</div>
                                    <div className="change"><span onClick={() => this.showModal('毕业时间', 'graduateTime', infoList.graduateTime)}>修改</span></div>
                                </li>
                                <li>
                                    <div>所学专业</div>
                                    <div>{infoList.major}</div>
                                    <div className="change"><span onClick={() => this.showModal('所学专业', 'major', infoList.major)}>修改</span></div>
                                </li>
                                <li>
                                    <div>相关证书</div>
                                    <div>
                                        {
                                            infoList && Array.isArray(infoList.certificateUrls) 
                                            ? infoList.certificateUrls.map( (item, i) => {
                                                return(
                                                    <Popover content={<Avatar shape="square" size={200} src={item}/>} title="" key={i}>
                                                        <Avatar shape="square" size={47} src={item} />
                                                    </Popover>    
                                                )
                                            })
                                            : null
                                        }
                                    </div>
                                    <div className="change"><span onClick={() => this.showModal('相关证书', 'certificateUrls', certificateUrls)}>修改</span></div>
                                </li>
                                <li>
                                    <div>技能等级</div>
                                    <div>{infoList.workLife}</div>
                                    <div className="change"></div>
                                </li>                               
                                <li>
                                    <div>紧急联系人</div>
                                    <div>{infoList.emergencyContactName}</div>
                                    <div className="change"><span onClick={() => this.showModal('紧急联系人', 'emergencyContactName', infoList.emergencyContactName)}>修改</span></div>
                                </li>
                                <li>
                                    <div>紧急联系人手机号</div>
                                    <div>{infoList.emergencyContactPhone}</div>
                                    <div className="change"><span onClick={() => this.showModal('紧急联系人手机号', 'emergencyContactPhone', infoList.emergencyContactPhone)}>修改</span></div>
                                </li>
                                <li>
                                    <div>紧急联系人关系</div>
                                    <div>{infoList.emergencyContactRelation}</div>
                                    <div className="change"><span onClick={() => this.showModal('紧急联系人关系', 'emergencyContactRelation', infoList.emergencyContactRelation)}>修改</span></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="账户录入信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>录入人</div>
                                    <div>{infoList.inputPersonName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>录入人手机号</div>
                                    <div>{infoList.inputPersonPhone}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="班组信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>年产值</div>
                                    <div>{infoList.teamOutPutValue}</div>
                                    <div className="change"><span onClick={() => this.showModal('年产值', 'teamOutPutValue', infoList.teamOutPutValue)}>修改</span></div>
                                </li>
                                <li>
                                    <div>专项分包年限</div>
                                    <div>{infoList.subNumYears}</div>
                                    <div className="change"><span onClick={() => this.showModal('专项分包年限', 'subNumYears', infoList.subNumYears)}>修改</span></div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="商务信息" bordered={false}>
                            <ul className="my-account">
                                <li>
                                    <div>商务类型</div>
                                    <div>{infoList.companyTypeName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证主体</div>
                                    <div>{infoList.companyName}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>主体代码</div>
                                    <div>{infoList.companyCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证法人</div>
                                    <div>{infoList.legalPerson}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>预留手机号</div>
                                    <div>{infoList.legalPersonPhone}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业银行账户</div>
                                    <div>{infoList.businessBankCode}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业银行（工资）卡号</div>
                                    <div>{infoList.busineBankNo}</div>
                                    <div className="change"></div>
                                </li>                               
                                <li>
                                    <div>企业银行开户行</div>
                                    <div>{infoList.busineOpenBank}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业注册资本</div>
                                    <div>{infoList.registerMoney}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>企业经营范围</div>
                                    <div>{infoList.scopeOperation}</div>
                                    <div className="change"></div>
                                </li>
                                <li>
                                    <div>认证有效期</div>
                                    <div>{infoList.examineTime} - {infoList.endTime}</div>
                                    <div className="change"></div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Card>
                <Dailog 
                visible = {visible} 
                title = {title}  
                type = {type}
                defaultVal = {defaultVal}
                handleShow = {this.handleShow}
                handleUpdate = {this.handleUpdate}
                // removeFileImg = {this.removeFileImg}
                />
            </div>
        )
    }
    showModal = (value, type, defaultVal) => {
        this.setState({
            visible: true,
            title: value,
            type: type,
            defaultVal: defaultVal
        });
    }
    handleShow = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    // 删除已上传图片
    // removeFileImg =  () => {
    //     this.props.initUserInfo();
    // }
    // 修改账户信息
    handleUpdate = (datas) => {
        const { infoList } = this.props.infoManagementReducer;
        let params = {}
        if (datas) {
            const keys = Object.getOwnPropertyNames(datas);
            switch(keys[0]) {
                case 'userNikeName':
                    params.userNikeName = datas.userNikeName;
                    break;
                case 'userPhone':
                    params.userPhone = infoList.userPhone;
                    params.newUserPhone = datas.userPhone;
                    params.msgCode = datas.phoneCode;
                    break;
                case 'userAddress':
                    params.userAddrProvince = datas.userAddress[0];
                    params.userAddrCity = datas.userAddress[1];
                    params.userAddrArea = datas.userAddress[2];
                    params.userAddr = datas.userAddr;
                    break;
                case 'education':
                    params.education = datas.education;
                    break;
                case 'graduateSchool':
                    params.graduateSchool = datas.graduateSchool;
                    break;
                case 'graduateTime':
                    params.graduateTime = datas.graduateTime;
                    break;
                case 'major':
                    params.major = datas.major;
                    break;
                case 'certificateUrls':
                    params.certificateUrls = datas.certificateUrls;
                    break;
                case 'userWorkType':
                    params.userWorkType = datas.userWorkType;
                    break;
                case 'workLife':
                    params.workLife = datas.workLife;
                    break;
                case 'emergencyContactName':
                    params.emergencyContactName = datas.emergencyContactName;
                    break;
                case 'emergencyContactPhone':
                    params.emergencyContactPhone = datas.emergencyContactPhone;
                    break;
                case 'emergencyContactRelation':
                    params.emergencyContactRelation = datas.emergencyContactRelation;
                    break;
                case 'teamOutPutValue':
                    params.teamId = infoList.teamId;
                    params.teamOutPutValue = datas.teamOutPutValue;
                    break;
                case 'subNumYears':
                    params.teamId = infoList.teamId;
                    params.subNumYears = datas.subNumYears;
                    break;
                default:
                    break;
            }
        }
        
        console.log(params)
        this.props.updateInformation(params);
    }

}

export default InformationDetails;