import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import styles from '../style.less'

const Six = ({ dashboard }) => {
  const getOption = () => {
    return {
      title: {
        text: '6路直流电压电流平均值'
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
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'电流',
          type:'line',
          areaStyle: {normal: {}},
          data:[7, 200, 6, 80, 12, 190, 10]
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


Six.propTypes = {
  dashboard: PropTypes.object,
  title: PropTypes.string,
}


export default Six