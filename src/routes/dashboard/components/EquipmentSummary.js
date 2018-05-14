import React from 'react'
import PropTypes from 'prop-types'
import styles from '../style.less'
import { Card } from 'antd'

const EquipmentSummary = ({ dashboard }) => {

  return (
    <Card title="设备信息汇总">
      <div className={styles.summaryWrapper}>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备总数</p>
          <p className={styles.number}>58</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备在线数</p>
          <p className={styles.number}>18</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备故障数</p>
          <p className={styles.number}>58</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备在线率</p>
          <p className={styles.number}>58</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备平均温度</p>
          <p className={styles.number}>58</p>
        </div>
        <div className={styles.item}>
          <p className={styles.summaryTitle}>设备平均湿度</p>
          <p className={styles.number}>58</p>
        </div>
      </div>
    </Card>
  )
}


EquipmentSummary.propTypes = {
  dashboard: PropTypes.object,
}


export default EquipmentSummary