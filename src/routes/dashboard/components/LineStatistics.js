import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
// import Empty from './Empty'

const LineStatistics = ({ dashboard }) => {

  const timeIdList = dashboard.timeIdList;
  const onlineNumList = dashboard.onlineNumList;
  const offlineNumList = dashboard.offlineNumList
  const alarmNumList = dashboard.alarmNumList;

  const getOption = () => ({
    title: {
      text: '折线图堆叠'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:['在线设备','离线设备','预警设备']
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
      data: timeIdList
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'在线设备',
        type:'line',
        stack: '总量',
        data:onlineNumList
      },
      {
        name:'离线设备',
        type:'line',
        stack: '总量',
        data:offlineNumList
      },
      {
        name:'预警设备',
        type:'line',
        stack: '总量',
        data:alarmNumList
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
