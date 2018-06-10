import React from 'react'
import { Modal,Form,Card } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.less'

const ShowModal = ({
  msg, // eslint-disable-line
  ...modalPorps
}) => {

  const modalOpts = { // eslint-disable-line
    ...modalPorps,
  }

  return (
    <Modal {...modalOpts}>
      <Card title="用户添加信息" className={styles.cardWrapper}>

        <p className={styles.itemWrapper}>{msg}</p>


      </Card>
    </Modal>
  )
}

ShowModal.protoTypes = {
  msg:PropTypes.String,
}

export default Form.create()(ShowModal)


