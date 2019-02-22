import React, { Component } from 'react';
import { Card, Row, Col, Select } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDefaultAuth, getOtherAuthList, saveDefaultAuth, jurisdictionStatus } from './store/action';
import Panel from '../../../components/panel/panel';

import { Unauthorized } from './../../error-page/not-found-page';

import './project-authority.less'


const Option = Select.Option;

@connect(
    state => ({
        topbar: state.topbar,
        projectAuthorityReducer: state.projectAuthorityReducer
    }),
    { getDefaultAuth, getOtherAuthList, saveDefaultAuth, jurisdictionStatus }
)

class ProjectAuthority extends Component {

    constructor(props) {
        super(props);

        this.params = {
            proId: '',
            pgeId: ''
        }

        this.state = {
            defaultAuth: ''
        }
    }

    componentDidMount() {
        this.request()
    }

    componentDidUpdate(prevProps){
        const prevId = prevProps.topbar.proId;
        const {proId} = this.props.topbar;
        if ( proId && prevId !== proId) {
            this.request ();
        }
    }

    componentWillReceiveProps(nextProps){
        
        const proAuth = nextProps.projectAuthorityReducer;
        const { defaultAuthList } = proAuth;

        if( defaultAuthList ){
            this.setState({
                defaultAuth: defaultAuthList.pgeId
            })
        }
        
    }

    request = () => {
        const { proId } = this.props.topbar;

        if( proId ){
            this.props.getDefaultAuth (proId);
            this.props.getOtherAuthList (proId);
        }
      };




    handleChange = (val) => {
        this.params.pgeId = val;
        this.setState({
            defaultAuth: val
        })
    }

    saveAuth = () => {
        const { proId } = this.props.topbar
        const params = {
            proId: proId,
            pgeId: this.params.pgeId
        }

        this.props.saveDefaultAuth(params);
    }

    render() {
        const panelData = {
            title: '权限管理',
        }

        const { defaultAuthList, authList, isJurisdiction } = this.props.projectAuthorityReducer;

        let defaultOption = [];
        let otherOptions = [];
        defaultOption = defaultAuthList && <Option value={defaultAuthList.pgeId}>{defaultAuthList.pgeName}</Option>;
        otherOptions = authList && authList.map(item => <Option value={item.pgeId} key={item.pgeId}>{item.pgeName}</Option>);

        return (
            <div>
                {isJurisdiction !== true
                    ? <React.Fragment>
                        <Panel panelData={panelData}></Panel>
                        <Card>
                            <Row className="auth-header">
                                <Col span={6}>权限方案名称</Col>
                                <Col span={8} offset={10}>操作</Col>
                            </Row>
                            <Row className="auth-item">
                                <Col span={6}>
                                    {defaultAuthList && <Select
                                        style={{ width: "100%" }}
                                        placeholder="请选择默认方案"
                                        onChange={this.handleChange}
                                        value={this.state.defaultAuth}
                                    >
                                        {defaultOption}
                                        {otherOptions}
                                    </Select>

                                    }
                                </Col>
                                <Col span={8} offset={10} className="operation">
                                    <span onClick={this.saveAuth}>保存</span>
                                    <span className="line">|</span>
                                    <Link to='/sdpbusiness/businessPge/accessPlan'>详情</Link>
                                </Col>
                            </Row>
                        </Card>
                    </React.Fragment>
                    : <Unauthorized />
                }

            </div>
        )
    }
}

export default ProjectAuthority;