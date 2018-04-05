import React from 'react'
import ReactEcharts from 'echarts-for-react'
import Block from 'components/Block'
import PropTypes from 'prop-types'

const PieChart = ({ app }) => {
  const getOption = () => ({
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //   orient: 'vertical',
    //   data: ['直接访问','邮件营销','联盟广告']
    // },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
        ],
        itemStyle: {
          emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
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


PieChart.propTypes = {
  app: PropTypes.object,
}


export default PieChart