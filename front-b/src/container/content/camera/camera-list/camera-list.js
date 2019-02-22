import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import Utils from '@/utils/utils';
import Panel from '../../../../components/panel/panel';
import { Unauthorized } from './../../../error-page/not-found-page';

import { getCameraList,cameraDelete,cameraDeleteStatus } from './../store/actions';
const panelData = {title: '监控管理'}


@connect(
    state=>({
        camera:state.camera,
        topbar:state.topbar
    }),
    { getCameraList,cameraDelete,cameraDeleteStatus }
)
class CameraList extends React.Component {
    // constructor(props) {
        // super(props);

        columns = [
            { title: '设备编码', dataIndex: 'videoCode', align: 'center' },
            { title: '设备UUID', dataIndex: 'videoUuid', align: 'center' },
            { title: '应用项目', dataIndex: 'proName', align: 'center' },
            { title: '设备安装位置', dataIndex: 'videoArea', align: 'center' },
            { title: '注册时间', dataIndex: 'createTime', align: 'center' },
            { title: '设备状态', dataIndex: 'videoState', align: 'center',render:(text) => {
                if(text === 'A') {
                    return '失联';
                } else if(text === 'B') {
                    return <span style={{color:'green'}}>正常</span>;
                }
            } },
            // { title: '操作', key: 'action', align: 'center', render: (text, record) => (record['videoState'] === 'A' &&<a href="javascript:;" onClick={() => this.handleDelect(record)}>删除</a>)}
        ];
        params = {
            pageNum: 1,
            pageSize: 10,
        }
        state = {
            type:''
        }
    // }
    /**
     * 删除
     */
    handleDelect = ({videoId}) => {
        this.props.cameraDelete(videoId);
    }
    componentDidMount() {
        console.log(this.props)
        const { proId } = this.props.topbar;
        const { pathname } = this.props.location;
        const type = pathname.charAt(pathname.length -1);
        this.setState({ type })
        if(proId) {
            this.props.getCameraList({proId,type});
        }
    }
    componentDidUpdate(prevProps) {
        const prevProId = prevProps.topbar.proId;
        const { proId ,isCameraDelete} = this.props.topbar;
        if(prevProId !== proId) {
            this.props.getCameraList({ proId,type:this.state.type });
        }
        /**
         * 删除后，刷新页面
         */
        if(isCameraDelete === true) {
            this.props.cameraDeleteStatus(false);
            this.props.getCameraList({ proId , type:this.state.type });
        }
    }
    render() {
        const {cameraList,isJurisdiction} = this.props.camera;
        const { type } = this.state;
        const colums = [];
        if(type !== '1') {
            
        }
        return (
            <div>
                {isJurisdiction !== true ? <React.Fragment>
                    <Panel panelData={panelData} />
                    <Table 
                        rowKey="videoId"
                        style={{ background: '#fff',padding:24 }}
                        columns={type === '1' ?this.columns:this.columns.slice(0,5)}
                        dataSource={cameraList}
                        locale = {{emptyText:'暂无数据'}}
                        pagination={
                            Utils.pagination({ ...cameraList, pageNum: this.params.pageNum }, (current) => {
                                this.params.pageNum = current;
                                this.request();
                            })
                        }
                    />
                </React.Fragment> : <Unauthorized />}
            </div>
        )
    }
}


export default CameraList;