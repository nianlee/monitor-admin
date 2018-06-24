import React from 'react'
import { Modal,Form,Input } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.less'

const InputGroup = Input.Group;

const ShowModal = ({
  item, // eslint-disable-line
  form:{// eslint-disable-line
    validateFields,
    getFieldsValue,
  },
  ...modalPorps
}) => {

  const modalOpts = { // eslint-disable-line
    ...modalPorps,
  }

  return (
    <Modal {...modalOpts}>
      <InputGroup>
        <div>
          <p className={styles.title}>创建时间:</p>
          <p className={styles.itemWrapper}>{item.createTime}</p>
        </div>

        <div>
          <p className={styles.title}>更新时间:</p>
          <p className={styles.itemWrapper}>{item.updateTime}</p>
        </div>

        <div>
          <p className={styles.title}>硬件版本:</p>
          <p className={styles.itemWrapper}>{item.hardwareVersion}</p>
        </div>

        <div>
          <p className={styles.title}>固件版本:</p>
          <p className={styles.itemWrapper}>{item.firmwareVersion}</p>
        </div>

        <div>
          <p className={styles.title}>固件名称:</p>
          <p className={styles.itemWrapper}>{item.firmwareName}</p>
        </div>

        <div>
          <p className={styles.title}>下载方式:</p>
          <p className={styles.itemWrapper}>{item.downloadType}</p>
        </div>

        <div>
          <p className={styles.title}>固件地址:</p>
          <p className={styles.itemWrapper}>{item.firmwarePath}</p>
        </div>

        <div>
          <p className={styles.title}>固件大小:</p>
          <p className={styles.itemWrapper}>{item.firmwareSize}</p>
        </div>
      </InputGroup>
    </Modal>
  )
}

ShowModal.protoTypes = {
  form:PropTypes.object.isRequired,
  type:PropTypes.string,
  item:PropTypes.object,
  onOk:PropTypes.func,
}

export default Form.create()(ShowModal)


