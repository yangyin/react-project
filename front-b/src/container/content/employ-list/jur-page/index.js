import React from 'react';
import { connect } from 'react-redux';
import { Card,Tabs } from 'antd';

import Panel from '../../../../components/panel/panel';
import CurrencyPage from './view/currencyPage';
import CustomPage from './view/customPage';

import {
    
} from './../store/action';


const TabPane = Tabs.TabPane;


@connect(
    state => ({
        topbar:state.topbar
    }),
    {  }
)
class EmployJurPage extends React.PureComponent {
    constructor(props) {
        super(props);
        const { params } = this.props.match;
        const param = params['id'].split(',');
        this.urlParams = {
            userId:param[0],
            deptName:decodeURIComponent(param[1]),
            userName:decodeURIComponent(param[2])
        }
        this.panelData = {
            title: `${this.urlParams.deptName}-${this.urlParams.userName}-权限管理`,
            isBack:true
        }
        this.state = {
            isShow:'1'
        }
    }

    componentDidMount() {
        // this.props.getEmployCommonJurList({type:1,userId:this.urlParams.userId});
    }

    handleTabChange = (key) => {
        console.log(key)
        this.setState({
            isShow:key
        })
    }


    render() {
        const{ isShow } = this.state;
        return (
            <div>
                <Panel panelData={this.panelData} />
                <Card style={{margin:24}}>
                    <Tabs type="card" onChange={this.handleTabChange}>
                        <TabPane tab="项目通用权限" key="1">
                            {isShow === '1' ?<CurrencyPage  userId={this.urlParams.userId} />:null }
                        </TabPane>
                        <TabPane tab="项目自定义权限" key="2">
                            {isShow === '2' ? <CustomPage  userId={this.urlParams.userId} />:null }
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}


export default EmployJurPage;