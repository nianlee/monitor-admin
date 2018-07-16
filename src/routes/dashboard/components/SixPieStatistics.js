import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
// import Empty from './Empty'

const PieStatistics = ({ dashboard }) => {

  const labelTop = {
    normal : {
      label : {
        show : true,
        position : 'center',
        formatter : '{b}',
        textStyle: {
          baseline : 'bottom'
        }
      },
      labelLine : {
        show : false
      }
    }
  };
  const labelFromatter = {
    normal : {
      label : {
        formatter : function (params){
          return params.value + '%'
        },
        textStyle: {
          baseline : 'top'
        }
      }
    },
  }

  const allLabelFromatter = {
    normal : {
      label : {
        formatter : function (params){
          return params.value
        },
        textStyle: {
          baseline : 'top'
        }
      }
    },
  }
  const labelBottom = { //eslint-disable-line
    normal : {
      color: '#ccc',
      label : {
        show : true,
        position : 'center'
      },
      labelLine : {
        show : false
      }
    },
    emphasis: {
      color: 'rgba(0,0,0,0)'
    }
  };
  const radius = [40, 55];

  const getOption = () => ({
    legend: {
      x : 'center',
      y : 'bottom',
      data:[
        '设备总数','设备在线数','设备故障数','设备在线率','设备离线率', '设备故障率'
      ]
    },
    title : {
      text: '设备信息汇总',
      //subtext: 'from global web index',
      x: 'center',

      y:'top'
    },
    toolbox: {
      show : true,
      feature : {
        dataView : {show: true, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              width: '20%',
              height: '30%',
              itemStyle : {
                normal : {
                  label : {
                    formatter : function (params){
                      return 'other\n' + params.value + '%\n'
                    },
                    textStyle: {
                      baseline : 'middle'
                    }
                  }
                },
              }
            }
          }
        },
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    series : [
      {
        type : 'pie',
        center : ['10%', '50%'],
        radius : radius,
        x: '0%', // for funnel
        itemStyle : allLabelFromatter,
        data : [
          //{name:'test2', value:46, itemStyle : labelBottom},
          {name:'设备总数', value:dashboard.TotalCount,itemStyle : labelTop}
        ]
      },
      {
        type : 'pie',
        center : ['25%', '50%'],
        radius : radius,
        x:'20%', // for funnel
        itemStyle : allLabelFromatter,
        data : [
          //{name:'other', value:dashboard.OnlineCount, itemStyle : labelBottom},
          {name:'设备在线数', value:dashboard.OnlineCount,itemStyle : labelTop}
        ]
      },
      {
        type : 'pie',
        center : ['40%', '50%'],
        radius : radius,
        x:'40%', // for funnel
        itemStyle : allLabelFromatter,
        data : [
          //{name:'other', value:dashboard.AlarmCount, itemStyle : labelBottom},
          {name:'设备故障数', value:dashboard.AlarmCount,itemStyle : labelTop}
        ]
      },
      {
        type : 'pie',
        center : ['55%', '50%'],
        radius : radius,
        x:'60%', // for funnel
        itemStyle : labelFromatter,
        data : [
          {name:'other', value:dashboard.OnlineRate, itemStyle : labelBottom},
          {name:'设备在线率', value:100-dashboard.OnlineRate,itemStyle : labelTop}
        ]
      },
      {
        type : 'pie',
        center : ['70%', '50%'],
        radius : radius,
        x:'80%', // for funnel
        itemStyle : labelFromatter,
        data : [
          {name:'other', value:dashboard.OfflineRate, itemStyle : labelBottom},
          {name:'设备离线率', value:100-dashboard.OfflineRate,itemStyle : labelTop}
        ]
      },
      {
        type : 'pie',
        center : ['85%', '50%'],
        radius : radius,
        y: '55%',   // for funnel
        x: '0%',    // for funnel
        itemStyle : labelFromatter,
        data : [
          {name:'other', value:dashboard.AlarmRate, itemStyle : labelBottom},
          {name:'设备故障率', value:100-dashboard.AlarmRate,itemStyle : labelTop}
        ]
      },
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
