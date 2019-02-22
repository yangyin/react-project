import React from 'react';
import { Row, Col } from 'antd';
import './error-page.less';

export default function ErrorPage(props) {
    const src = props.src;
    console.log(src)
    return (
        <Row style={{marginTop:'50px',overflow:'hidden'}} className="error-page">
            <Col xs={12} sm={12} md={12} lg={16} xl={16} style={{margin:'0 auto',textAlign:'center'}}>
                <img style={{width:'80%',maxWidth:'430px'}} src={require(`../../images/${src}.png`)} alt=""/>
            </Col>
            <Col xs={12} sm={12} md={12} lg={8} xl={8} className="content">
                <div >
                    <h1 style={{fontSize:'50px',color:'#434e59',margin:'20px 0 0 0',fontWeight:600,lineHeight:'50px'}}>{props.data.num}</h1>
                    <div style={{fontSize:'20px',color:'rgba(0,0,0,.45)',margin:'20px 0'}}>{props.data.desc}</div>
                    <div>
                        <a href="#/"><button type="button" className="ant-btn ant-btn-primary" style={{height:'32px'}}><span>返回首页</span></button></a>
                    </div>
                </div>
            </Col>
        </Row>
    )
}