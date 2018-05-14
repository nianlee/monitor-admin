import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { connect } from 'dva'
import EquipmentSummary from './components/EquipmentSummary'
// import OnlineRate from './components/OnlineRate'
// import EquipmentTemperature from './components/EquipmentTemperature'
// import EquipmentHumidity from './components/EquipmentHumidity'
// import Two from './components/Two'
// import Six from './components/Six'
// import One from './components/One'
// import Tilt from './components/Tilt'
// import Soaking from './components/Soaking'
// import styles from './style.less'

const Dashboard = ({
  dashboard,
}) => {
  return (<div>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col>
        <EquipmentSummary dashboard={dashboard} />
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="12">
        <Card title="警告排行" />
      </Col>
      <Col span="12">
        <Card title="本日设备运行情况" />
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="12">
        <Card title="在线设备列表" />
      </Col>
      <Col span="12">
        <Card title="故障设备列表" />
      </Col>
    </Row>
  </div>)
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
