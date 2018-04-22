import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Input } from 'antd'
import EquipmentMap from './components/EquipmentMap'
import Detail from './components/Detail'
import styles from './style.less'

const Search = Input.Search

const Gis = ({ gis, dispatch }) => {
  const handleSearch = value => {
    console.log(value)
    dispatch({
      type: 'gis/queryDeviceSelective',
      payload: {
        sn : value,
      }
    })
  }

  return (
    <div>
      <Row gutter={24} style={{ backgroundColor: '#fff' }}>
        <Col style={{ textAlign: 'center' }}>
          <Search 
            className={styles.search}
            placeholder="请输入设备编号(11-22-33-44-55)" 
            enterButton="Search" 
            size="large" 
            onSearch={handleSearch}
          />
        </Col>
      </Row>
      <Row gutter={24} className={styles.main}>
        <Col span={18} className={styles.map}>
          <EquipmentMap gis={gis} />
        </Col>
        <Col span={6}>
          <Detail gis={gis} dispatch={dispatch}/>
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
