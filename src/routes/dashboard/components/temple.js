import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import Empty from './Empty'

const Statistics = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: `总人数${dashboard.total}`,
      left: 'center',
      top: 7,
      textStyle: {
        fontSize: '16px',
        color: '#333',
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: `{a} <br/>{b} : ${dashboard.total} ({d}%)`,
    },
    legend: {
      bottom: 0,
      left: 'center',
      data: [{
        name: `女性员工 ${dashboard.woman}`,
        icon: 'circle',
        textStyle: {
          color: '#FFD6E7'
        }
      }, {
        name: `男性员工 ${dashboard.man}`,
        icon: 'circle',
        textStyle: {
          color: '#BAE7FF'
        }
      }, {
        name: `未设置 ${dashboard.unknown}`,
        icon: 'circle',
      }]
    },
    series : [
      {
        name: '员工统计',
        type: 'pie',
        radius: ['35%', '70%'],
        center: ['50%', '50%'],
        // avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14'
            }
          }
        },
        data:[
          {
            value: dashboard.woman, 
            name: `女性员工 ${dashboard.woman}`,
            itemStyle: {
              color: '#FFD6E7',
            }
          }, {
            value: dashboard.man,
            name: `男性员工 ${dashboard.man}`,
            itemStyle: {
              color: '#BAE7FF',
            }
          }, {
            value: dashboard.unknown,
            name: `未设置 ${dashboard.unknown}`,
          },
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

  return <div>{(!dashboard.total || dashboard.total <= 0)
    ? <Empty type="noData" msg="暂无数据"/>
    : <ReactEcharts
        option={getOption()}
        style={{height: '260px', width: '100%'}}
        opts={{ renderer: 'svg' }}
      />
  }</div>
}

Statistics.propTypes = {
  dashboard: PropTypes.object,
}

export default Statistics