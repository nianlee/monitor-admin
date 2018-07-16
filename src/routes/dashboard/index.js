import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { connect } from 'dva'
//import EquipmentSummary from './components/EquipmentSummary'
import PieStatistics from './components/PieStatistics' //eslint-disable-line
import Alarm from './components/Alarm'
import Offline from './components/Offline'
import CqMap from './components/CqMap'
import SixPieStatistics from './components/SixPieStatistics'
import styles from './style.less'
import LineStatistics from './components/LineStatistics'

const Dashboard = ({ dashboard, dispatch }) => {

  const childProps = { dashboard, dispatch }

  return (<div className="dashboard">
    <Row gutter={24} style={{ marginTop: '30px'}}>
      <Col className={styles.colbg}>
        <SixPieStatistics {...childProps} />
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="12">
        <Card title="设备概况">
          <CqMap/>
        </Card>
      </Col>
      <Col span="12">
        <Card title="本日设备运行情况">
          <LineStatistics {...childProps} />
        </Card>
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="12">
        <Alarm {...childProps} />
      </Col>
      <Col span="12">
        <Offline {...childProps} />
      </Col>
    </Row>
  </div>)
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
