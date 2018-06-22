import React from 'react'
import PropTypes from 'prop-types'
import styles from '../style.less'
import { Card } from 'antd'

const EquipmentSummary = ({ dashboard }) => {

  return (
    <Card title="设备信息汇总" style={{'backgroundColor': '#192c3e'}}>
      <div className={styles.summaryWrapper}>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备总数</p>
          <p className={styles.number}>{dashboard.TotalCount}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备在线数</p>
          <p className={styles.number}>{dashboard.OnlineCount}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备故障数</p>
          <p className={styles.number}>{dashboard.AlarmCount}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备在线率</p>
          <p className={styles.number}>{dashboard.OnlineRate*100}%</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备离线率</p>
          <p className={styles.number}>{dashboard.OfflineRate*100}%</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备故障率</p>
          <p className={styles.number}>{dashboard.AlarmRate*100}%</p>
        </div>
      </div>
    </Card>
  )
}


EquipmentSummary.propTypes = {
  dashboard: PropTypes.object,
}


export default EquipmentSummary
