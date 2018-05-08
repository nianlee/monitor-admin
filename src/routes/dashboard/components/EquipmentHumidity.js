import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'

const EquipmentTemperature = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: '设备平均湿度'
    },
    tooltip: {},
    legend: {
      data:['设备平均湿度']
    },
    xAxis: {
      data: ['区域1', '区域2', '区域3', '区域4']
    },
    yAxis: {},
    series: [{
      name: '设备平均湿度',
      type: 'bar',
      data: [10, 5, 20, 10]
    }]
  })

  return (
    <ReactEcharts
      option={getOption()}
      style={{height: '300px', width: '100%', backgroundColor: '#fff'}}
      opts={{ renderer: 'svg' }}/>
  )
}


EquipmentTemperature.propTypes = {
  dashboard: PropTypes.object,
}


export default EquipmentTemperature