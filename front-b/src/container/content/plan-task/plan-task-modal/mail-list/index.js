import React, { PureComponent } from 'react';
import {Button,Input ,Icon,Avatar } from 'antd';

import './mail-list.less';

class ManagerMailList extends PureComponent {

    handleSearch=() => {

    }
    onClose = () => {
        this.props.onChildrenDrawerClose();
    }
    //通知父级，选中的人
    handleClick = (id,name) => {
        // console.log(id,name)
        this.props.onChildrenDrawerClose(id,name);
    }
    itemRender = (data) => {
        let arr = data.filter(v => !!v.userId);
        return arr.map(v => (
            <div className="item" key={v.userId} onClick={() => this.handleClick(v.userId,v.userName)}>
                { v.userHeadPortrait ? <Avatar size={48} src={v.userHeadPortrait} alt="头像" /> : <Avatar size={48} icon="user" alt="头像" /> }
                <label className="item-name">{v.userName}</label>
            </div>
        ))
    }
    render() {
        const { data } = this.props;
        // console.log('******',data)
        return (
            <div id="plan-mail-list">
                <div style={{ marginBottom: 16 }}>
                    <Input addonAfter={<Icon type="search" onClick={this.handleSearch} />} placeholder="请输入姓名或者电话号码" />
                </div>
                <div className="list">
                    {data.length >0 ? this.itemRender(data) : <p>暂无数据</p>}
                </div>
                <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}>
                    <Button style={{marginRight: 8,}} onClick={this.onClose}> 关闭</Button>
                </div>
            </div>
        )
    }
}

export default ManagerMailList;