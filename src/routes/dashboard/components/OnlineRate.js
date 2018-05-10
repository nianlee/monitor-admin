import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import styles from '../style.less'

const OnlineRate = ({ dashboard, title }) => {
  const getOption = () => {
    return {
      title: {
        text: title
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['在线率']
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
          // stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
      ]
    }
  }

  return (
    <ReactEcharts
      option={getOption()}
      className={styles.echart}
      opts={{ renderer: 'svg' }}/>
  )
}


OnlineRate.propTypes = {
  dashboard: PropTypes.object,
  title: PropTypes.string,
}


export default OnlineRate