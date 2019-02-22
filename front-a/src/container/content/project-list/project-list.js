import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Row, Col, Select, Input, Card, Divider } from 'antd';

import './project-list.less';
import Panel from '@/components/panel/panel';
import { projectAction, jurisdictionStatus } from './store/actions';
import { projectTypeAction } from '@/core/common/actions';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Utils from '@/utils/utils';

const Option = Select.Option;
const Search = Input.Search;

const columns = [{
    title: '项目ID',
    dataIndex: 'proId',
    key: 'proId'
}, {
    title: '项目名称',
    dataIndex: 'proName',
    key: 'proName',
}, {
    title: '关键字',
    dataIndex: 'proLable',
    key: 'proLable',
    render: (text) => (
        <span>
            <p>{text ? text : '-'}</p>
        </span>
    )
}, {
    title: '项目类型',
    key: 'proTypeName',
    dataIndex: 'proTypeName'
}, {
    title: '项目负责人',
    key: 'userName',
    dataIndex: 'userName'
}, {
    title: '联系电话',
    key: 'userPhone',
    dataIndex: 'userPhone'
}, {
    title: '所属公司',
    key: 'companyName',
    dataIndex: 'companyName',
    render: (text) => (
        <span>
            <p>{text ? text : '-'}</p>
        </span>
    )
}, {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime'
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <Link to={{ pathname: `/project/details/${record.proId}` }}>基础信息</Link>
            <Divider type="vertical" />
            <Link to={{
                pathname:'/project/dataInfo',
                search: `?proId=${record.proId}&proName=${record.proName}`
            }}>数据信息</Link>
        </span>
    ),
}];

@connect(
    state => ({
        project: state.get('project'),
        common: state.get('common')
    }),
    { projectAction, projectTypeAction, jurisdictionStatus }
)

class ProjectList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.params = {
            pageNum: 1,
            pageSize: 10,
            queryStr: '',
            proType: '',
            proCategory: ''
        }
    }

    render () {
        const panelData = {
            title: '项目列表',
        };
        const isJurisdiction = this.props.project.get('isJurisdiction');
        const projectList = this.props.project.get('projectList');
        const projectType = this.props.common.get('projectType') || [];
        const projectCategory = this.props.common.get('projectCategory') || [];
        return (
            <div>
                {isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Card bordered={false} style={{ margin: 24 }}>
                        <div className="filter-box">
                            <Row>
                                <Col span={16}>
                                    <Select
                                        defaultValue="项目类型"
                                        onChange={this.handleTypeChange}
                                    >

                                        <Option value="">全部</Option>
                                        {
                                            projectType && Array.isArray(projectType)
                                                ? projectType.map(subOpt => {
                                                    return (
                                                        <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                    )
                                                })
                                                : null
                                        }
                                    </Select>
                                    <Select
                                        defaultValue="项目类别"
                                        onChange={this.handleCategoryChange}
                                    >
                                        <Option value="">全部</Option>
                                        {
                                            projectCategory && Array.isArray(projectCategory)
                                                ? projectCategory.map(subOpt => {
                                                    return (
                                                        <Option value={subOpt.categoryId} key={subOpt.categoryId}>{subOpt.categoryValue}</Option>
                                                    )
                                                })
                                                : null
                                        }
                                    </Select>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <Search
                                        placeholder="请输入项目ID或项目名称或负责人姓名查询"
                                        onSearch={this.handleSearch}
                                        style={{ width: 380 }}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={projectList.rows}
                            rowKey="proId"
                            locale={{ emptyText: '暂无数据' }}
                            pagination={
                                Utils.pagination({ ...projectList, pageNum: this.params.pageNum }, (current) => {
                                    this.params.pageNum = current;
                                    this.props.projectAction(this.params);
                                })
                            }
                        />
                    </Card>
                </React.Fragment>
                    : <Unauthorized />}
            </div>
        );
    }
    componentDidMount () {
        // 获取项目列表
        this.props.projectAction(this.params);
        // 获取项目类型
        this.props.projectTypeAction({
            dicType: 'XMLX'
        });
        // 获取项目类别
        this.props.projectTypeAction({
            dicType: 'XMLB'
        });
    }
    componentWillUnmount () {
        this.props.jurisdictionStatus(false);
    }
    // 项目类型切换
    handleTypeChange = (value) => {
        this.params.proType = value;
        this.params.pageNum = 1;
        // 获取项目列表
        this.props.projectAction(this.params);
    }
    // 项目类别切换
    handleCategoryChange = (value) => {
        this.params.proCategory = value;
        this.params.pageNum = 1;
        // 获取项目列表
        this.props.projectAction(this.params);
    }
    handleSearch = (value) => {
        this.params.queryStr = value.replace(/\s+/g, '');
        this.params.pageNum = 1;
        // 获取项目列表
        this.props.projectAction(this.params);
    }
}


export default ProjectList;


