import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'
// import MapChart from './components/MapChart'
import OnlineRate from './components/OnlineRate'
import EquipmentTemperature from './components/EquipmentTemperature'
import EquipmentHumidity from './components/EquipmentHumidity'
import Two from './components/Two'
import styles from './style.less'

const Dashboard = ({
  dashboard,
}) => {
  return (<div>
    <Row gutter={16} style={{ marginTop: '30px' }}>
      <Col span="12" className={styles.block}>
        <OnlineRate dashboard={dashboard} title="在线率"/>
      </Col>
      <Col span="12" className={styles.block}>
        <EquipmentTemperature dashboard={dashboard} />
      </Col>
    </Row>

    <Row gutter={16} style={{ marginTop: '30px' }}>
      <Col span="12" className={styles.block}>
        <EquipmentHumidity dashboard={dashboard} />
      </Col>
      <Col span="12" className={styles.block}>
        <Two dashboard={dashboard} />
      </Col>
    </Row>
  </div>)
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
