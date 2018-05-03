import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import { connect } from 'dva'

import ReportTable from './components/ReportTable'
import ReportForm from './components/ReportForm'

import styles from './style.less'

const Report = ({ report, dispatch }) => {

  return (
    <div style={{ width: '100%' }}>
      <Row className={styles.searchWrapper}>
        <ReportForm dispatch={dispatch} report={report}/>
      </Row>
      <Row className={styles.tableWrapper}>
        <ReportTable dispatch={dispatch} report={report}/>
      </Row>
    </div>
  )
}

Report.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ report }) => ({ report }))(Report)
