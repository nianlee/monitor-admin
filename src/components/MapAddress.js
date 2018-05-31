import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'react-amap'
import { Select, Row, Col, Form } from 'antd'
import { regeo } from 'services/device'

import styles from './MapAddress.less'
import config from 'config'

const SelectOption = Select.Option
const FormItem = Form.Item

class MapAddress extends Component {
  constructor(props) {
    super(props)

    this.state = {
      langitude: '', // 经度
      latitude: '', // 纬度
    }

    this.events = {
      click: e => {
        regeo({
          key: config.AMAP_WEB_KEY,
          location: `${e.lnglat.lng},${e.lnglat.lat}`,
          extensions: 'all',
        })
        .then(res => {
          if (res.status === '1') {
            this.setState({
              address: res.regeocode.formatted_address
            })
          }
        })

        this.setState({
          langitude: e.lnglat.lng,
          latitude: e.lnglat.lat,
        })
      }
    }
  }

  render() {
    return <div style={this.props.style}>
      <div className={styles.maker}>
        <Form className="maker">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="选择区域">
                <Select style={{ width: '100%' }}>
                  <SelectOption key={1} value="渝北区">渝北区</SelectOption>
                  <SelectOption key={2} value="渝中区">渝中区</SelectOption>
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="左击获取位置">
                <span>位置：{this.state.address}</span>
                <span>经度：{this.state.langitude}&nbsp;纬度：{this.state.latitude}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <Map 
        amapkey={config.AMAP_KEY} 
        // center={markerPosition}
        // plugins={this.mapPlugins}
        zoom={12}
        events={this.events}
      >
        {/* <Marker position={markerPosition} /> */}
      </Map>
    </div>
  }
}

MapAddress.propTypes = {
  defaultCenter: PropTypes.string, // 默认中心
  centerDatas: PropTypes.array, // 地图中心 数据
  style: PropTypes.object, // 自定义样式
}

export default MapAddress
