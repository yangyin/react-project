import React, { Component } from 'react';
import { Card, Row, Col, Form, Input, Button, Cascader } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { oldAddressSelector } from '../../../reselect/address';
import { getPersonInfo, updateUserInfo,jurisdictionStatus } from './store/action';
import { getOldRegion } from '../../../redux/address/action';
import Panel from '../../../components/panel/panel';

import { Unauthorized } from './../../error-page/not-found-page';
import '../dept-list/dept-list.less';
import './basic-data.less';

const FormItem = Form.Item;
// const Option = Select.Option;

@connect(
    state => ({
        basicDataReducer: state.basicDataReducer,
        address: oldAddressSelector(state.address)
    }),
    { getPersonInfo, getOldRegion, updateUserInfo,jurisdictionStatus }
)
@Form.create()
class BasicData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address
        };
    }
    componentDidMount() {
        this.props.getPersonInfo();
        this.props.getOldRegion({ type: 1, id: 1 });
    }
    componentDidUpdate(prevProps) {
        // console.log('prev***',prevProps.basicDataReducer.personinfo)
        // console.log('***',this.props.basicDataReducer.personinfo !== prevProps.basicDataReducer.personinfo)
        const prevData = prevProps.basicDataReducer.personinfo;
        const { personinfo } = this.props.basicDataReducer;
        if( (prevData !== personinfo) && personinfo) {
            personinfo['userAddrProvinceId'] && setTimeout( _=> {this.props.getOldRegion( {type:2,id:personinfo['userAddrProvinceId']} )},50);
            personinfo['userAddrCityId'] && setTimeout( _=> {this.props.getOldRegion( {type:3,id:personinfo['userAddrCityId']} )},80);
        }
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    loadData = (selectedOptions) => {
        console.log(selectedOptions)
        const targetOption = selectedOptions[selectedOptions.length - 1];
        this.props.getOldRegion({ type: targetOption['key'], id: targetOption['regionValue'] });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let value = this.props.form.getFieldsValue();
                let obj = { ...value, userAddrProvince: value['addr'][0], userAddrCity: value['addr'][1], userAddrArea: value['addr'][2] };
                delete obj.addr;
                this.props.updateUserInfo(obj);
            }
        });
    }

    render() {
        // console.log('******',this.props)
        const panelData = { pathname: '系统 / 基本资料', title: '基本资料', desc: '基本资料，是您当前开通商务的基本信息。' }
        const { personinfo } = this.props.basicDataReducer;
        const { getFieldDecorator } = this.props.form;
        const { address } = this.props;
        const { isJurisdiction } = this.props.basicDataReducer;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <div className="basic-cont">
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData} />
                        <Card title="基本信息" extra={<Link to="/sdpbusiness/account/informationDetails">查看详情</Link>} bordered={false} style={{ margin: 24 }}>
                            <div className="basic-info">
                                <Row>
                                    <Col span={4}>基本信息</Col>
                                    <Col span={20}>代理人</Col>
                                </Row>
                                <Row>
                                    <Col span={4}>真实姓名</Col>
                                    <Col span={20}>{personinfo && personinfo['userName']}</Col>
                                </Row>
                            </div>
                        </Card>
                        <div className="basic-data">
                            <Card title="联系信息" bordered={false} style={{ margin: 24 }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="所在地区"
                                    >
                                        {getFieldDecorator('addr', {
                                            initialValue: [personinfo && personinfo['userAddrProvinceId'], personinfo && personinfo['userAddrCityId'], personinfo && personinfo['userAddrAreaId']],
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
                                    <FormItem
                                        {...formItemLayout}
                                        label="街道地址"
                                    >
                                        {getFieldDecorator('userAddr', {
                                            initialValue: personinfo && personinfo.userAddr,
                                            rules: [{
                                                required: true, message: '街道地址不能为空！',
                                            }],
                                        })(
                                            <Input type="text" placeholder="请输入街道地址" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="联系电话"
                                    >
                                        {getFieldDecorator('userPhone', {
                                            initialValue: personinfo && personinfo.userPhone,
                                            rules: [{
                                                required: true, message: '联系电话不能为空！',
                                            }],
                                        })(
                                            <Input type="text" placeholder="请输入联系电话" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label=" "
                                    > 
                                        <Button type="primary" htmlType="submit">保存</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </React.Fragment>
                    : <Unauthorized />
                }


            </div>
        )
    }
}

export default BasicData;