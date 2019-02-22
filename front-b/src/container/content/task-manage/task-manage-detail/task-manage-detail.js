import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, List, Row, Col, Icon, Popover } from 'antd';

import Panel from '../../../../components/panel/panel';
import './task-manage-detail.less';

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

@withRouter
class TaskManageDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detailData: JSON.parse(decodeURIComponent(this.props.location.search.split('=')[1]))
        }
    }
    /**
     * 操作
     */
    PopconfirmHandle = () => {
        const content = (
            <div className="popover-content">
                <div>
                    <h3>编辑任务</h3>
                    <span>编辑任务详情内容及设置</span>
                </div>
                <div>
                    <h3>分配任务</h3>
                    <span>指定任务的负责人</span>
                </div>
                <div>
                    <h3>移动任务</h3>
                    <span>在标段模块间移动任务</span>
                </div>
                <div>
                    <h3>关闭任务</h3>
                    <span>关闭正进行的任务</span>
                </div>
                <div>
                    <h3>删除任务</h3>
                    <span>删除当前关闭的任务</span>
                </div>
            </div>
        );
        return (
            <Popover content={content} trigger="click" placement="bottomLeft" style={{padding:'12px 0'}}>
                <a href="javascript:;">操作<Icon type="down" theme="outlined" /></a>
            </Popover>
        )
    }

    render() {
        // console.log(this.props)
        const { detailData } = this.state;
        let data = [];
        data.push(detailData);
        // console.log(data);
        const panelData = { pathname: '任务 /df项目 /任务详情', title: '任务详情', desc: '项目管理人员通过在这里计划周任务和月任务的方式，进行产值任务规划' }
        return (
            <div className="task-manage-detail">
                <Panel panelData={panelData} />
                <Card
                    style={{ margin: 24 }}
                    extra={this.PopconfirmHandle()}
                    headStyle={{ background: '#d1deea' }}
                    title={<div className="task-state-header"><span>{detailData.taskNo}</span> <span className="task-state-name">[{detailData.taskStateName}]</span><span>{detailData.describeStr}</span></div>}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <ListItem>
                                <ListItemMeta title="项目名称" description={item.proName} />
                                <ListItemMeta title="任务类型" description={item.taskTypeName} />
                                <ListItemMeta title="标段模块" description={item.sectionName} />
                                <ListItemMeta title="负责人(默认当前用户)" description={item.taskManagerName} />
                            </ListItem>
                        )}
                    />
                </Card>
                <Card style={{ margin: 24 }} title={
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <ListItem>
                                <ListItemMeta title="任务简要描述" description={item.describeStr} />
                                <ListItemMeta title="计划时间" description={`${item.planBeginTime}至${item.planEndTime}`} />
                            </ListItem>
                        )}
                    />
                }>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <ListItem>
                                <ListItemMeta title="合同单价（元）" description={item.contractPrice} />
                                <ListItemMeta title="工程量" description={`${item.quantities}${item.quantitiesCountName}`} />
                                <ListItemMeta title="人力计划（人数）" description={item.peopleNum} />
                            </ListItem>
                        )}
                    />
                </Card>

            </div>
        )
    }



}

export default TaskManageDetail;