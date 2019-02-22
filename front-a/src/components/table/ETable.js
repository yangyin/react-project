import React, { PureComponent } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';






import './index.less';






class ETable extends Component {

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.props.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => {
                    return {
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }},
            };
        });
        return (
            <Table
                {...this.props}
                style={{ margin: 24 }}
                columns={columns}
                dataSource={pgeList}
                pagination={false}
                components={components}
                rowClassName="editable-row"
            />
        );
    }
}





ATable.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array
};

ATable.defaultProps = {
    columns: [],
    dataSource: []
}
export default ETable;