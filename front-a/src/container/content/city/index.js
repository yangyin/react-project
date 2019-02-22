import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select, Card, Input, Popconfirm, Button } from 'antd';

import './city.less';

import { getCityListAction, handleCityAction, handleCitySuccess, cityAddAction } from './store/actions';

import Panel from '@/components/panel/panel';
import Etable from '@/components/Etable';
import { Unauthorized } from '@/container/error-page/not-found-page';



const panelData = {
    title: '城市管理'
}
const Option = Select.Option;
const Search = Input.Search;

@connect(
    state => ({
        city: state.get('city')
    }),
    { getCityListAction, handleCitySuccess, handleCityAction, cityAddAction }
)
class City extends PureComponent {

    areaParams = {
        level: 1,//获取省市区 标识（省1，市2，区3）
        proId: '',
        cityId: ''
    }
    columns = [
        { title: '编号', dataIndex: 'identifier', editable: true },
        { title: '区域', dataIndex: 'shortname', editable: true },
        { title: '首字母', dataIndex: 'firstLetter', editable: true },
        { title: '排序', dataIndex: 'serialNumber', editable: true },
        {
            title: '操作', render: (text, record) => {
                const editable = this.isEditing(record, Object.keys(this.refs).length > 0 && this.refs.state.editingKey);
                const EditableContext = Object.keys(this.refs).length > 0 && this.refs.getContext();
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a
                                            href="javascript:;"
                                            onClick={() => this.save(form, record)}
                                            style={{ marginRight: 8 }}
                                        >保存</a>
                                    )}
                                </EditableContext.Consumer>
                                <Popconfirm
                                    title="确定取消?"
                                    onConfirm={this.cancel}
                                ><a>取消</a>
                                </Popconfirm>
                            </span>
                        ) : (
                                <span>
                                    <a onClick={() => this.edit(record.id)}>编辑 </a> |
                                    <Popconfirm title="确定要删除?" onConfirm={() => this.del(record)} okText="确定" cancelText="取消">
                                        <a href="#"> 删除 </a>
                                    </Popconfirm>
                                </span>
                            )}
                    </div>
                );
            }
        },
    ]
    //判断是否编辑
    isEditing = (record, key) => {
        if (typeof key === 'string') {
            return record.id === key
        }
    }
    //编辑按钮
    edit = (key) => {
        this.refs.updateState(key);
    }

    //编辑保存
    save = (form, { id }) => {
        form.validateFields((err, values) => {
            if (!err) {
                const { level } = this.areaParams;
                if (id === '0') {
                    let parentid = '';
                    if (level === 2) {
                        parentid = this.areaParams.proId;
                    } else if (level === 3) {
                        parentid = this.areaParams.cityId;
                    } else {
                        parentid = 0;
                    }
                    this.props.handleCityAction({ url: 'saveOrUpdateProvince', params: { ...values, level, parentid } });
                } else {
                    this.props.handleCityAction({ url: 'saveOrUpdateProvince', params: { ...values, id, level } });
                }
            }
        });
    }
    //编辑取消
    cancel = () => {
        this.refs.updateState('');
    }
    //删除
    del = ({ id }) => {
        const { level } = this.areaParams;
        this.props.handleCityAction({ url: 'deleteProvinces', params: { id, level } });
    }
    //添加按钮
    add = (record) => {
        this.setState(() => ({
            type: 1,
            title: '添加通知对象设置',
            visible: true,
            eventName: record.eventName,
            id: record.id
        }))
    }
    componentDidMount() {
        //获取省份
        this.props.getCityListAction({ level: this.areaParams.level });
    }
    componentWillReceiveProps(nextProps) {
        const isUpdate = nextProps.city.get('isUpdate');
        if (isUpdate) {
            this.refs.updateState('');
            this.props.handleCitySuccess({ status: false });
            const { level, proId, cityId } = this.areaParams;
            let params = {};
            if (level === 3) {
                params = { level, parentid: cityId };
            } else if (level === 2) {
                params = { level, parentid: proId };
            } else {
                params = { level };
            }
            this.props.getCityListAction(params);
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        const proList = this.props.city.get('proList');
        const cityList = this.props.city.get('cityList');
        const areaList = this.props.city.get('areaList');
        const isJur = this.props.city.get('isJur');
        const { level } = this.areaParams;
        let data;
        if (level === 3) {
            data = areaList;
        } else if (level === 2) {
            data = cityList;
        } else {
            data = proList;
        }
        return (
            <React.Fragment>
                {!isJur
                    ? <div className="city-page">
                        <Panel panelData={panelData} />
                        <Card style={{ margin: 24 }}>
                            <div className="header">
                                <div>
                                    <Select
                                        defaultValue=" "
                                        style={{ width: 150, marginRight: 20 }}
                                        onChange={this.handleProvinceChange}
                                    >
                                        <Option key=" ">选择省</Option>
                                        {proList.map(d => <Option key={d.get('id')}>{d.get('shortname')}</Option>)}
                                    </Select>
                                    <Select
                                        defaultValue=" "
                                        style={{ width: 150 }}
                                        onChange={this.handleCityChange}
                                    >
                                        <Option key=" ">选择城市</Option>
                                        {cityList.map(d => <Option key={d.get('id')}>{d.get('shortname')}</Option>)}
                                    </Select>
                                    <Button onClick={this.handleAdd}>新增</Button>
                                </div>
                                <div>
                                    <Search
                                        placeholder="请输入区域名称"
                                        onSearch={this.onSearch}
                                        style={{ width: 300 }}
                                    />
                                </div>
                            </div>
                            <Etable
                                rowKey="id"
                                data={data.toJS()}
                                columns={this.columns}
                                isEditing={this.isEditing}
                                ref={(el) => this.refs = el}
                            />

                        </Card>
                    </div>
                    : <Unauthorized />
                }
            </React.Fragment>

        );
    }

    //按level搜索
    onSearch = (value) => {
        const { level, proId, cityId } = this.areaParams;
        let parentid = level === 2 ? proId : (level === 3 ? cityId : 0);
        this.props.getCityListAction({ parentid, level, shortname: value });
    }
    //获取城市
    //判断，如果value如果为真，代表选取了省份，为假：代表选择了空，
    handleProvinceChange = (value) => {
        let parentid = '';
        if (value.trim()) {
            this.areaParams.level = 2;
            this.areaParams.proId = value;
            parentid = value;
        } else {
            this.areaParams.level = 1;
            parentid = 0;
        }
        this.props.getCityListAction({ level: this.areaParams.level, parentid });
    }
    //获取区
    handleCityChange = (value) => {
        let parentid = '';
        if (value.trim()) {
            this.areaParams.level = 3;
            this.areaParams.cityId = value;
            parentid = value
        } else {
            this.areaParams.level = 2;
            parentid = this.areaParams.proId;
        }
        this.props.getCityListAction({ level: this.areaParams.level, parentid });
    }
    //新增
    handleAdd = () => {
        const { level, proId, cityId } = this.areaParams;
        let params = { level, id: '0', identifier: '', shortname: '', firstLetter: '', serialNumber: '' };
        const proList = this.props.city.get('proList');
        const cityList = this.props.city.get('cityList');
        const areaList = this.props.city.get('areaList');
        let key = ''
        if (level === 2) {
            params.parentid = proId;
            key = cityList;
        } else if (level === 3) {
            params.parentid = cityId;
            key = areaList;
        } else {
            key = proList;
        }
        let len = key.filter(v => v.get('id') === '0').size;
        if (len > 0) {
            return;
        }
        this.props.cityAddAction(params);
        this.refs.updateState('0');
    }
}

export default City;