import React, { PureComponent } from 'react';
import { Input, Form, Button, Drawer, Divider, Avatar, notification } from 'antd';
import Utils from '@/utils/utils';

const FormItem = Form.Item;

@Form.create()
class PowerDrawer extends PureComponent {
    state = {}

    //查询
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { userCode , userPhone } = values;
                if( !userCode && !userPhone ) {
                    return notification.warning({
                        key:'1',
                        message: '提示',
                        duration:1,
                        description: '账号或者手机号码必填一个查询'
                    });
                }
                this.props.onSearch(values);
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (!visible) {
            this.props.form.resetFields();
        }
    }
    onClose = () => {
        this.props.close();
    }
    //提交数据
    handleClick = () => {
        const userId = this.props.user.get('userId');
        if (userId) {
            this.props.addAuth({userId});
        } else {
            notification.warning({
                key:'1',
                message: '提示',
                duration:1,
                description: '请先选择账号后，再提交'
            });
        }
    }


    render() {
        const { visible, user } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Drawer
                className="setting-drawer"
                title="添加账号"
                width={720}
                onClose={this.onClose}
                visible={visible}
            >
                <Form layout="inline" onSubmit={this.handleSearch} >
                    <FormItem
                        // {...formItemLayout}
                        label="账号"
                    >
                        {getFieldDecorator('userCode', {
                            rules: [
                                { validator: Utils.isNumber },
                                { min: 4, message: '最少4位数字' },
                                { max: 11, message: '最多11位数字' }
                            ]
                        })(
                            <Input autoComplete="off" />
                        )}
                    </FormItem>
                    <FormItem
                        // {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('userPhone', {
                            rules: [
                                { validator: Utils.validFhone }
                            ]
                        })(
                            <Input autoComplete="off" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit">查 询</Button>
                    </FormItem>
                </Form>
                <Divider />
                <div className="power-content">
                    <div className="left">
                        <p><label className="left-label">账号</label> {user.get('userCode')}</p>
                        <p><label className="left-label">手机号</label> {user.get('userPhone')}</p>
                        <p><label className="left-label">姓名</label> {user.get('userName')}</p>
                        <p><label className="left-label">企业名</label> {user.get('companyName')}</p>
                        <p><label className="left-label">用户组</label> {user.get('groupName')}</p>
                    </div>
                    <div className="right">
                        <Avatar shape="square" size={100} icon="user" src={user.get('userHeadPortrait')} />
                    </div>
                </div>
                <div className="footer">
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={this.handleClick} type="primary">确定</Button>
                </div>
            </Drawer>
        );
    }
}

export default PowerDrawer;