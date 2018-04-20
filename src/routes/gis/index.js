import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, AutoComplete } from 'antd'
import MapChart from './components/MapChart'
import styles from './style.less'


const Gis = ({ gis, dispatch }) => {
  const dataSource = ['设备1', '设备2', '设备3', '设备4']
  const handleSearch = value => {
    console.log(value)
  }
  const onSelect = value => {
    console.log(value)
  }

  return (
    <div>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <AutoComplete
            dataSource={dataSource}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={handleSearch}
            placeholder="请输入设备关键字"
          />
        </Col>
      </Row>
      <Row className={styles.main}>
        <Col span={18}>
          <MapChart />
        </Col>
        <Col span={6}>
          <h3>设备信息</h3>
        </Col>
      </Row>
    </div>
  )
}

Gis.propTypes = {
  gis: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ gis }) => ({ gis }))(Gis)
