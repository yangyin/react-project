import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Drawer,
    Form,
    Input,
    Checkbox,
    Row,
    Col,
    Icon,
    Button,
    Radio,
    notification,
} from 'antd';
import { statusControl } from './store/actions';
import './education.less';
import UploadComp from '@/components/update'

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@Form.create()
@connect(
    state => ({
        education: state.get('education'),
    }),
    { statusControl}
)
class EduQuesAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            quesType: '1',// 1单选 0多选 2阅读
            defaultAnsVal: 'A',
            difficultVal: '1', // 难度值
            ques: [{ label: 'A', value: '' }, { label: 'B', value: '' }],
            renderAns: [],
            videoUrl: '',
            stem: '',
            ansSvalRender: 'A',// 单选的默认值string,
            ansMvalRender: ['A'],// 多选的默认值arr,
        };
        this.params = {
            ansStr: '',
            uploadType: 1,
        }
    }
    componentWillUpdate () {
        const visible = this.props.editDatas.show;
        if (!visible) {
            return false;
        } else {
            return true;
        }
    }
    componentWillReceiveProps (nextProps) {
        const isRefresh = nextProps.education.get('isRefresh');
        if (isRefresh) {
            this.request();
            this.props.handleClose();
            this.props.statusControl(false);
        }
        const { editDatas } = this.props;
        const nextEditDatas = nextProps.editDatas;
        // 获取详情的值（渲染编辑框的值获取）
        if ((JSON.stringify(editDatas) !== JSON.stringify(nextEditDatas)) && Object.keys(nextEditDatas.eduInfo).length > 0) {
            
            const { stem, type, videoUrl, answer, difficulty, option } = nextEditDatas.eduInfo;
            // 答案对象转数组
            let quesArr = [];
            if (option) {
                for (let i in option) {
                    let objOption = { label: i, value: option[i] }
                    quesArr.push(objOption);
                }
            } else {
                quesArr = [{ label: 'A', value: '' }];
            }
            this.setState({
                stem: stem,
                quesType: type,// 1单选 0多选 2阅读
                defaultAnsVal: answer, // 默认答案
                difficultVal: difficulty, // 难度值
                ques: quesArr, // 数组
                renderAns: [],
                videoUrl: videoUrl,
            })
        } 
    }
    // 取消modal
    handleCancel = _ => {
        this.props.handleClose();
    }
    // 类型
    quesTypeChange = e => {
        this.setState({
            quesType: e.target.value,
        });
    }
    // 增加选项
    add = _ => {
        const { ques } = this.state;
        if (!ques[(ques.length - 1)].value) {
            notification.open({
                message: '新增答案失败',
                description: '请先完善答案再添加！',
                icon: <Icon type="close-circle" style={{ color: '#ff0000' }} />,
            });
            return;
        }
        let arr = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.setState((prevState) => ({
            ques: [...prevState.ques, { label: arr[prevState.ques.length], value: '' }]
        })
        )

    }
    //获取选项值
    changeQues = (e, i) => {
        const { value } = e.target;
        this.setState((prevState) => ({
            ques: prevState.ques.map((item, index) => {
                if (index === i) {
                    item.value = value
                }
                return item;
            })
        }))
    }
    // 删除对应选项
    delQues = (key) => {
        let arr = ['A', 'B', 'C', 'D', 'E', 'F'];
        const { ques } = this.state;
        if (ques.length < 3) {
            notification.open({
                message: '提示',
                description: '请至少保留2个选项！',
                icon: <Icon type="close-circle" style={{ color: '#ff0000' }} />,
            });
            return;
        }
        let newArr = ques.filter((v) => v.label !== key).map((item, i) => {
            item.label = arr[i]
            return item;
        })
        this.setState(prevState => ({
            ques: newArr
        }))
    }
    // 提交题目动作
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { stem, quesType, ansSingle, ansMulity, videoUrl, difficultVal } = values;
                this.setState({
                    quesType: quesType,
                    stem: stem,
                    videoUrl: videoUrl,
                    difficultVal: difficultVal,
                    ansSingleVal: ansSingle,
                    ansMulityVal: ansMulity,
                }, () => {
                    this.addQuesData();
                })
            }
        });
    }
    // 新增题目提交
    addQuesData = () => {
        const { stem, videoUrl, quesType, ques, difficultVal, ansSingleVal, ansMulityVal } = this.state;
        // 答案
        let ansStr = '';
        if (quesType === '1') {
            ansStr = ansSingleVal;
        } else if (quesType === '0') {
            ansStr = ansMulityVal.join('#DYQ$');
        }
        // 验证选项数组是否为空
        if (!ques[(ques.length - 1)].value && quesType !== '2') {
            notification.open({
                message: '保存失败',
                description: '请先完善答案再提交！',
                icon: <Icon type="close-circle" style={{ color: '#ff0000' }} />,
            });
            return;
        }
        // 选项数组转json
        var objQues = {};
        ques.map(item => {
            objQues[item['label']] = item['value']
        })

        let params = {};
        if (quesType === '2') { // 阅读
            params = {
                type: quesType,
                stem, videoUrl,
            }
        } else {
            params = {
                type: quesType,
                stem, videoUrl,
                option: JSON.stringify(objQues),
                difficulty: difficultVal,
                answer: ansStr,
            }
        }
        this.props.savaData(params);
    }
    // 单选答案
    renderSingleAns = (quesArr) => {
        return (
            quesArr.map(item => {
                return <Radio key={item.label} value={item.label}>{item.label}</Radio>
            })
        )
    }
    uploadSuccess = (data, keyIndex) => {
        const { ques } = this.state;
        const urlQues = data[0].url;
        ques[keyIndex].value = urlQues;
        this.setState({
            ques: ques
        });
    }
    render () {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };

        const { ansSvalRender, ansMvalRender, videoUrl, stem, ques, quesType, difficultVal } = this.state;
        const { uploadType, } = this.params;
        const { getFieldDecorator } = this.props.form;
       
        // 多选选项
        let mulityAns = [];
        ques.map(item => {
            mulityAns.push(item.label);
        })
        return (
            <div>
                <Drawer
                    title={this.props.editDatas.modalTil==='ADD'?'新增题目':'编辑题目'}
                    visible={this.props.editDatas.show}
                    width={640}
                    className='educationModal'
                    onClose={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="类型">
                            {getFieldDecorator('quesType', {
                                rules: [{
                                    required: true, message: '请选择类型！',
                                }],
                                initialValue: quesType,
                            })(
                                <RadioGroup onChange={this.quesTypeChange}>
                                    <Radio value='1'>单选题</Radio>
                                    <Radio value='0'>多选题</Radio>
                                    <Radio value='2'>阅读题</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="题干">

                            <Row>
                                <Col span={18}>{getFieldDecorator('stem', {

                                    rules: [{
                                        required: true, message: '请输入题干！',
                                    }],
                                    initialValue: stem,
                                })(

                                    <TextArea maxLength={quesType === '2' ? 1000 : 80} rows={4} />
                                )}</Col>
                            </Row>

                        </FormItem>

                        <FormItem {...formItemLayout} label="附件">
                            <Row>
                                <Col span={18}>
                                    {getFieldDecorator('videoUrl', {
                                        initialValue: videoUrl,
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <Input placeholder='请输入视频地址' />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        {quesType !== '2' && <div>
                            <FormItem {...formItemLayout} label="选项">
                                <Row>
                                    {ques.map((v, i) => (
                                        <div key={i}>
                                            <Col span={18}><Input value={v.value} addonBefore={`${v.label} 选项：`} onChange={(e) => this.changeQues(e, i)}
                                                addonAfter={<UploadComp
                                                    keyIndex={i}
                                                    maxlength={1}
                                                    uploadSuccess={this.uploadSuccess}
                                                    uploadType={uploadType} />} /></Col>
                                            <Col span={2}> <Button onClick={() => this.delQues(v.label)} className='delBtn' type="primary">删除</Button></Col>
                                        </div>

                                    ))}

                                </Row>
                                {ques.length < 6 && <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                    <Icon type="plus" />新增答案选项</Button>}
                            </FormItem>
                            {quesType === '1' ? <FormItem {...formItemLayout} label='答案'>
                                {getFieldDecorator('ansSingle', {
                                    initialValue: ansSvalRender,
                                    rules: [{
                                        required: true, message: '请选择答案',
                                    }],
                                })(
                                    <RadioGroup>
                                        {this.renderSingleAns(ques)}
                                    </RadioGroup>
                                )}
                            </FormItem> : <FormItem {...formItemLayout} label="答案">
                                    {getFieldDecorator('ansMulity', {
                                        initialValue: ansMvalRender,
                                        rules: [{
                                            required: true, message: '请选择答案',
                                        }],
                                    })(
                                        <CheckboxGroup options={mulityAns} /* onChange={this.ansMulityChange} */ />
                                    )}
                                </FormItem>}


                            <FormItem {...formItemLayout} label="难度">
                                {getFieldDecorator('difficultVal', {
                                    initialValue: difficultVal,
                                    rules: [{
                                        required: true, message: '请选择难度',
                                    }],
                                })(<RadioGroup>
                                    <Radio value='1'>1</Radio>
                                    <Radio value='2'>2</Radio>
                                    <Radio value='3'>3</Radio>
                                    <Radio value='4'>4</Radio>
                                    <Radio value='5'>5</Radio>
                                </RadioGroup>)}
                            </FormItem>
                        </div>}
                        <FormItem {...formItemLayout}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default EduQuesAdd;
