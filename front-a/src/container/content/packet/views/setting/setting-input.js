import React, { PureComponent } from 'react';
import { Input, Col, Row } from 'antd';



class SettingInput extends PureComponent {

    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }
    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            commission: value.commission,
            promotionNumber: value.promotionNumber,
            commissionSectionId: value.commissionSectionId,
            disabled: props.disabled
        }
        this.proNumChange = this.proNumChange.bind(this);
        this.commissionChange = this.commissionChange.bind(this);
        this.proNumBlur = this.proNumBlur.bind(this);
    }

    //推广人数 更改
    proNumChange = (e) => {
        const promotionNumber = parseInt(e.target.value);
        if (Number.isNaN(promotionNumber)) {
            this.setState({ promotionNumber: 0 });
            this.triggerChange({ promotionNumber: 0 });
        } else {

            // const { data } = this.props;
            // let len = data.filter(v => v.promotionNumber === promotionNumber && v.commissionSectionId !== e.target.id).length;
            // if(len >0) {
            //     return notification['warning']({
            //         message:'提示',
            //         description:'不能存在相同区间',
            //         duration:1
            //     })
            // }
            this.setState({ promotionNumber });
            this.triggerChange({ promotionNumber });
        }
    }
    proNumBlur = (e) => {
        const promotionNumber = parseInt(e.target.value);
        if (!(Number.isNaN(promotionNumber))) {
            if (promotionNumber === 0) {
                return this.props.delete(e.target.id);
            }
        }
    }
    commissionChange = (e) => {
        const commission = parseInt(e.target.value || 0);

        if (Number.isNaN(commission)) {
            this.setState({ commission: 0 });
            this.triggerChange({ commission: 0 });
        } else {
            this.setState({ commission });
            this.triggerChange({ commission });
        }


    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    render() {
        const { commissionSectionId, commission, promotionNumber, disabled } = this.state;

        return (
            <Row gutter={24}>
                <Col span={6}>
                    <Input
                        defaultValue={promotionNumber}
                        onChange={this.proNumChange}
                        onBlur={this.proNumBlur}
                        id={commissionSectionId}
                        disabled={disabled}
                    />
                </Col>
                <Col span={6} >
                    <Input
                        defaultValue={commission}
                        onChange={this.commissionChange}

                    />
                    {/* <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        id={commissionSectionId}
                    /> */}
                </Col>
            </Row>
        );
    }
}

export default SettingInput;