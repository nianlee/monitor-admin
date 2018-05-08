import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'

const OnlineRate = ({ dashboard }) => {
  const getOption = () => {
    return {
      title: {
        text: '6路直流电压电流平均值'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['6路直流电压电流平均值']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'在线率',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
      ]
    }
  }

  return (
    <ReactEcharts
      option={getOption()}
      style={{height: '300px', width: '100%', backgroundColor: '#fff'}}
      opts={{ renderer: 'svg' }}/>
  )
}


OnlineRate.propTypes = {
  dashboard: PropTypes.object,
  title: PropTypes.string,
}


export default OnlineRate