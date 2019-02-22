import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Select, Input, Card, Form } from 'antd';

import './saas.less';
import Panel from '@/components/panel/panel';
import { jobCardAction, jurisdictionStatus } from './store/actions';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';

const Option = Select.Option;
const FormItem = Form.Item;
const columns = [{
    title: '工卡卡号',
    dataIndex: 'cardNumber',
    key: 'cardNumber',
}, {
    title: '状态',
    key: 'cardState',
    dataIndex: 'cardState',
    render: (text) => {
        let status = '';
        if (text === 1) {
            status = '已绑定';
        } else if (text === 0){
            status = '未绑定';
        }
        return (
            <span>
                <p>{status}</p>
            </span>
        );
    }
}];

@connect(
    state => ({
        saas: state.get('saas')
    }),
    { jobCardAction, jurisdictionStatus }
)
@Form.create()
class JobCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.params = {
            pageNum: 1,
            pageSize: 10,
            cardNumber: '',
            cardState: ''
        };   
    }

    render() {
        const panelData = {
            title: '工卡管理',
        };
        const isJurisdiction = this.props.saas.get('isJurisdiction');
        const jobCardList = this.props.saas.get('jobCardList') || {};
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{height:70}}>
                            <FormItem
                                label="工卡卡号"
                            >
                                {getFieldDecorator('cardNumber', {
                                    rules: [{
                                        validator: Utils.isNumber, message: '请输入数字',
                                    }],
                                })(
                                    <Input style={{width: '280px'}} autoComplete="off" placeholder="请输入工卡卡号" />
                                )}
                            </FormItem>
                            <FormItem
                                label="工卡状态"
                            >
                                {getFieldDecorator('cardState')(
                                    <Select
                                        placeholder="请选择工卡状态"
                                        onChange={this.handleEquipmentStuChange}
                                        style={{width: '280px'}}
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="0">未绑定</Option>
                                        <Option value="1">已绑定</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit">查询</Button>
                            </FormItem>
                        </Form>
                        <Table 
                            columns={columns} 
                            dataSource={jobCardList.rows} 
                            rowKey="cardId"
                            locale={{emptyText: '暂无数据'}}
                            pagination={
                                Utils.pagination({...jobCardList, pageNum: this.params.pageNum },(current) =>{
                                    this.params.pageNum =current;
                                    this.props.jobCardAction(this.params);
                                })
                            }
                        />
                    </Card>
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取注册硬件列表
        this.props.jobCardAction(this.params);
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    // 设备状态切换
    handleEquipmentStuChange = (value) => {
        this.params.cardState = value;
    }
    // 硬件设备搜索查询
    handleSubmit = (e) => {
        e.preventDefault();
        this.params.pageNum = 1;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const params = {
                    ...this.params,
                    ...value
                };
                // 获取工卡列表
                this.props.jobCardAction(params);
            }
        });



    }
}


export default JobCard;


