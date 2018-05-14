import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import DevicesTables from "./components/DevicesTable";


const DeviceManage = ({ devices,dispatch }) => {

  console.log("---------------");
  console.log(devices);

  return (
    <div>
      <DevicesTables device={devices} dispatch={dispatch}/>
    </div>
  )
}

  /*
  const loadDeviceList = activeKey => {

    if(activeKey == 2) {
      console.log(activeKey)
      dispatch({
        type:'manage/queryDeviceList',
        payload:{
          installAddr:1
        }
      })
    }
  }*/

DeviceManage.propTypes = {
  devices: PropTypes.object,
  dispatch:PropTypes.func,

}

export default connect(({ devices }) => ({ devices }))(DeviceManage)

