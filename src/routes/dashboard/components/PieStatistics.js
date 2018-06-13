import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
// import Empty from './Empty'

const PieStatistics = ({ dashboard }) => {
  const getOption = () => ({
    title: {
      text: `总设备${dashboard.TotalCount}`,
      left: 'center',
      top: 7,
      textStyle: {
        fontSize: '16px',
        color: '#333',
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: `{a} <br/>{b} : ${dashboard.TotalCount} ({d}%)`,
    },
    legend: {
      bottom: 0,
      left: 'center',
      data: [{
        name: `正常设备 ${dashboard.OnlineCount}`,
        icon: 'circle',
        textStyle: {
          color: '#BAE7FF'
        }
      }, {
        name: `离线设备 ${dashboard.OffLineCount}`,
        icon: 'circle',
        textStyle: {
          color: '#FFD6E7'
        }
      }, {
        name: `故障设备 ${dashboard.AlarmCount}`,
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
            value: dashboard.normal, 
            name: `正常设备 ${dashboard.normal}`,
            itemStyle: {
              color: '#BAE7FF'
            }
          }, {
            value: dashboard.offline,
            name: `离线设备 ${dashboard.offline}`,
            itemStyle: {
              color: '#FFD6E7',
            }
          }, {
            value: dashboard.error,
            name: `故障设备 ${dashboard.error}`,
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

  return <div>
    <ReactEcharts
      option={getOption()}
      style={{height: '260px', width: '100%'}}
      opts={{ renderer: 'svg' }}
    />
  </div>
}

PieStatistics.propTypes = {
  dashboard: PropTypes.object,
}

export default PieStatistics