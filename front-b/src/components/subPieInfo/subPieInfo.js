
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './subPieInfo.less';

/**
 * 考勤和三级教育饼状图右边相关信息
 * value:人数 
 * pathname：跳转链接
 * color：文字颜色
 */
class ColPieInfo extends PureComponent {
   
    render () {
        const { subPieInfo } = this.props;
        // const subPieInfo =  [
        //         { value: 5, name: '实到岗', pathname: '/project/attendanceInfo',color:'#c23531' },
        //         { value: 55, name: '未到岗', pathname: '/project/attendanceInfo',color:'#2f4554' },
        //         { value: 5, name: '场内人数', pathname: '/project/attendanceInfo',color:'#61a0a8' },
        //     ];
        return (
            <div className="subPieInfo">
                <Row>
                    {subPieInfo.map((v,index) => {
                        return (
                            <Col key={index} span={8} className="colList">
                                <p className="label">{v.name}</p>
                                {v.pathname ? <Link style={{color:v.color}} to={{ pathname: v.pathname }}><p className="num">{v.value}</p></Link>
                                    : <p  style={{color:v.color}} className="num">{v.value}</p>}
                            </Col>
                        )
                    })}

                </Row>
            </div>
        )
    }

}

export default ColPieInfo;