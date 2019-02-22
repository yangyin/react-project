import React, { PureComponent } from 'react';
import { Popconfirm, Avatar, Card, Row, Col, Select, Input, Divider, Table } from 'antd';
import { Unauthorized } from '@/container/error-page/not-found-page';
import UserComponent from './userTable';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';

@connect(
    state => ({
        user: state.get('user')
    }),
    {}
)
class UserUsers extends PureComponent {

    render () {
        const panelData = {
            title: '用户管理',
        };
        const userType = {filterShow:true,pageType:'USERS'}
        const isJur = this.props.user.get('isJur');
        return (
            <React.Fragment>
            {!isJur ? <div className="user">
                <Panel panelData={panelData} />
            <UserComponent userType={userType}/>
            </div>
            : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default UserUsers;






