import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Input } from 'antd'
import EquipmentMap from './components/EquipmentMap'
import Detail from './components/Detail'
import styles from './style.less'
import { dash } from '../../../public/image/chrome.jpg'

const Search = Input.Search

var divStyle = { //eslint-disable-line
  backgroundImage: `url(${dash})`,
};

const Gis = ({ gis, dispatch }) => {

  const handleSearch = value => {
    if(value.length > 0) {
      dispatch({
        type: 'gis/queryDeviceSelective',
        payload: {
          deviceSn: value,
        }
      })
    }
  }

  //{ backgroundColor: '#fff' }
  return (
    <div>
      <Row gutter={24} style={{backgroundColor: '#3b3b45'}}>
        <Col style={{ textAlign: 'center' }}>
          <Search
            className={styles.search}
            placeholder="请输入设备编号(11-22-33-44-55)"
            enterButton="搜索"
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
