import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import styles from '../style.less'

const Tilt = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: '设备倾斜统计'
    },
    tooltip: {},
    legend: {
      data:['倾斜', '未倾斜'],
      bottom: 0,
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {},
    series: [{
      name: '倾斜',
      type: 'bar',
      data: [5, 20, 36, 10, 20, 32, 25],
    }, {
      name: '未倾斜',
      type: 'bar',
      data: [15, 20, 16, 20, 20, 32, 25],
    }]
  })

  return (
    <ReactEcharts
      option={getOption()}
      className={styles.echart}
      opts={{ renderer: 'svg' }}/>
  )
}


Tilt.propTypes = {
  dashboard: PropTypes.object,
}


export default Tilt