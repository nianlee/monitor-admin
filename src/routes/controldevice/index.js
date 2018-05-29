import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
//import { Form, Input,Icon, Row, Col,Select,Button } from 'antd'
import { Button } from 'antd'
import styles from "./style.less"


const ControlDevice = ({ controldevice, dispatch}) => {

  return (
    <div className={styles.formWrapper}>
      <Button type="primary" className={styles.addButton}>添加</Button>
      <Button className={styles.cancelButton}>取消</Button>
    </div>
  )
}

ControlDevice.propTypes = {
  controldevice: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ controldevice }) => ({ controldevice }))(ControlDevice)
