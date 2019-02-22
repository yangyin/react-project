import React from 'react';
import { Card, Checkbox, Button} from 'antd';

class CommonPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isAllChecked: this.changeCheckStatus(this.props.jurList),
            isSave:true
        }
    }
    /**
     *修改全选按钮的状态
     * @memberof CommonPage
     */
    changeCheckStatus = (data) => {
        let datas =[];
        data.forEach(f =>  {
            let arr = f['childList'].filter(v => v['isSelected'] === '0');
            if(arr.length >0) {
                datas.push(arr);
            }
        });
        return datas.length === 0 ? true : false;
    }

    /**
     *点击每一项的checkbox
     *
     * @memberof CommonPage
     */
    checkboxChange = (e) => {
        const {parentId, permissionId,checked} = e.target;
        if(parentId === 'all') {
            this.props.updateListChecked({parentId, permissionId:checked});
            this.setState({
                isSave:false,
                isAllChecked:checked
            })
        } else {
            this.props.updateListChecked({parentId, permissionId});
            this.setState({
                isSave:false
            })
            
        }
        
    }

    /**
     *数据改变时，控制全选按钮是否选中
     *
     * @param {*} prevProps
     * @memberof CommonPage
     */
    componentDidUpdate(prevProps) {
        const { jurList } = this.props;
        if(jurList.length >0 ) {
            this.setState({
                isAllChecked:this.changeCheckStatus(jurList)
            })
        }
    }

    save =() => {
        this.props.save();
    }

    render() {
        const { jurList } = this.props;
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Checkbox checked={this.state.isAllChecked} style={{ margin: 10 }} onChange={this.checkboxChange} parentId="all" permissionId="all" >全选/取消全选</Checkbox>
                    <Button type="primary" disabled={this.state.isSave} onClick={this.save}>保存</Button>
                </div>
                {
                    jurList.map(f => (
                        <Card key={f['parentId']} title={f['parentPerName']}>
                            {
                                f['childList'].map(v => (
                                    <div key={v.permissionId} style={{ marginBottom: 10 }}>
                                        <Checkbox checked={parseInt(v.isSelected)} onChange={this.checkboxChange} permissionId={v.permissionId} parentId={v.parentId}>{v.permissionName}</Checkbox>
                                        <label style={{ color: '#999', fontSize: 12 }}>{v.description}</label>
                                    </div>
                                ))
                            }
                        </Card>
                    ))
                }
            </div>
        )
    }
}


export default CommonPage;