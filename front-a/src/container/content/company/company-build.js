import React, { PureComponent } from 'react';
import { Popconfirm, Avatar, Card, Row, Col, Select, Input, Divider, Table } from 'antd';
import { Unauthorized } from '@/container/error-page/not-found-page';
import Company from '@/container/content/company/company';
import Panel from '@/components/panel/panel';
import { connect } from 'react-redux';

@connect(
    state => ({
        company: state.get('company')
    }),
    {  }
)
class CompanyBuild extends PureComponent {
    render () {
        const panelData = {
            title: '建设单位',
        };
        const pageData = {
            pageType:'BUILD',
            categoryId: "1HLcJSdvLFoUlld0voH",
        };
        const isJur = this.props.company.get('isJur');
        return (
            <React.Fragment>
            {!isJur ? <div className="user">
                <Panel panelData={panelData} />
            <Company pageData={pageData}/>
            </div>
                    : <Unauthorized />}
            </React.Fragment>
        );
    }
}


export default CompanyBuild;






