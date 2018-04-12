import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'

const Monitor = ({
                     app,
                   }) => {

  return (
    <Row gutter={16} style={{ marginTop: '30px' }}>
      <Col span="6">
        <button>mybutton</button>
      </Col>
      <Col span="12">
        <button>mybutton</button>
      </Col>
      <Col span="6">
        <button>mybutton</button>
      </Col>
    </Row>
  )
}

Monitor.propTypes = {
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(Monitor)
