import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import UsersTable from './components/UsersTable'
import { Button } from 'antd'


const UserManage = ({ usermanage,dispatch }) => {

  /*
  const loadDeviceList = activeKey => {L

    if(activeKey == 2) {
      console.log(activeKey)
      dispatch({
        type:'manage/queryDeviceList',
        payload:{
          installAddr:1
        }
      })
    }

    if(activeKey == 1) {
      console.log(activeKey)
    }
  }
  */

  return (
    <div>
      <UsersTable manage={usermanage} dispatch={dispatch}/>
      <Button/>
    </div>
  )
}

UserManage.propTypes = {
  usermanage: PropTypes.object,
  dispatch:PropTypes.func,
}

export default connect(({ usermanage }) => ({ usermanage }))(UserManage)
