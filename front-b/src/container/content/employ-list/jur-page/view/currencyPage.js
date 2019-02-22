import React from 'react';
import { connect } from 'react-redux';
import { Card,Tabs } from 'antd';

import CommonPage from './commonPage';


import {
    updateListChecked,
    saveJurList,
    updateStatus,
    getEmployCommonJurList
} from './../../store/action';




@connect(
    state => ({
        staff:state.staffManagerReducer
    }),
    { updateListChecked,saveJurList,updateStatus ,getEmployCommonJurList}
)
class CurrencyPage extends React.PureComponent {


    componentDidMount () {
        this.props.getEmployCommonJurList({type:1,userId:this.props.userId});
    }

    /**
     *改变checkbox值，更改
     *
     * @memberof CurrencyPage
     */
    updateListChecked = (params) => {
        this.props.updateListChecked(params);
    }

    //保存
    save = () => {
        this.props.saveJurList({
            type:1,
            userId:this.props.userId,
            list:JSON.stringify(this.props.staff.employJurList)
        })
    }

    componentDidUpdate() {
        const { isUpdate } = this.props.staff;

        if(isUpdate) {
            this.props.updateStatus(false);
            this.props.getEmployCommonJurList({type:1,userId:this.props.userId});
        }
    }

    render() {
        // console.log(this.props.staff)
        const { employJurList } = this.props.staff;
        return (
            <div>
                <p style={{fontSize:12}}>*项目通用权限：指该用户在所有项目下拥有的权限，如果该用户在某个项目下有不同的权限，可以尝试自定义权限！</p>
                {
                    employJurList.length >0 ? <CommonPage 
                                                jurList={employJurList} 
                                                updateListChecked={this.updateListChecked}
                                                save={this.save}
                                            /> : null
                }
            </div>
        )
    }
}


export default CurrencyPage;