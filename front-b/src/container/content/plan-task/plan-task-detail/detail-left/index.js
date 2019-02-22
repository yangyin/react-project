import React, { PureComponent } from 'react';
import { List,Pagination  } from 'antd';

import Utils from './../../../../../utils/utils';





class PlanTaskDetailLeftPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const { data } = this.props;
        if(data &&data.rows) {
            this.setRowsData(data);
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log('next****',nextProps.data);
        // console.log('****',this.props.data);
        // console.log(JSON.stringify(nextProps.data) != JSON.stringify(this.props.data) )
        if( JSON.stringify(nextProps.data) != JSON.stringify(this.props.data) ) {
            this.setRowsData(nextProps.data);
        }
    }
    setRowsData = (data) => {
        let { rows } = data;
        this.setState(() => (
            {
                pagination:Utils.pagination(data,(current) =>{
                        this.props.handleCurrent(current);
                }),
                rows: rows.map((v,i) =>{
                    i === 0?v.active=true:v.active=false;
                    return v;
                })
            }
        ))
    }
    handleListItem = (item,index) => {
        if(item.active === true) return;
        this.props.activeItem(item,index);
        this.setState((prevState) => ({
            rows:prevState.rows.map((v,i) =>{
                i === index?v.active=true:v.active=false;
                return v;
            })
        }))
    }

    render() {
        const { rows } = this.state;
        return (
            <div>
                <List
                    className="demo-loadmore-list"
                    locale={{emptyText :'暂无数据'}}
                    size="small"
                    itemLayout="horizontal"
                    dataSource={rows && rows}
                    renderItem={ (v,i) => (
                        <List.Item key={v.id} onClick={()=>this.handleListItem(v,i)} className={v.active===true?"active":null } >
                            <List.Item.Meta
                                title={v.taskNo}
                                description={v.taskName}
                            />
                        </List.Item>
                    )}
                />
                <Pagination className="pagination" size="small" {...this.state.pagination} />  
            </div>
        )
    }
}

export default PlanTaskDetailLeftPage;