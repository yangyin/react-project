import React, {Component} from 'react';
import {Card} from 'antd';

import './topTitle.less';
/* const titleData = {
    titlename:'项目详情'
} */

class TopTitle extends Component {
  render () {
    return (
      <div id="topTitle">
        <p className="title">{this.props.titleData.titlename}</p>
      </div>
    );
  }
}
export default TopTitle;
