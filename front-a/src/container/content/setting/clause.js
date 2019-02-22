import React , { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Collapse, Input, Row, Col } from 'antd';

import './setting.less';
import PanelTop from '@/components/panel/panel';
import { Unauthorized } from '@/container/error-page/not-found-page';
import { settingClauseAction, editClauseAction, editClause, jurisdictionStatus } from './store/actions';

const Panel = Collapse.Panel;
const { TextArea } = Input;

@connect(
    state => ({
        setting: state.get('setting')
    }),
    { settingClauseAction, editClauseAction, editClause, jurisdictionStatus }
)
class Clause extends React.PureComponent {
    static getDerivedStateFromProps (nextProps, prevState) {
        const nextClause = nextProps.setting.get('settingClause') || [];
        const updateClause = nextProps.setting.get('updateClause');
        if(Object.keys(prevState).length === 0) {
            let status = {};
            nextClause.map((item, index) => {
                status['status'+index] = true
            })
            return status;
        }
        // 判断编辑成功后置回false
        if(updateClause) {
            nextProps.editClause({ status: false });
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.state = {

        }
        this.params = {
            clauseContent: '',
            id: '',
            clauseType: ''
        }

    }
    render() {
        const panelData = {
            title: '条款管理',
        };
        const settingClause = this.props.setting.get('settingClause') || [];
        const isJurisdiction = this.props.setting.get('isJurisdiction');
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <PanelTop panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                    <Collapse onChange={this.callback} accordion defaultActiveKey={['0']}>
                        {
                            settingClause.map((item, index) => {
                                let title = '用户注册条款';
                                if (index === '1') {
                                    title = '商务认证条款';
                                } else if (index === '2'){
                                    title = '机构认证条款';
                                }
                                return(
                                    <Panel header={
                                        <Row>
                                            <Col span={23}>{title}</Col>
                                            <Col span={1} 
                                                onClick={this.handleEdit} 
                                                data-id={item.id}
                                                data-type={item.clauseType}
                                                data-index={index}
                                                style={{textAlign: 'center', color: '#1890ff'}}
                                            >{this.state['status'+index] ? '编辑' : '保存'}</Col>
                                        </Row>
                                    } 
                                    key={index}>
                                        <TextArea 
                                            disabled={this.state['status'+index]}
                                            autosize={{ minRows: 5, maxRows: 20 }} 
                                            defaultValue={item.clauseContent} 
                                            style={{ color: '#333'}}
                                            data-index={index}
                                            onChange={this.handleTextarea}
                                        />
                                    </Panel>
                                )
                            })                            
                        }
                    </Collapse>
                </Card>
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取条款管理列表
        this.props.settingClauseAction(this.params);
    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
    }
    // 编辑
    handleEdit = (e) => {
        e.stopPropagation();
        const { id, index } = e.currentTarget.dataset;
        const obj = {
            ['status'+index]: !this.state['status'+index]
        }
        this.setState({
            ...obj
        })
        const areaVal = this.state['area' + index];
        // 保存编辑
        if (areaVal) {
            this.props.editClauseAction({
                id,
                clauseContent: areaVal
            })
        }
    }
    // 文本域发生改变事件
    handleTextarea = (e) => {
        const { index } = e.currentTarget.dataset;
        const areaVal = {
            ['area' + index]: e.currentTarget.value
        }
        this.setState({
            ...areaVal
        })
    }
}


export default Clause;


