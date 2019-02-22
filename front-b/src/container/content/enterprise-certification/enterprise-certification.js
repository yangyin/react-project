import React, { Component } from 'react';
import { Card, Button, Row, Col, Icon, Modal, Form, Input, Select, Cascader } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCompanyAuth, selectCompanyType, submitAuthInfo, jurisdictionStatus, authInfoStatus } from './store/action';
import Panel from '../../../components/panel/panel';
import UploadComp from '../../../components/upload';
import { Unauthorized } from './../../error-page/not-found-page';
import Utils from './../../../utils/utils';

import { getOldRegion } from '../../../redux/address/action';
import { oldAddressSelector } from '../../../reselect/address';

import '../real-name/real-name.less';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(
    state => ({
        companyAuth: state.companyAuthReducer,
        address: oldAddressSelector(state.address)
    }),
    { getCompanyAuth, selectCompanyType, submitAuthInfo, jurisdictionStatus, authInfoStatus, getOldRegion }
)
@Form.create()
class EnterpriseCertification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authModalVisible: false,
            pictures: []
        }
    }

    componentDidMount() {
        this.props.getCompanyAuth();
        this.props.selectCompanyType();
        this.props.getOldRegion({ type: 1, id: 1 });
    }

    componentWillReceiveProps(nextProps) {
        const { isCompanyAuth } = nextProps;
        if (isCompanyAuth) {
            this.props.authInfoStatus(false);
            this.props.getCompanyAuth();
        }
    }

    // 上传成功回调
    uploadSuccess = data => {

        this.setState((prevState) => ({
            pictures: [...prevState.pictures, ...data]
        }))
    };

    showAuthModal = () => {

        this.setState({
            authModalVisible: true
        })
    }

    handleCancel = () => {
        this.setState({
            authModalVisible: false
        })
    }

    handleOk = (e) => {
        this.handleSubmit();
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        const companyType = this.props.form.getFieldValue('companyType');

        if (companyType === 'QSjnnNzSgk2MnoemiQ4') {//选择的行政单位

            this.props.form.validateFields(['name', 'addr'], (err, values) => {
                
                if (!err) {
                    // const { pictures } = this.state;
                    // const plen = pictures.length;
                    const opts = {
                        companyType,
                        companyName: values.name,
                        orgProvince: values.addr[0],
                        orgCity: values.addr[1],
                        orgArea: values.addr[2]
                    }
                    
                    this.props.submitAuthInfo(opts);
                    this.setState({
                        authModalVisible: false,
                    });
                }
            });

        } else { //非行政单位
            this.props.form.validateFields(['companyType','companyName','companyCode','legalPerson'],(err, values) => {
                
                if (!err) {
                    
                    const { pictures } = this.state;
                    const plen = pictures.length;
                    const opts = {
                        // businessId: this.props.companyinfo.businessId,
                        companyType,
                        companyName: values.companyName,
                        companyCode: values.companyCode,
                        legalPerson: values.legalPerson,
                        companyType: values.companyType,
                        companyUrl: plen === 1 ? pictures[0].url : ''
                    }
                    this.props.submitAuthInfo(opts);
                    this.setState({
                        authModalVisible: false,
                    });
                }
            });
        }






    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { getFieldDecorator } = this.props.form;

        const panelData = { pathname: '账户 / 企业认证', title: '企业认证', desc: '企业认证，是给当前账户提供企业服务的必要条件，包含企业和机构业务。' }

        const { authModalVisible, pictures } = this.state;

        const { companyAuth, address } = this.props;
        const { companyinfo, companytype, isJurisdiction } = companyAuth;

        const companyType = this.props.form.getFieldValue('companyType');

        return (
            <div>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card
                            bordered={false}
                            style={{ margin: 24 }}
                            className={companyinfo && companyinfo.isAuth !== '1' ? '' : 'hide'}
                        >
                            <Row gutter={24}>
                                <Col span={20}>
                                    <div className="name-text">
                                        <Icon type="schedule" theme="outlined" style={{ fontSize: 30, color: 'red' }} />
                                        请先进行实名认证，在企业认证！
                                    </div>
                                </Col>
                                <Col span={4} style={{ textAlign: 'right' }}>
                                    <Button type="primary"><Link to="/realnameAuthentication">实名认证</Link></Button>
                                </Col>
                            </Row>
                        </Card>
                        <div className={companyinfo && companyinfo.isAuth !== '0' ? '' : 'hide'}>
                            <Card
                                bordered={false}
                                style={{ margin: 24 }}
                            >
                                <Row>
                                    <Col span={20}>
                                        <div className="name-text">
                                            <Icon type="schedule" theme="outlined" style={{ fontSize: 30, color: 'red' }} />
                                            {
                                                companyinfo && companyinfo.companyState === '0' && '请您准备好企业营业执照，进行企业认证。'
                                            }
                                            {
                                                companyinfo && companyinfo.companyState === '1' && '您的资料已提交成功，待审核通过！'
                                            }
                                            {
                                                companyinfo && companyinfo.companyState === '2' && '恭喜您，您认证审核通过，合作愉快！'
                                            }
                                        </div>
                                    </Col>
                                    <Col span={4} style={{ textAlign: 'right' }}
                                        className={companyinfo && companyinfo.companyState === '0' ? '' : 'hide'}
                                    >
                                        <Button type="primary" onClick={this.showAuthModal}>马上企业认证</Button>
                                    </Col>
                                </Row>
                            </Card>
                            <Card bordered={false} style={{ margin: 24 }} className={companyinfo && companyinfo.companyState === '2' ? '' : 'hide'}>
                                <div className="name-title">
                                    <Icon type="check-circle" theme="twoTone" style={{ fontSize: 60, color: 'green' }} />
                                    <span>你已经完成在易工盛行系统企业认证</span>
                                </div>
                                <ul className="name-list">
                                    <li>
                                        <div>认证编号</div>
                                        <div className="name-info">{companyinfo && companyinfo.businessId}</div>
                                    </li>
                                    <li>
                                        <div>企业类别</div>
                                        <div className="name-info">{companyinfo && companyinfo.companyType} </div>
                                    </li>
                                    <li>
                                        <div>企业类型</div>
                                        <div className="name-info">{companyinfo && companyinfo.businessType}</div>
                                    </li>
                                </ul>
                            </Card>
                            <Card bordered={false} style={{ margin: 24, padding: 32 }} className={companyinfo && companyinfo.companyState === '2' ? '' : 'hide'}>
                                <div>您可以使用《易工盛行》系统管理一个项目。先去创建一个项目吧！</div>
                                <Link to="" style={{ marginTop: 25 }} className="ant-btn">马上创建项目</Link>
                            </Card>
                        </div>

                        <Modal title="企业认证"
                            visible={authModalVisible}
                            onCancel={this.handleCancel}
                            width={600}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk}>提交</Button>
                            ]}
                        >
                            <p>温馨提示：请使用您的企业营业执照认证您的企业！</p>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="企业类型"
                                >
                                    {getFieldDecorator('companyType', {
                                        rules: [{ required: true, message: '请选择企业类型', whitespace: true }],
                                    })(
                                        <Select placeholder="请选择企业类型">
                                            {/* <Option value="" key="">请选择企业类型</Option> */}
                                            {
                                                companytype && companytype.map(subOpt => {
                                                    return (
                                                        <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <div style={{ display: `${(typeof companyType !== 'undefined' && companyType !== 'QSjnnNzSgk2MnoemiQ4') ? 'block' : 'none'}` }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="企业名称"
                                    >
                                        {getFieldDecorator('companyName', {
                                            rules: [{ required: true, message: '请输入企业名称', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="统一机构代码"
                                    >
                                        {getFieldDecorator('companyCode', {
                                            rules: [{ required: true, message: '请输入统一机构代码', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="法人姓名"
                                    >
                                        {getFieldDecorator('legalPerson', {
                                            rules: [{ required: true, message: '请输入法人姓名', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="营业执照"
                                    >
                                        <UploadComp
                                            maxlength={1}
                                            uploadSuccess={this.uploadSuccess}
                                            planPic={pictures}
                                        />
                                    </FormItem>
                                </div>
                                <div style={{ display: `${(typeof companyType !== 'undefined' && companyType === 'QSjnnNzSgk2MnoemiQ4') ? 'block' : 'none'}` }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="单位名称"
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [
                                                { required: true, message: '请输入单位名称', whitespace: true },
                                                { validator: Utils.validName}
                                            ],
                                        })(
                                            <Input autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="所在地区"
                                    >
                                        {getFieldDecorator('addr', {
                                            // initialValue: [personinfo && personinfo['userAddrProvinceId'], personinfo && personinfo['userAddrCityId'], personinfo && personinfo['userAddrAreaId']],
                                            rules: [{
                                                required: true, message: '地址不能为空！',
                                            }],
                                        })(
                                            <Cascader
                                                // defaultValue={["76H3y2o6sjHFYV1iFan","iDkcmHRhHleujZ5Eh3v","NKqVPVFkWAw9KidpMdj"]}
                                                fieldNames={{ label: 'regionKey', value: 'regionValue' }}
                                                options={address}
                                                loadData={this.loadData}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                            </Form>
                        </Modal>
                    </React.Fragment>
                    : <Unauthorized />
                }
            </div>
        )
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        this.props.getOldRegion({ type: targetOption['key'], id: targetOption['regionValue'] });
    }


}

export default EnterpriseCertification;