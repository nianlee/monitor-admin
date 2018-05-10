import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import styles from '../style.less'

const EquipmentTemperature = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: '设备平均温度'
    },
    tooltip: {},
    // legend: {
    //   data:['设备平均温度'],
    //   bottom: 0,
    // },
    xAxis: {
      data: ['区域1', '区域2', '区域3', '区域4']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    yAxis: {},
    series: [{
      name: '设备平均温度',
      type: 'bar',
      data: [5, 20, 36, 10]
    }]
  })

  return (
    <ReactEcharts
      option={getOption()}
      className={styles.echart}
      opts={{ renderer: 'svg' }}/>
  )
}


EquipmentTemperature.propTypes = {
  dashboard: PropTypes.object,
}


export default EquipmentTemperature