import React from 'react'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map' //引入地图
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import 'echarts/map/js/province/chongqing' // 引入重庆地图
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'

const CqMap = ({ dashboard }) => {

  const convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      res.push(data[i]);
    }
    return res;
  };

  const getOption = () => ({
    backgroundColor: '#fff',
    tooltip : {
      trigger: 'item',

    },
    visualMap: {
      min: 0,
      max: 1500,
      text:['高','低'],
      realtime: false,
      calculable: true,
      inRange: {

        color: ['#e0ffff', '#006edd']
      }
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    /*
    geo: {
      map: '重庆',
      label: {
        emphasis: {
          show: true
        }
      },
      roam: true, // 是否可以点击鼠标、滚轮缩放
      itemStyle: {
        normal: {
          areaColor:'#777b18',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },*/

    series:[
      {
        name: '重庆市地图',
        type: 'map',
        mapType: '重庆', // 自定义扩展图表类型
        roam: true, // 是否可以点击鼠标、滚轮缩放，切记切记
        itemStyle:{
          normal:{label:{show:true}},
          emphasis:{label:{show:true}}
        },
        data:convertData(dashboard.AreaCount)//[dashboard.AreaCount.map(item => (item))]

          /*
          {name: '奉节县', value: randomData()},
          {name: '巫溪县', value: randomData()},
          {name: '开州区', value: randomData()},
          {name: '酉阳土家族苗族自治县', value: randomData()},
          {name: '彭水苗族土家族自治县', value: randomData()},
          {name: '云阳县', value: randomData()},
          {name: '万州区', value: randomData()},
          {name: '城口县', value: randomData()},
          {name: '江津区', value: randomData()},
          {name: '石柱土家族自治县', value: randomData()},
          {name: '巫山县', value: randomData()},
          {name: '涪陵区', value: randomData()},
          {name: '丰都县', value: randomData()},
          {name: '武隆区', value: randomData()},
          {name: '南川区', value: randomData()},
          {name: '秀山土家族苗族自治县', value: randomData()},
          {name: '黔江区', value: randomData()},
          {name: '合川区', value: randomData()},
          {name: '綦江区', value: randomData()},
          {name: '忠县', value: randomData()},
          {name: '梁平县', value: randomData()},
          {name: '巴南区', value: randomData()},
          {name: '潼南区', value: randomData()},
          {name: '永川区', value: randomData()},
          {name: '垫江县', value: randomData()},
          {name: '渝北区', value: randomData()},
          {name: '长寿区', value: randomData()},
          {name: '大足区', value: randomData()},
          {name: '铜梁区', value: randomData()},
          {name: '荣昌区', value: randomData()},
          {name: '璧山区', value: randomData()},
          {name: '北碚区', value: randomData()},
          {name: '万盛区', value: randomData()},
          {name: '九龙坡区', value: randomData()},
          {name: '沙坪坝区', value: randomData()},
          {name: '南岸区', value: randomData()},
          {name: '江北区', value: randomData()},
          {name: '大渡口区', value: randomData()},
          {name: '渝中区', value: randomData()},
          */
        //]
      }
    ]
  })

  return <div>
    <ReactEcharts
      option={getOption()}
      style={{height: '500px', width: '100%'}}
      opts={{ renderer: 'svg' }}
    />
  </div>
}

CqMap.propTypes = {
  dashboard: PropTypes.object,
}

export default CqMap
