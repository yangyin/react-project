import React from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import Html5Player from 'html5-player';

import 'html5-player/libs/assets/css/style.css';
import './video.less';

class VideoView extends React.Component {

    timer = null;
    constructor(props) {
        super(props);
        const { search } = this.props.location;
        let arr = search.split('&');
        let url = arr[0].split('=')[1];
        let title = decodeURI(arr[1].split('=')[1]);

        this.state = {
            time: '',
            url,
            title,
            isplayer: true
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(() => ({
                time: this.getTime()
            }))
        }, 1000);
    }
    componentWillUnmount() {
        this.timer = null;
    }
    getTime = () => {
        let year = moment().format('YYYY年MM月DD日');
        let d = moment().format('星期d');
        let h = moment().format('HH:mm:ss');

        return year + ' ' + d + ' ' + h;
    }
    handleClick = () => {
        this.props.history.go(-1);
    }
    render() {

        const { time, url, title } = this.state;
        // console.log(this.props)
        return (
            <div className="video-comp">
                <div className="video-header">
                    <div>
                        <img src={require('@/images/video_default.png')} alt="" /> <span className="title">{title}</span>
                    </div>
                    <div className="video-title">
                        {time}
                    </div>
                    <div className="video-right" onClick={this.handleClick}>
                        <Icon type="shrink" theme="outlined" /> 缩小窗口
                </div>
                </div>
                {
                    url && <Html5Player
                        flvConfig={{ enableWorker: true }}
                        width="100%"
                        height="90vh"
                        file={url}
                        autoplay={true}
                        controls={false}
                        stretching="exactfit"
                    />
                }
            </div>
        )
    }
}


export default VideoView;