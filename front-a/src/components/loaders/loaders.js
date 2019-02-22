import React from 'react';
import { Spin,Card } from 'antd';

class SpinComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tips:this.props.tip || '加载中...'
        }
    }

    render() {
        return <Card>
            <Spin tip={this.state.tips}/>
        </Card>
    }
}

export {
    SpinComp
}