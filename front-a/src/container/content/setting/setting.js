import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Card, Form, Button, Popconfirm } from 'antd';

import './setting.less';
import Panel from '@/components/panel/panel';
import PlatformAdd from './views/add/platform-add';

import { settingAction,platformUpdateAction,platformUpdateState ,settingAdClear, jurisdictionStatus} from './store/actions';
import Utils from '@/utils/utils';
import { Unauthorized } from '@/container/error-page/not-found-page';

const FormItem = Form.Item;
const panelData = { title: '信息设置' };



@connect(
    state => ({
        setting: state.get('setting')
    }),
    { settingAction,platformUpdateAction,platformUpdateState ,settingAdClear, jurisdictionStatus}
)
@Form.create()
class Setting extends PureComponent {

    state = {
        visible: false
    }

    params = {
        pageNum: 1,
        pageSize: 10,
        platformNo:'',//平台编号
        platformName:''//平台名称
    }

    columns = [
        // { title:'序号',dataIndex:'platformNo'},
        { title: '平台编号',dataIndex:'platformNo'},
        { title: '平台名称', dataIndex: 'platformName' },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '广告位功能', dataIndex: 'platformState',render(text) { return parseInt(text) === 0 ? '停用':'启用';} },
        { title: '操作',
            render:(text, record) =>{
                return parseInt(record.platformState) === 0 
                    ? <Popconfirm title="确定启用广告位功能吗？" onConfirm={() => this.handleAction(record)}  okText="确定" cancelText="取消"><a>启用广告位功能</a></Popconfirm>
                    : <Popconfirm title="确定停用广告位功能吗？" onConfirm={() => this.handleAction(record)}  okText="确定" cancelText="取消"><a style={{color:'red'}} >停用广告位功能</a></Popconfirm>;
            } 
        },
    ];
    //停用 or 启用
    handleAction = ({platformNo,platformState}) => {
        let status = parseInt(platformState) === 1 ? 0 : 1;
        this.props.platformUpdateAction({platformNo,platformState:status});
    }

    componentDidMount() {
        this.props.settingAction(this.params);
    }
    componentWillUnmount() {
        this.props.settingAdClear();
        this.props.jurisdictionStatus(false);
    }

    componentWillReceiveProps(nextProps) {
        const nextUpdate = nextProps.setting.get('isUpdate');
        if(nextUpdate) {
            this.props.platformUpdateState({status:false});
            this.props.settingAction(this.params);
            this.state.visible && this.setState({
                visible:false
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { platformNo,platformName } = values;
                this.params.platformName = platformName;
                this.params.platformNo = platformNo;
                this.params.pageNum =1;
                this.props.settingAction(this.params);
            }
        });
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.state;
        const isJurisdiction = this.props.setting.get('isJurisdiction');
        const settingList = this.props.setting.get('settingList').toJS();
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24 }}>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{height:70}}>
                            <FormItem
                                label="平台编号"
                            >
                                {getFieldDecorator('platformNo',{
                                    rules:[
                                        {pattern:/^[1][0-9]{3}$/,message:'仅支持以1开头的4位数字查询'}
                                    ]
                                })(
                                    <Input autoComplete="off" placeholder="请输入平台编号" />
                                )}
                            </FormItem>
                            <FormItem
                                label="平台名称"
                            >
                                {getFieldDecorator('platformName', {
                                    rules:[
                                        { validator: Utils.validSpace, message: '请输入有效名称' },
                                        {
                                            max: 20, message: '最长位20个字符'
                                        }
                                    ]
                                })(
                                    <Input autoComplete="off" placeholder="请输入平台名称"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit">查询</Button>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={this.showDrawer}>添加平台</Button>
                            </FormItem>
                        </Form>
                        <Table 
                            columns={this.columns} 
                            dataSource={settingList.rows || []} 
                            rowKey="platformNo"
                            pagination={
                                Utils.pagination({total:settingList.total, pageNum: this.params.pageNum },(current) =>{
                                    this.params.pageNum =current;
                                    this.props.settingAction(this.params);
                                })
                            }
                        />
                    </Card>
                    <PlatformAdd 
                        visible={visible}
                        close={this.onClose}
                        add={this.add}
                    />
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }
    //新增
    add = (data) => {
        this.props.platformUpdateAction(data);
    }
    //关闭弹窗
    onClose = () => {
        this.setState({
            visible: false,
        });
    }
}


export default Setting;


