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
        axios.post('sdpprevail/upload/uploadFile2', formData)
            .then(res => {
               const {keyIndex}=this.props;
                this.props.uploadSuccess([{ url: res.data.content.file }],keyIndex);
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
        
        // listType: "text",
        onRemove: (file) => {
            //删除功能
            const { url } = file;
            const { type, ids } = this.props;
            if (!type) return false;
            axios.post('sdpprevail/dictionaries/deleteFile', { id: ids, type, fileUrl: url })
                .then(res => {
                    let type = 'success';
                    const { data } = res;
                    if (data && data.success === true) {
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
    render () {
        const { previewVisible, previewImage } = this.state;
        const { maxlength } = this.props;
        const planPic = picSelector(this.props.planPic);
        const { uploadType } = this.props; // 1 ico样式
    
        return (
            uploadType === 1 ?
                <div className="clearfix">
                    <Upload {...this.uploadProps} fileList={[]} listType="text">
                        <Icon type="upload" />
                    </Upload>
                </div> :
                <div className="clearfix">
                    <Upload {...this.uploadProps} fileList={planPic} listType="picture-card">
                        {planPic.length >= maxlength ? null : this.uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>

            // <div className="clearfix">
            //     <Upload {...this.uploadProps} fileList={[]}>
            //         <Icon type="upload" />
            //     </Upload>
            // </div>

        )
    }
}

UploadComp.propTypes = {
    planPic: PropTypes.array,
    maxlength: PropTypes.number.isRequired,
    uploadSuccess: PropTypes.func.isRequired,
    removeFileImg: PropTypes.func,
    type: PropTypes.string,
    id: PropTypes.string
}

export default UploadComp;