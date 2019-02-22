import React from 'react';
import { connect } from 'react-redux';
import { Input, Button , Card, Tag, Icon, Checkbox, notification } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './app.less';
import Panel from '@/components/panel/panel';
import { 
    addLabelAction, addLabelSuccess, 
    deleteLabelSuccess, updateCheckboxAction, 
    updateCheckboxSuccess, jurisdictionStatus
} from './store/actions';
import { projectTypeAction, projectTypeList } from '@/core/common/actions';
import { Unauthorized } from '@/container/error-page/not-found-page';


moment.locale('zh-cn');  //设置日期中文格式

@connect(
    state => ({
        app: state.get('app'),
        common: state.get('common')
    }),
    { 
        projectTypeAction, addLabelAction, 
        addLabelSuccess, deleteLabelSuccess,
        jurisdictionStatus, projectTypeList,
        updateCheckboxAction, updateCheckboxSuccess
    }
)
class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            inputVisible: false,
            inputValue: '',
            tags: [],
            isCheck: false
        };
        this.reason = ['招聘信息不实审核不通过；', '发布人企业认证信息不符合规范；']; // 审核不通过理由
        this.date = '';
    }

    render() {
        const panelData = { title: '招聘设置' };
        const isJurisdiction = this.props.app.get('isJurisdiction');
        const tags = this.props.common.get('jobLabel') || [];
        const { inputVisible, inputValue, isCheck } = this.state;
        console.log(tags)
        return (
            <div>
                { isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24}}>
                        <Card title="标签设置" >
                            <div>
                                {
                                    tags && Array.isArray(tags)
                                    ? tags.map((subTag, index) => {
                                        const len = tags.length - 1;
                                        return(
                                            index < len
                                            ?  <Tag 
                                                key={subTag.categoryId}
                                                closable={true} 
                                                onClose={(e) => this.handleClose(e, subTag.categoryId)}
                                                style={{height: '28px', lineHeight: '26px'}}
                                                >
                                                {subTag.categoryValue}
                                            </Tag>
                                            : null
                                        );
                                    })
                                    : null
                                }
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        maxLength="5"
                                        style={{ width: '78px', height: '28px', lineHeight: '26px' }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag
                                        onClick={this.showInput}
                                        style={{ background: '#fff', borderStyle: 'dashed', height: '28px', lineHeight: '26px' }}
                                    >
                                        <Icon type="plus" /> 新增
                                    </Tag>
                                )}
                            </div>
                        </Card>
                        <Card
                            title="其他设置"
                            style={{marginTop: '15px'}}
                        >
                            <Checkbox onChange={this.handleCheckbox} checked={isCheck} >已认证企业招工信息不需要审核</Checkbox>
                            <div style={{ marginTop: '20px'}}>
                                <Button type="primary" onClick={this.handleUpdate}>更新</Button>
                            </div>
                        </Card>                    
                    </Card>
                </React.Fragment>
                : <Unauthorized /> }
            </div>
        );
    }
    componentDidMount () {
        // 获取招聘标签
        this.props.projectTypeAction({
            dicType: 'ZPBQ'
        });
    }
    componentWillReceiveProps (nextProps) {
        const nextLabel = nextProps.common.get('jobLabel') || [];
        const jobLabel = this.props.common.get('jobLabel') || [];
        const appLabelAdd = nextProps.app.get('appLabelAdd'); // 添加标签成功状态
        const appLabelDelete = nextProps.app.get('appLabelDelete'); // 删除标签成功状态
        const updateCheckbox = nextProps.app.get('updateCheckbox'); // 删除标签成功状态
        if (nextLabel && nextLabel !== jobLabel) {
            this.setState({
                tags: nextLabel
            });
            nextLabel.forEach((element, index) => {
                const len = nextLabel.length - 1;
                // 判断数组最后一组数据是判断其他设置中的复选框是否选中
                if (index === len) {
                    this.setState({
                        isCheck: element.updateState === 'y' ? true : false
                    })
                }
            });
        }
        if (appLabelAdd) {
            this.props.addLabelSuccess({status: false});
            // 获取招聘标签
            this.props.projectTypeAction({
                dicType: 'ZPBQ'
            });
        }
        if (appLabelDelete) {
            this.props.deleteLabelSuccess({status: false});
            // 获取招聘标签
            this.props.projectTypeAction({
                dicType: 'ZPBQ'
            });
        }
        // 更新招聘设置复选框
        if (updateCheckbox) {
            this.props.updateCheckboxSuccess({status: false});
            // 获取招聘标签
            this.props.projectTypeAction({
                dicType: 'ZPBQ'
            });
        }

    }
    componentWillUnmount() {
        this.props.jurisdictionStatus(false);
        this.props.projectTypeList([]);
    }
    // 新增标签
    showInput = () => {
        const tags = this.props.common.get('jobLabel') || [];
        if (tags.length < 9) {
            this.setState({ inputVisible: true }, () => this.input.focus(
               
            ));
        } else {
            notification.warning({
                message: '提示',
                description:'最多只能添加8个标签',
                key:'1'
            })
        }
    }
    saveInputRef = input => this.input = input
    // 移除标签
    handleClose = (e,id) => {
        e.preventDefault();
        this.props.deleteLabelAction({dictionariesId: id})
    }
    // 新增标签
    handleInputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    // 输入框失去焦点
    handleInputConfirm = (e) => {
        const value = e.target.value.replace(/\s+/g, '');
        const { inputValue, tags } = this.state;
        let newTags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            newTags = [...tags, inputValue];
        }
        if (tags.length <= 8 && value) {
            this.props.addLabelAction({
                dictionariesName: value
            });
            this.setState({
                inputVisible: false,
                inputValue: '',
                tags: newTags
            })
        } else {
            if (!value) {
                this.setState({
                    inputVisible: false,
                    inputValue: ''
                })
            }
            notification.warning({
                message: '提示',
                description: value ? '最多只能添加8个标签' : '请输入正确的标签',
                key:'1'
            })
        }
    }
    // 切换复选框
    handleCheckbox = (e) => {
        this.setState({
            isCheck: e.target.checked,
        });
    }
    // 更新
    handleUpdate = () => {
        const { isCheck } = this.state;
        this.props.updateCheckboxAction({
            checkState: isCheck ? 'y' : 'n'
        });
    }
    
}


export default App;


