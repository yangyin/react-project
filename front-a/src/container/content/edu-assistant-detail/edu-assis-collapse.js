import React, { PureComponent } from 'react';
import { Avatar, Tag,Popconfirm, Row, Col, Collapse } from 'antd';
import { connect } from 'react-redux';


import './edu-assistant.less';
import Utils from '@/utils/utils';


const Panel = Collapse.Panel;

/**
 * 教育助手详情 题库list面板
 */


class EduAssisCollapse extends PureComponent {
    changePopConfirm=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    delete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.deleteList(e, id);
    }
    cancelPop=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    render () {
        const listeducationList = this.props.collapseData;
        return (
            <div className="question_list">

                <Collapse accordion>
                    {listeducationList.map((item, i) => {
                        return (
                            <Panel
                                header={
                                    <div>
                                        <Row>
                                            <Col span={4}>
                                                <span className="blue">#{item.answerNo}</span>
                                            </Col>
                                            <Col span={5}>
                                                题型：{item.answerType === 1 ? '单选' : item.answerType === 0 ? '多选' : '阅读'}
                                            </Col>
                                            <Col span={5}>难度值：{item.difficulty}</Col>
                                            <Col span={6}>
                                                解析：
                                {!item.analysisContent
                                                    ? '未录'
                                                    : `( ${item.analysisContent.substring(0, 15)} )`}
                                            </Col>
                                            <Col span={4}>
                                                <Popconfirm onCancel={this.cancelPop} onClick={this.changePopConfirm} className='colorBlue' title="确认剔除该条数据?" onConfirm={e => this.delete(e, item.anserId)}>
                                                    剔除
                                                </Popconfirm>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                key={item.anserId}
                            >
                                <div>
                                    <p>题干：{item.answerStem}</p>
                                    <Row className="answerList">
                                        {item.answerOption
                                            ? Utils.jsonToMap(
                                                item.answerOption
                                            ).map((answer, m) => {
                                                let colNode = '';
                                                if (!Utils.checkIsImg(answer.value)) {
                                                    colNode = (
                                                        <Col span={12} key={m}>
                                                            {answer.key}. {answer.value}
                                                        </Col>
                                                    );
                                                } else {
                                                    colNode = (
                                                        <Col span={12} key={m}>
                                                            {answer.key}.{' '}
                                                            <Avatar
                                                                shape="square"
                                                                size={100}
                                                                icon="user"
                                                                src={answer.value}
                                                            />
                                                        </Col>
                                                    );
                                                }
                                                return colNode;
                                            })
                                            : null}
                                    </Row>
                                    <p>
                                        正确答案：{item.answer ? item.answer.split('#DYQ$').join(',') : null}
                                    </p>
                                    <p>解析：{!item.analysisContent ? '未录'
                                        : item.analysisContent}
                                    </p>
                                    <Row>
                                        <Col span={12}>
                                            标签：{item.labels ? item.labels.map((subitem, j) => {
                                                return (
                                                    <Tag color="blue" key={j}>
                                                        {subitem.name}
                                                    </Tag>
                                                );
                                            })
                                                : null}
                                        </Col>
                                        <Col span={12}>
                                            考点：{item.examinationPoints ? item.examinationPoints.map((subitem, j) => {
                                                return (
                                                    <Tag color="blue" key={j}>
                                                        {subitem.name}
                                                    </Tag>
                                                );
                                            })
                                                : null}
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        );
                    })
                    }
                </Collapse>


            </div>
        );
    }
}


export default EduAssisCollapse;






