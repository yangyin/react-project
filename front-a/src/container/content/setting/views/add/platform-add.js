import React, { PureComponent } from 'react';
import { Input, Form, Button, Drawer } from 'antd';
import Utils from '@/utils/utils';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};


@Form.create()
class PlatformAdd extends PureComponent {
    state = {}

    add =(e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.add(values);
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if(!visible) {
            this.props.form.resetFields();
        }
    }
    onClose = () => {
        this.props.close();
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Drawer
                className="setting-drawer"
                title="添加平台"
                width={500}
                onClose={this.onClose}
                visible={visible}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="平台名称"
                    >
                        {getFieldDecorator('platformName', {
                            rules: [
                                { required: true, message: '请输入名称' },
                                { validator: Utils.validSpace, message: '请输入有效名称'},
                                { max: 20, message: '最多设置20字' }
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="平台描述"
                    >
                        {getFieldDecorator('platFormDescribe', {
                            rules: [
                                { max: 50, message: '最多设置50字' }
                            ]
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </Form>
                <div className="footer">
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={this.add} type="primary">提交</Button>
                </div>
            </Drawer>
        );
    }
}

export default PlatformAdd;