import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import MapChart from './components/MapChart'
import WarningChart from './components/WarningChart'
import PieChart from './components/PieChart'

const Dashboard = ({
  dashboard,
}) => {

  return (
    <Row gutter={16} style={{ marginTop: '30px' }}>
      <Col span="6">
        <WarningChart dashboard={dashboard} />
      </Col>
      <Col span="12">
        <MapChart dashboard={dashboard} />
      </Col>
      <Col span="6">
        <PieChart dashboard={dashboard} />
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
