import React from 'react';
import { connect } from 'react-redux';
import { Popover, Tabs, Icon } from 'antd';

import { unreadMessageRequest,clearMsgData } from './../../content/message/store/actions';

const TabPane = Tabs.TabPane;

@connect(
    state => state.message,
    { unreadMessageRequest,clearMsgData }
)
class MessageComp extends React.Component {

    constructor(props) {
        super(props);
        this.params = {
            pageNum: 1,
            pageSize: 6,
            queryType: 0 //查询参数 0 - 未读 1- 已读
        }
    }

    onVisibleChange = (visible) => {
        visible === true && this.props.unreadMessageRequest(this.params);
    }
    //消息，tabs回调
    tabsCallback=(key) =>{
        this.params.queryType = key;
        this.params.pageNum = 1;
        this.props.clearMsgData(key);
        this.props.unreadMessageRequest(this.params);
    }
    //加载更多
    onHandleMore = (type) =>{
        this.params.queryType = type;
        this.params.pageNum +=1;
        this.props.unreadMessageRequest(this.params);
    }
    content = () => {
        const { unreadList, readList } = this.props;

        return (<Tabs
            className="message-info"
            defaultActiveKey="0"
            tabBarStyle={{width:300}}
            onChange={this.tabsCallback}
        >
            <TabPane tab="未读消息" key={0}>
                { this.msgListRender(unreadList,0) }
            </TabPane>
            <TabPane tab="已读消息" key={1}>
                { this.msgListRender(readList,1) }
            </TabPane>
        </Tabs>)
    };
    msgListRender = (data,type) => (
        data.rows && data.rows.length > 0 ? (
            <React.Fragment>
                {
                    data.rows.map((v, i) =>
                        <div className="item" key={i}>
                            <p>{v.msgContent}</p>
                            <label>{v.createTime}</label>
                        </div>
                    )
                }
                { (data.total / this.params.pageSize) > 6 && <a className="load-more" onClick = {()=>this.onHandleMore(type)}>+ 查看更多</a>}
            </React.Fragment>
        ) : <p>{type===0?'没有未读消息':'没有已读消息'}</p>
    );

    render() {

        return (
            <Popover style={{height:590}} content={this.content()} trigger="click" placement="bottomRight" onVisibleChange={this.onVisibleChange}>
                <Icon
                    type="message"
                    theme="outlined"
                    style={{ marginRight: 10, cursor: 'pointer',fontSize:22 }}
                />
            </Popover>
        )
    }
}
export default MessageComp;