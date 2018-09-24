import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map } from "react-amap";
import { Select, Row, Col, Form } from "antd";
import { regeo } from "services/device";

import styles from "./MapAddress.less";
import config from "config";

const SelectOption = Select.Option;
const FormItem = Form.Item;

class MapAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      langitude: "", // 经度
      latitude: "", // 纬度
      address: "", // 详细地址
      province: "", //省
      city: "", //市
      district: "", //区
      township: "", //街道，路，镇
      ins: null, // 地图实例

      adcode: "", //区code
      citycode: "", // 市code
      towncode: "" // 道，路，镇code
    };

    this.events = {
      created: ins => {
        if (this.props.defaultCenter) {
          ins.setCity(this.props.defaultCenter);
        }

        this.ins = ins;
      },
      // 地图点击事件
      click: e => {
        regeo({
          key: config.AMAP_WEB_KEY,
          location: `${e.lnglat.lng},${e.lnglat.lat}`,
          extensions: "all"
        })
          .then(res => {
            if (res.success) {
              if (res.data.regeocode.addressComponent.city == 0) {
                // 直辖市
                this.setState({
                  address: res.data.regeocode.formatted_address,
                  langitude: e.lnglat.lng,
                  latitude: e.lnglat.lat,
                  province: res.data.regeocode.addressComponent.province, //省
                  city: res.data.regeocode.addressComponent.province, //市
                  district: res.data.regeocode.addressComponent.district, //区
                  township: res.data.regeocode.addressComponent.township, //街道，路，镇

                  adcode: res.data.regeocode.addressComponent.adcode, //区code
                  citycode: res.data.regeocode.addressComponent.citycode, // 市code
                  towncode: res.data.regeocode.addressComponent.towncode // 道，路，镇code
                });

                this.triggerChange({
                  langitude: e.lnglat.lng,
                  latitude: e.lnglat.lat,
                  address: res.data.regeocode.formatted_address,

                  province: res.data.regeocode.addressComponent.province, //省
                  city: res.data.regeocode.addressComponent.province, //市
                  district: res.data.regeocode.addressComponent.district, //区
                  township: res.data.regeocode.addressComponent.township, //街道，路，镇

                  adcode: res.data.regeocode.addressComponent.adcode, //区code
                  citycode: res.data.regeocode.addressComponent.citycode, // 市code
                  towncode: res.data.regeocode.addressComponent.towncode // 道，路，镇code
                });
              } else {
                // 省
                this.setState({
                  address: res.data.regeocode.formatted_address,
                  langitude: e.lnglat.lng,
                  latitude: e.lnglat.lat,
                  province: res.data.regeocode.addressComponent.province, //省
                  city: res.data.regeocode.addressComponent.city, //市
                  district: res.data.regeocode.addressComponent.district, //区
                  township: res.data.regeocode.addressComponent.township, //街道，路，镇

                  adcode: res.data.regeocode.addressComponent.adcode, //区code
                  citycode: res.data.regeocode.addressComponent.citycode, // 市code
                  towncode: res.data.regeocode.addressComponent.towncode // 道，路，镇code
                });

                this.triggerChange({
                  langitude: e.lnglat.lng,
                  latitude: e.lnglat.lat,
                  address: res.data.regeocode.formatted_address,

                  province: res.data.regeocode.addressComponent.province, //省
                  city: res.data.regeocode.addressComponent.city, //市
                  district: res.data.regeocode.addressComponent.district, //区
                  township: res.data.regeocode.addressComponent.township, //街道，路，镇

                  adcode: res.data.regeocode.addressComponent.adcode, //区code
                  citycode: res.data.regeocode.addressComponent.citycode, // 市code
                  towncode: res.data.regeocode.addressComponent.towncode // 道，路，镇code
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  }

  centerChange(value) {
    this.ins.setCity(value);
    this.ins.setZoom(14);
  }

  triggerChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        <div className={styles.maker}>
          <Form className="maker">
            <Row gutter={24}>
              <Col span={10}>
                <FormItem label="选择区域">
                  <Select
                    style={{ width: "100%" }}
                    onChange={this.centerChange.bind(this)}
                    value={this.props.defaultCenter}
                  >
                    <SelectOption key={1} value="渝北区">
                      渝北区
                    </SelectOption>
                    <SelectOption key={2} value="渝中区">
                      渝中区
                    </SelectOption>
                  </Select>
                </FormItem>
              </Col>
              <Col span={14}>
                <FormItem>
                  <span className={styles.textOverflow}>
                    位置：
                    {this.state.address}
                  </span>
                  <span>
                    经度：
                    {this.state.langitude}
                    &nbsp;&nbsp;&nbsp;&nbsp;纬度：
                    {this.state.latitude}
                  </span>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <Map amapkey={config.AMAP_KEY} zoom={12} events={this.events} />
      </div>
    );
  }
}

MapAddress.propTypes = {
  defaultCenter: PropTypes.string, // 默认中心
  centerDatas: PropTypes.array, // 地图中心 数据
  style: PropTypes.object, // 自定义样式
  onChange: PropTypes.func // 传递选中的地址
};

export default MapAddress;
