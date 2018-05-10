import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import styles from '../style.less'

const Two = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: '二路风扇状态'
    },
    tooltip: {},
    legend: {
      data:['展开', '未展开'],
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
      name: '展开',
      type: 'bar',
      data: [5, 20, 36, 10, 30, 12, 28]
    }, {
      name: '未展开',
      type: 'bar',
      data: [10, 20, 16, 20, 30, 9, 10]
    }]
  })

  return (
    <ReactEcharts
      option={getOption()}
      className={styles.echart}
      opts={{ renderer: 'svg' }}/>
  )
}


Two.propTypes = {
  dashboard: PropTypes.object,
}


export default Two