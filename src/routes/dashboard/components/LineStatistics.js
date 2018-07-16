import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
// import Empty from './Empty'

const LineStatistics = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: '折线图堆叠'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:['正常设备','异常设备','离线设备']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'正常设备',
        type:'line',
        stack: '总量',
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'异常设备',
        type:'line',
        stack: '总量',
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'离线设备',
        type:'line',
        stack: '总量',
        data:[150, 232, 201, 154, 190, 330, 410]
      },
    ]
  })

  return <div>
    <ReactEcharts
      option={getOption()}
      style={{height: '500px', width: '100%'}}
      opts={{ renderer: 'svg' }}
    />
  </div>
}

LineStatistics.propTypes = {
  dashboard: PropTypes.object,
}

export default LineStatistics
