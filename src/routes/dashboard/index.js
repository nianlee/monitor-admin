import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'
// import MapChart from './components/MapChart'
import OnlineRate from './components/OnlineRate'
import EquipmentTemperature from './components/EquipmentTemperature'
import EquipmentHumidity from './components/EquipmentHumidity'
import Two from './components/Two'
import Six from './components/Six'
import One from './components/One'
import Tilt from './components/Tilt'
import Soaking from './components/Soaking'
import styles from './style.less'

const Dashboard = ({
  dashboard,
}) => {
  return (<div>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="8" className={styles.block}>
        <OnlineRate dashboard={dashboard} title="在线率"/>
      </Col>
      <Col span="8" className={styles.block}>
        <EquipmentTemperature dashboard={dashboard} />
      </Col>
      <Col span="8" className={styles.block}>
        <EquipmentHumidity dashboard={dashboard} />
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="8" className={styles.block}>
        <Two dashboard={dashboard} />
      </Col>
      <Col span="8" className={styles.block}>
        <Six dashboard={dashboard} />
      </Col>
      <Col span="8" className={styles.block}>
        <One dashboard={dashboard} />
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="8" className={styles.block}>
        <Tilt dashboard={dashboard} />
      </Col>
      <Col span="8">
        <Soaking dashboard={dashboard} />
      </Col>
    </Row>
  </div>)
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
