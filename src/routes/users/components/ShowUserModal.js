import React from 'react'
import { Modal,Form,Card } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.less'

const ShowModal = ({
  userInfos, // eslint-disable-line
  onOk,// eslint-disable-line
  ...modalPorps
}) => {

  const handleOk = () => {
  }


  const modalOpts = { // eslint-disable-line
    ...modalPorps,
    onOk:handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Card title="用户信息详情" className={styles.cardWrapper}>

        <p className={styles.itemWrapper}>test</p>


      </Card>
    </Modal>
  )
}

ShowModal.protoTypes = {
  userInfos:PropTypes.object,
  onOk:PropTypes.func,
}

export default Form.create()(ShowModal)


