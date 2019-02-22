import React from 'react';
import { connect } from 'react-redux';
import { Icon, Col, Row } from 'antd';
import Html5Player from 'html5-player';
import moment from 'moment';

import { getVedioList } from './../../store/actions';

import 'html5-player/libs/assets/css/style.css';
import './video-list.less';


@connect(
    state => ({
        camera: state.camera,
        topbar: state.topbar
    }),
    { getVedioList }
)
class VideoList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            time:null
        }
        this.timer = setInterval(() => {
            this.setState(() => ({
                time: this.getTime()
            }))
        }, 1000);
    }

    getTime = () => {
        let year = moment().format('YYYY年MM月DD日');
        let d = moment().format('星期d');
        let h = moment().format('HH:mm:ss');

        return year + ' ' + d + ' ' + h;
    }

    componentDidMount() {
        const { videoList } = this.props.camera;
        if (videoList.length === 0) {
            const { proId } = this.props.topbar;
            proId && this.props.getVedioList(proId);
        }
        // let player = new Html5Player();
        // console.log(player)
    }
    componentDidUpdate(prevProps) {
        const prevProId = prevProps.topbar.proId;
        const { proId } = this.props.topbar;
        if ((prevProId !== proId) && proId) {
            this.props.getVedioList(proId);
        }
    }
    componentWillUnmount() {
        this.timer = null;
    }
    handleClick = ({ liveUrl, videoArea }) => {
        this.props.history.push(`/video?url=${liveUrl}&title=${encodeURI(videoArea)}`);
    }
    itemRender = (row, videos) => {
        let html = [];
        for (let i = 0; i < row; i++) {
            html.push(
                <Row gutter={14} style={{ marginBottom: 10 }} key={i}>
                    <Col span={8}>
                        <div className="item">
                            {videos && videos[3 * i] && videos[3 * i]['liveUrl'] &&
                                <React.Fragment>
                                    <Html5Player
                                        flvConfig={{ enableWorker: true }}
                                        width="100%"
                                        height="100%"
                                        file={videos[3 * i]['liveUrl']}
                                        autoplay={true}
                                        controls={false}
                                        stretching="exactfit"
                                        title={<div className="html5-player-title">{videos[3 * i].videoArea}</div>}
                                    />
                                    <div className="item-footer">
                                        <div className="footer-left">Camera：{videos[3 * i]['videoCode']}</div>
                                        <div className="footer-right" onClick={() => this.handleClick(videos[3 * i])}>
                                            <Icon type="arrows-alt" theme="outlined" />全屏
                                    </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="item">
                            {videos && videos[3 * i + 1] && videos[3 * i + 1]['liveUrl'] &&
                                <React.Fragment>
                                    <Html5Player
                                        flvConfig={{ enableWorker: true }}
                                        width="100%"
                                        height="100%"
                                        file={videos[3 * i + 1]['liveUrl']}
                                        autoplay={true}
                                        controls={false}
                                        stretching="exactfit"
                                    />
                                    <div className="item-footer">
                                        <div className="footer-left">Camera：{videos[3 * i + 1]['videoCode']}</div>
                                        <div className="footer-right" onClick={() => this.handleClick(videos[3 * i + 1])}>
                                            <Icon type="arrows-alt" theme="outlined" />全屏
                                    </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="item">
                            {videos && videos[3 * i + 2] && videos[3 * i + 2]['liveUrl'] &&
                                <React.Fragment>
                                    <Html5Player
                                        flvConfig={{ enableWorker: true }}
                                        width="100%"
                                        height="100%"
                                        file={videos[3 * i + 2]['liveUrl']}
                                        autoplay={true}
                                        controls={false}
                                        stretching="exactfit"
                                    />
                                    <div className="item-footer">
                                        <div className="footer-left">Camera：{videos[3 * i + 2]['videoCode']}</div>
                                        <div className="footer-right" onClick={() => this.handleClick(videos[3 * i + 2])}>
                                            <Icon type="arrows-alt" theme="outlined" />全屏
                                    </div>
                                    </div>
                                </React.Fragment>
                            }

                        </div>
                    </Col>
                </Row>
            )
        }
        return (
            <React.Fragment>
                {html}
            </React.Fragment>
        );

    }

    handleCloseClick = () => {
        this.props.history.go(-1);
    }
    render() {
        const { videoList } = this.props.camera;
        const { time } = this.state;
        const videos = videoList[0] && videoList[0].videos;
        let num = 9, row = 3;
        if (videos) {
            num = videos.length < num ? num : videos.length;
            row = Number.isInteger(num / 3) ? num / 3 : Math.floor(num / 3) + 1;
        }
        return (
            <div id="video-list">
                <div className="video-header">
                    <div>
                        <img src={require('@/images/video_default.png')} alt="" /> <span className="title"></span>
                    </div>
                    <div className="video-title">
                        {time}
                    </div>
                    <div className="video-right" onClick={this.handleCloseClick}>
                        <Icon type="shrink" theme="outlined" /> 缩小窗口
                    </div>
                </div>
                {this.itemRender(row, videos)}
            </div>
        )
    }
}


export default VideoList;