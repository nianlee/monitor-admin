import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import MapChart from './components/MapChart'
import WarningChart from './components/WarningChart'
import PieChart from './components/PieChart'

const Dashboard = ({
  app,
}) => {

  return (
    <Row gutter={16} style={{ marginTop: '30px' }}>
      <Col span="6">
        <WarningChart app={app} />
      </Col>
      <Col span="12">
        <MapChart app={app} />
      </Col>
      <Col span="6">
        <PieChart app={app} />
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(Dashboard)
