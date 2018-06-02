import React from 'react'
import { Modal,Form,Input,Card } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.less'

const InputGroup = Input.Group;

const ShowModal = ({
  item, // eslint-disable-line
  dynamic,// eslint-disable-line
  onOk,// eslint-disable-line
  form:{// eslint-disable-line
    validateFields,
    getFieldsValue,
  },
  ...modalPorps
}) => {

  const dynamicList = dynamic.map(d => (
    <div className={styles.summaryWrapper} key={d.indexOf}>
      <p>{d.attributeName}:</p>
      <p className={styles.itemWrapper}>{d.attributeValue}</p>
    </div>
  ))



  const handleOk = () => {

  }

  const modalOpts = { // eslint-disable-line
    ...modalPorps,
    onOk:handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <InputGroup>
        <div>
          <label>sn       码</label>
          <Input className={styles.InputWrapper} value={item.sn} disabled={true}/>
        </div>

        <div>
          <label>设备    名称</label>
          <Input className={styles.InputWrapper} value={item.name} disabled={true}/>
        </div>

        <div>
          <label>设备    类型</label>
          <Input className={styles.InputWrapper} value={item.type} disabled={true}/>
        </div>

        <div>
          <label>设备安装时间</label>
          <Input className={styles.InputWrapper} value={item.installTime} disabled={true}/>
        </div>

        <div>
          <label>设备安装地址</label>
          <Input className={styles.InputWrapper} value={item.detailAddr} disabled={true}/>
        </div>

        <div>
          <label>硬件    版本</label>
          <Input className={styles.InputWrapper} value={item.hardwareVersion} disabled={true}/>
        </div>

        <Card title="设备信息汇总" className={styles.cardWrapper}>
          {dynamicList}
        </Card>
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


