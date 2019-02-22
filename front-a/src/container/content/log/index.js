import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table,Card,Button,DatePicker,Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';


import Utils from './../../../utils/utils';



import PanelComp from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';
import { getLogAction ,getLogTypeAction} from './store/actions';

moment.locale('zh-cn');

const panelData = {
    title: '平台日志',
};
const {  RangePicker } = DatePicker;
const Option = Select.Option;

const columns = [
    {title: '时间', dataIndex: 'createTime'},
    {title: '操作人', dataIndex: 'userName'},
    {title: '类别', dataIndex: 'systemSource'},
    {title: '日志内容', dataIndex: 'functionName'},
];
const styleTabel = {
    background:'#fff',
    margin:24
}

@connect(
    state=>({
        logger:state.get('logger')
    }),
    { getLogAction,getLogTypeAction}
)
class Logger extends PureComponent {
    state = { 
        rangValue:[]
     }
    params = {
        pageNum:1,
        type:0,//0 代表最近30天 1代表选择时间段
        startTime:'',
        endTime:'',
        param:'',//类别ID
        queryStr:''
    }
    componentDidMount() {
        this.props.getLogTypeAction();
        this.props.getLogAction(this.params);
    }
    //最近30天
    onLastClick=(e) =>{
        this.params.pageNum =1;
        this.params.startTime = '';
        this.params.endTime = '';
        this.params.type = 0;
        this.setState({
            rangValue:[]
        })
    }
    //日期
    onPickerChange = (date, dateString) => {
        this.params.startTime = dateString[0];
        this.params.endTime = dateString[1];
        this.params.type = 1;
        this.params.pageNum =1;
        this.setState({
            rangValue:date
        })
    }
    //类型改变
    onSelectChange = (value) => {
        this.params.param = value;
        this.params.pageNum =1;
    }

    //筛选
    search = () => {
        this.props.getLogAction(this.params);

    }
    render() { 
        const { param} = this.params;
        const { rangValue } = this.state;
        const data = this.props.logger.get('logList').toJS();
        const isJur = this.props.logger.get('isJur');
        const typeList = this.props.logger.get('typeList');
        return (
            <React.Fragment>
            {
                !isJur ?<div>
                    <PanelComp panelData={panelData} />
                    <Card style={{margin:24}}>
                        <Button type="primary" onClick={this.onLastClick}>最近30天</Button>
                        <RangePicker size="default" value={rangValue}  onChange={this.onPickerChange} style={{margin:'0 10px'}} />
                        <Select defaultValue={param} style={{ width: 200 }} onChange={this.onSelectChange}>
                            <Option value="">请选择日志类别</Option>
                            {
                                typeList.map(v =>  <Option key={v.get('categoryId')} value={v.get('categoryId')}>{v.get('categoryValue')}</Option>)
                            }
                        </Select>
                        <Button style={{marginLeft:10}} onClick={this.search}>筛选</Button>
                    </Card>
                    <Table 
                        style={styleTabel}
                        rowKey="id"
                        columns={columns}
                        dataSource={data.rows}
                        pagination={Utils.pagination({pageNum:this.params.pageNum,total:data.totals},(num) => {
                            this.params.pageNum = num;
                            this.props.getLogAction();
                        })}
                    />
                </div> : <Unauthorized />
            }
            </React.Fragment> 
         );
    }
}
 
export default Logger;