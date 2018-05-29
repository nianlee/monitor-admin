import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { connect } from 'dva'
import EquipmentSummary from './components/EquipmentSummary'
import Online from './components/Online'
import Fault from './components/Fault'
import PieStatistics from './components/PieStatistics'
// import Two from './components/Two'
// import Six from './components/Six'
// import One from './components/One'
// import Tilt from './components/Tilt'
// import Soaking from './components/Soaking'
// import styles from './style.less'

const Dashboard = ({ dashboard, dispatch }) => {

  const childProps = { dashboard, dispatch }

  return (<div className="dashboard">
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
        <Card title="本日设备运行情况">
          <PieStatistics {...childProps} />
        </Card>
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="12">
        <Online {...childProps} />
      </Col>
      <Col span="12">
        <Fault {...childProps} />
      </Col>
    </Row>
  </div>)
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
