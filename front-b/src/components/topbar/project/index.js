import React from 'react';
import { Card } from 'antd';
import { write } from './../../../utils/localStorage';

export default (props) => {

    //点击项目名称，更新proId
    const handleClick = (id, name) => {
        props.handleCurrentProject(id, name);
        write('projectInfo',{id,name});
    }
    //渲染item
    const itemRender = (data) => {
        return (<div className="item-group">
            {data.map(v => (
                <div className="item" key={v.proId} onClick={() => handleClick(v.proId, v.proShortName)}>
                    <img src={v.proPic || require('../../../images/logo1.png')} alt="" width={20} />
                    <span> {v.proShortName}{v.userName  && `（${v.userName}）`}</span>
                </div>
            ))}
        </div>)

    }
    //点击加载更多
    const handleRequestClick = (type) => {
        props.handleMoreClick(type);
    }
    const { data, params } = props;
    return (
        <div>
            <Card className="dashboard-card" title="在建的项目" style={{ border: 'none', width: 500 }}>
                {itemRender(data['doingProjectList'])}
                {(params['doingPageNum'] < data['doingPageCount']) && <a href="javascript:;" onClick={()=>handleRequestClick('doingPageNum')}>+展开更多</a>}
            </Card>
            <Card className="dashboard-card" title="准备中的项目" style={{ border: 'none', width: 500 }}>
                {itemRender(data['prepareProjectList'])}
                {(params['preparePageNum'] < data['preparePageCount']) && <a href="javascript:;" onClick={()=>handleRequestClick('preparePageNum')}>+展开更多</a>}
            </Card>
            <Card className="dashboard-card" title="已竣工的项目" style={{ border: 'none',width: 500 }}>
                { itemRender(data['doneProjectList'])}
                {(params['donePageNum'] < data['donePageCount']) && <a href="javascript:;" onClick={()=>handleRequestClick('donePageNum')}>+展开更多</a>}
            </Card>
        </div>
    )
}