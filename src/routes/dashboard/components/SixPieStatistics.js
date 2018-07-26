import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
// import Empty from './Empty'

const SixPieStatistics = ({ dashboard }) => {

  //console.log('six',dashboard.OnlineRate,dashboard.OfflineRate,dashboard.AlarmRate)

  const labelTop = {  //eslint-disable-line
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
  const labelFromatter = {  //eslint-disable-line
    normal : {
      label : {
        formatter : function (params){
          return 100 - params.value + '%'
        },
        textStyle: {
          baseline : 'top'
        }
      }
    },
  } //eslint-disable-line
  const allLabelFromatter = {  //eslint-disable-line
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
  } //eslint-disable-line
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
  }; //eslint-disable-line
  const radius = [40, 55]; //eslint-disable-line


  const getOption = () => ({ //eslint-disable-line

    legend: {
      x : 'center',
      y : 'bottom',
      data:[
        '设备总数','设备在线数','设备故障数','设备正常率','设备报警率', '设备离线率'
      ]
    },
    title : {
      text: '设备信息汇总',
      //subtext: 'from global web index',
      x: 'center',
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
        center : ['10%', '30%'],
        radius : radius,
        x: '0%', // for funnel
        itemStyle : labelFromatter,
        data : [
          {name:'other', value:46, itemStyle : labelBottom},
          {name:'GoogleMaps', value:54,itemStyle : labelTop}
        ]
      },

      /*
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
          {name:'设备正常率', value:100-dashboard.OnlineRate,itemStyle : labelTop}
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
          {name:'设备报警率', value:100-dashboard.OfflineRate,itemStyle : labelTop}
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
          {name:'设备离线率', value:100-dashboard.AlarmRate,itemStyle : labelTop}
        ]
      },*/
    ]
  });

  const getOption1 = () => ({ //eslint-disable-line

    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#00c0ef"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['本月业绩']
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['70%', '85%'],
        avoidLabelOverlap: false,
        hoveranination:false,
        silent:true,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='本月业绩\r\n\r\n'+'10单';
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#00c0ef'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value:335, name:'本月业绩'}
        ]
      },
    ]
  });

  const getOption2 = () => ({ //eslint-disable-line
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#00a65a"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['本月业绩']
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['70%', '85%'],
        avoidLabelOverlap: false,
        hoveranination:false,
        silent:true,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='在线率\r\n\r\n'+'25%';
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#00a65a'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value:335, name:'本季业绩'}
        ]
      }
    ]
  });

  const option1 = {
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#00c0ef"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['设备总数']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1548
            }
          }
        },
        restore : {show: false},
        saveAsImage : {show: false}
      }
    },
    calculable:true,
    series: [
      {
        name:'',
        type:'pie',
        radius : ['50%', '70%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='设备总数\n\n'+dashboard.TotalCount;
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#dda65a'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        itemStyle : {
          normal : {
            label : {
              show : false
            },
            labelLine : {
              show : false
            }
          },

          emphasis : {
            label : {
              show : true,
              position : 'center',
              textStyle : {
                fontSize : '30',
                fontWeight : 'bold'
              }
            }
          }
        },
        data:[
          {value:dashboard.TotalCount, name:'设备总数'},
        ]
      }
    ]
  };

  const option2 = {
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#00a65a"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['设备在线数']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1549
            }
          }
        },
        restore : {show: false},
        saveAsImage : {show: false}
      }
    },
    calculable : true,
    series: [
      {
        name:'',
        type:'pie',
        radius : ['50%', '70%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='设备在线数\n\n'+dashboard.OnlineCount;
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#04a65b'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        itemStyle : {
          normal : {
            label : {
              show : false
            },
            labelLine : {
              show : false
            }
          },

          emphasis : {
            label : {
              show : true,
              position : 'center',
              textStyle : {
                fontSize : '30',
                fontWeight : 'bold'
              }
            }
          }
        },
        data:[
          {value:dashboard.TotalCount, name:'设备在线数'}
        ]
      }
    ]
  };

  const option3 = {
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#f39c12"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['设备故障数']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1549
            }
          }
        },
        restore : {show: false},
        saveAsImage : {show: false}
      }
    },
    calculable : true,
    series: [
      {
        name:'',
        type:'pie',
        radius : ['50%', '70%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='设备故障数\n\n'+dashboard.OnlineCount;
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#04a65b'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        itemStyle : {
          normal : {
            label : {
              show : false
            },
            labelLine : {
              show : false
            }
          },

          emphasis : {
            label : {
              show : true,
              position : 'center',
              textStyle : {
                fontSize : '30',
                fontWeight : 'bold'
              }
            }
          }
        },
        data:[
          {value:dashboard.AlarmCount, name:'设备故障数'},
        ]
      }
    ]
  };

  const option4 = {
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#39CCCC"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['设备正常率']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1549
            }
          }
        },
        restore : {show: false},
        saveAsImage : {show: false}
      }
    },
    calculable : true,
    series: [
      {
        name:'',
        type:'pie',
        radius : ['50%', '70%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='设备正常率\n\n'+dashboard.OnlineRate.toFixed(2) * 100+ '%';
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#04a65b'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        itemStyle : {
          normal : {
            label : {
              show : false
            },
            labelLine : {
              show : false
            }
          },

          emphasis : {
            label : {
              show : true,
              position : 'center',
              textStyle : {
                fontSize : '30',
                fontWeight : 'bold'
              }
            }
          }
        },
        data:[
          {value:dashboard.OnlineRate, name:'设备正常率'},
        ]
      }
    ]
  };

  const option5 = {
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#605ca8"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['设备故障率']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1549
            }
          }
        },
        restore : {show: false},
        saveAsImage : {show: false}
      }
    },
    calculable : true,
    series: [
      {
        name:'',
        type:'pie',
        radius : ['50%', '70%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='设备故障率\n\n'+dashboard.AlarmRate.toFixed(2) * 100 + '%';
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#04a65b'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        itemStyle : {
          normal : {
            label : {
              show : false
            },
            labelLine : {
              show : false
            }
          },

          emphasis : {
            label : {
              show : true,
              position : 'center',
              textStyle : {
                fontSize : '30',
                fontWeight : 'bold'
              }
            }
          }
        },
        data:[
          {value:dashboard.AlarmRate, name:'设备故障率'},
        ]
      }
    ]
  };

  const option6 = {
    tooltip: {
      show:false,
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:["#D81B60"],
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['设备离线率']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1549
            }
          }
        },
        restore : {show: false},
        saveAsImage : {show: false}
      }
    },
    calculable : true,
    series: [
      {
        name:'',
        type:'pie',
        radius : ['50%', '70%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter:function (argument) {
              var html;
              html='设备离线率\n\n'+dashboard.OfflineRate.toFixed(2) * 100 + '%';
              return html;
            },
            textStyle:{
              fontSize: 15,
              color:'#04a65b'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        itemStyle : {
          normal : {
            label : {
              show : false
            },
            labelLine : {
              show : false
            }
          },

          emphasis : {
            label : {
              show : true,
              position : 'center',
              textStyle : {
                fontSize : '30',
                fontWeight : 'bold'
              }
            }
          }
        },
        data:[
          {value:dashboard.OfflineRate, name:'设备离线率'},
        ]
      }
    ]
  };


  return <div style={{display: "flex"}}>
    <ReactEcharts
      option={option1}
      style={{height: '250px', width: '250px'}}
      opts={{ renderer: 'svg' }}
    />

    <ReactEcharts
      option={option2}
      style={{height: '250px', width: '250px'}}
      opts={{ renderer: 'svg' }}
    />

    <ReactEcharts
      option={option3}
      style={{height: '250px', width: '250px'}}
      opts={{ renderer: 'svg' }}
    />

    <ReactEcharts
      option={option4}
      style={{height: '250px', width: '250px'}}
      opts={{ renderer: 'svg' }}
    />

    <ReactEcharts
      option={option5}
      style={{height: '250px', width: '250px'}}
      opts={{ renderer: 'svg' }}
    />

    <ReactEcharts
      option={option6}
      style={{height: '250px', width: '250px'}}
      opts={{ renderer: 'svg' }}
    />
  </div>
}

SixPieStatistics.propTypes = {
  dashboard: PropTypes.object,
}

export default SixPieStatistics
