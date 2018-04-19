import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import Block from 'components/Block'

require('echarts/map/js/province/chongqing.js')

const MapChart = ({ app }) => {
  // const randomData = () => {
  //   return Math.round(Math.random() * 1000)
  // }

  const option = {
    title: {
      text: '查询设备分布图',
      left: 'center',
    },
    geo: {
      map: '重庆',
      // itemStyle: {					// 定义样式
      //   normal: {					// 普通状态下的样式
      //     areaColor: '#323c48',
      //     borderColor: '#111'
      //   },
      //   emphasis: {					// 高亮状态下的样式
      //     areaColor: '#2a333d'
      //   }
      // }
    },
    // backgroundColor: '#404a59',  		// 图表背景色
    series: [
      {
        name: '设备',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [{name: '光电园', value: [222.2, 111.1, 1]}] // series数据内容
      }
    ]
  }
  

  return (
    <Block>
      <ReactEcharts
        option={option}
        style={{ height: '500px', width: '100%' }}
        className="react_for_echarts"
      />
    </Block>
  )
}

MapChart.propTypes = {
  app: PropTypes.object,
}


export default MapChart
