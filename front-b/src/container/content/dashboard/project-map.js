import React, {Component} from 'react';
import {Modal, Input, notification} from 'antd';
import BMap from 'BMap';

import './dashboard.less';

// 地图
class BaiduMap extends Component {
  constructor(props) {
      super(props);
      this.state = {
          visible: false
      };
      this.search = '';
  }
  componentDidUpdate() {
      const {
          visible,
          city
      } = this.props.dataSource;
      if (visible === true) {
          setTimeout(() => {
              var map = new BMap.Map('proMap'); // 创建Map实例

              //var point = new BMap.Point(104.0712219292,30.5763307666);
              const cityAndCounty = city.length > 1 ? `${city[0]}${city[1]}` : city[0];
              map.centerAndZoom(cityAndCounty, 12);
              this.getBoundary(cityAndCounty, map);

              var geolocation = new BMap.Geolocation();
              geolocation.getCurrentPosition(
                  function (r) {
                      if (this.getStatus() === 'BMAP_STATUS_SUCCESS') {
                          //以指定的经度与纬度创建一个坐标点
                          var pt = new BMap.Point(r.point.lng, r.point.lat);
                          map.centerAndZoom(pt, 12);
                      } else {
                          //   notification.error({
                          //       key:'1',
                          //       message: '定位失败',
                          //       description: '当前位置定位失败',
                          //   });
                      }
                  }, {
                      enableHighAccuracy: true
                  }
              ); //指示浏览器获取高精度的位置，默认false

              map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
              // map.disableDragging ();
              // 检索地点
              const local = new BMap.LocalSearch(map, {
                  renderOptions: {
                      map: map
                  },
              });
              local.search(this.search);
              // 点击事件
              map.addEventListener('click', e => {
                  const pt = e.point;
                  let _this = this;
                  //创建一个地理位置解析器
                  const geoc = new BMap.Geocoder();



                  geoc.getLocation(pt, function (rs) {
                      const addComp = rs.addressComponents;
                      const baiduCityAndCounty = city.length > 1 ? `${addComp.city}${addComp.district}` : addComp.city;
                      if (cityAndCounty === baiduCityAndCounty) {
                          _this.props.handleShow({
                              lat: e.point.lat,
                              lng: e.point.lng,
                              address: addComp.district + addComp.street + addComp.streetNumber,
                          });
                      } else {
                          notification.error({
                              key: '1',
                              message: '选取失败',
                              description: '请在红线框区域内选择项目位置',
                          });
                          _this.props.handleShow({
                              lat: '',
                              lng: '',
                              address: '',
                          }, true);
                      }
                  });
              });
          }, 0);
      }
  }

  getBoundary(city, map) {
      var bdary = new BMap.Boundary();
      bdary.get(city, function (rs) {
          //获取行政区域
          map.clearOverlays(); //清除地图覆盖物
          var count = rs.boundaries.length; //行政区域的点有多少个
          if (count === 0) {
              alert('未能获取当前输入行政区域');
              return;
          }
          var pointArray = [];
          for (var i = 0; i < count; i++) {
              var ply = new BMap.Polygon(rs.boundaries[i], {
                  strokeWeight: 2,
                  strokeColor: 'red',
                  fillOpacity: 0.01,
              }); //建立多边形覆盖物
              map.addOverlay(ply); //添加覆盖物
              pointArray = pointArray.concat(ply.getPath());
          }
      });
  }

    render () {
        return (
            <div>
            <Modal
                title="详细地址"
                width={700}
                visible={this.props.dataSource.visible}
                footer={null}
                onCancel={this.handleCancel}
            >
                <Input placeholder="请输入关键字搜索定位" onChange={this.handleSearch} />
                <div
                id="proMap"
                style={{width: '100%', height: '400px', marginTop: '20px'}}
                />
            </Modal>

            </div>
        );
    }

    handleCancel = e => {
        this.props.handleShow();
    };
    handleSearch = e => {
        this.search = e.target.value;
    };
}
export default BaiduMap;
