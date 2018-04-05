import React from 'react'
import ReactEcharts from 'echarts-for-react'
import Block from 'components/Block'
import PropTypes from 'prop-types'

const WarningChart = ({ app }) => {
  const getOption = () => ({
    title: {
      text: '区域告警时刻数量排名'
    },
    tooltip: {},
    // legend: {
    //   data:['警告']
    // },
    xAxis: {
      data: ['区域1', '区域2', '区域3', '区域4']
    },
    yAxis: {},
    series: [{
      name: '警告',
      type: 'bar',
      data: [5, 20, 36, 10]
    }]
  })

  return (
    <Block>
      <ReactEcharts
        option={getOption()}
        style={{height: '300px', width: '100%'}}
        opts={{ renderer: 'svg' }}
        className='react_for_echarts' />
    </Block>
  )
}


WarningChart.propTypes = {
  app: PropTypes.object,
}


export default WarningChart