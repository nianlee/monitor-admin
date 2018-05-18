import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

// import styles from './style.less'

const AddOrUpdate = ({ role, dispatch }) => {
  const title = role.type === 'add' ? '新增角色': '修改角色'

  const handleOk = () => {
    if (role.type === 'add') {
      dispatch({ type: 'role/addRole', payload:{} })
    }
  }

  const handleCancel = () => {}

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Modal 
        visible={role.modalVisible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      </Modal>
      
    </div>
  )
}

AddOrUpdate.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func,
}

export default AddOrUpdate
