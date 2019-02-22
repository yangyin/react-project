import React from 'react';
import { connect } from 'react-redux';
import { Card ,Icon,Col, Row } from 'antd';

import './camera-view.less';

import Panel from '../../../../components/panel/panel';

import { getVedioList } from './../store/actions';


const panelData = {title: '监控查看'}

const bodyStyle = {display:'flex',width:'100%',boxSizing:'border-box',cursor:'pointer'};
const extraStyle = {cursor:'pointer',display:'flex',alignItems: 'center'};

@connect(
    state=>({
        camera:state.camera,
        topbar:state.topbar
    }),
    { getVedioList }
)
class CameraView extends React.Component {

    componentDidMount() {
        const { proId } = this.props.topbar;
        proId && this.props.getVedioList(proId);
    }
    componentDidUpdate(prevProps) {
        const prevProId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;
        if( (prevProId !== proId) && proId) {
            this.props.getVedioList(proId);
        }
    }
    /**
     * 点击具体摄像头时
     */
    handleItemClick = ({liveUrl,videoArea}) => {
        this.props.history.push(`/video?url=${liveUrl}&title=${encodeURI(videoArea)}`);
    }
    /**
     * 点击全屏显示
     */
    handleClick=() => {
        this.props.history.push(`/video-list`);
    }

    render() {
        const { proName } = this.props.topbar;
        const { videoList } = this.props.camera;
        const videos  = videoList[0]&&videoList[0].videos;
        return (
            <div id="camera-view">
                <Panel panelData={panelData} />
                <Card 
                    style={{margin:24}} 
                    title={proName}
                    extra={videos && videos.length>0 ?<span style={extraStyle} onClick={this.handleClick}><Icon type="arrows-alt" theme="outlined" /> 全屏显示</span>:null}
                    bodyStyle={bodyStyle}
                >
                    <Row gutter={24} style={{width:'100%'}}>
                        {
                            videos && videos.length>0 && videos.map(v => (
                                <Col span={8} style={{marginBottom:10}} key={v.videoId}>
                                    <Card className="view-item" bodyStyle={{padding:0}} onClick={()=>this.handleItemClick(v)}>
                                        <div className="item-content">
                                            <img src={require('@/images/video_default.png')} alt=""/>
                                            <p>{v.videoArea}</p>
                                        </div>
                                        <div className="item-footer">
                                            <div className="footer-left">Camera：{v.videoCode}</div>
                                            <div className="footer-right">
                                                <Icon type="play-circle" theme="outlined" />
                                                <span>直播</span>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Card>
                
            </div>
        )
    }
}


export default CameraView;