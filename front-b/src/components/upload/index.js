import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal, notification } from 'antd';
import axios from 'axios';
import { createSelector } from 'reselect';

const picSelector = createSelector(
    state => state,
    state => {
        let arr = [];
        arr = state.map((v, i) => {
            v.uid = i;
            return v;
        })
        return arr;
    }
)

class UploadComp extends React.Component {
    static defaultProps = {
        planPic: []
    }

    state = {
        previewVisible: false,
        previewImage: ''
    };
    beforeUpload = (formData) => {
        axios.post('sdpbusiness/upload/uploadFile2', formData)
            .then(res => {
                this.props.uploadSuccess([{ url: res.data.content.file }]);
            })
            .catch(e => {
                notification.error({
                    key: '1',
                    message: '提示',
                    description: '上传失败',
                });
            })

    }
    uploadProps = {
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: "picture-card",
        onRemove: (file) => {
            //删除功能
            const { url } = file;
            const { type } = this.props;
            if(!type) return false;
        
            axios.post('sdpbusiness/dictionaries/deleteFile', {type,fileUrl:url})
                .then(res => {
                    let type = 'success';
                    const { data } = res;
                    if(data && data.success === true ) {
                        type = 'success';
                        this.props.removeFileImg(url);
                    } else {
                        type = 'error';
                    }
                    notification[type]({
                        key: '1',
                        message: '提示',
                        description: data.message,
                    });
                    
                })
                .catch(e => {
                    console.log(e)
                    // notification.error({
                    //     key: '1',
                    //     message: '提示',
                    //     description: '图片删除失败',
                    // });
                })
            // this.props.removeFileImg(url);
            return false;
        },
        beforeUpload: (file) => {
            const formData = new FormData();
            formData.append('files[]', file);
            this.beforeUpload(formData);
            return false;
        },
        onPreview: (file) => {
            // console.log(file)
            this.setState({
                previewImage: file.url,
                previewVisible: true,
            });
        }
    }
    handleCancel = () => this.setState({ previewVisible: false });
    uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
        </div>
    );
    render() {
        const { previewVisible, previewImage } = this.state;
        const { maxlength } = this.props;
        const planPic = picSelector(this.props.planPic);
        return (
            <div className="clearfix">
                <Upload {...this.uploadProps} fileList={planPic}>
                    {planPic.length >= maxlength ? null : this.uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

UploadComp.propTypes = {
    planPic: PropTypes.array,
    maxlength: PropTypes.number.isRequired,
    uploadSuccess: PropTypes.func.isRequired,
    removeFileImg: PropTypes.func,
    type:PropTypes.string,
}

export default UploadComp;