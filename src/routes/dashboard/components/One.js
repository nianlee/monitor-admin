import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import styles from '../style.less'

const OnlineRate = ({ dashboard }) => {
  const getOption = () => {
    return {
      title: {
        text: '1路交流电压3路交流电流'
      },
      tooltip : {
        trigger: 'axis'
      },
      // legend: {
      //   data:['电压', '电流'],
      //   bottom: 0,
      // },
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
          name:'电压',
          type:'line',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 70, 150]
        },
        {
          name:'电流',
          type:'line',
          areaStyle: {normal: {}},
          data:[80, 200, 86, 80, 121, 190, 100]
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