import React from 'react'
import { Modal,Form,Input } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.less'

const InputGroup = Input.Group;

/*
const FormItem = Form.Item
const formItemLayout = {
  labelCol : {span : 6},
  wrapperCol:{span: 14}
}*/

const ShowModal = ({
  item, // eslint-disable-line
  onOk,// eslint-disable-line
  form:{// eslint-disable-line
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalPorps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if(errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key:item.sn,
      }
      data.address = data.address.join(' ')
      onOk(data)
    })
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

      </InputGroup>
    </Modal>

      /*
      <Form layout="horizontal">

        <FormItem label="sn" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sn', {

            rules: [
              {
                required: true,
              },
            ],
          })(<Input value = 'test' disabled={true}/>)}
        </FormItem>

        <FormItem label="设备名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>

        <FormItem label="设备安装时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('installTime', {
            initialValue: item.installTime,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input disabled={true}/>)}
        </FormItem>

        <FormItem label="设备类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input disabled={true}/>)}
        </FormItem>

      </Form>*/
  )
}

ShowModal.protoTypes = {
  form:PropTypes.object.isRequired,
  type:PropTypes.string,
  item:PropTypes.object,
  onOk:PropTypes.func,
}

export default Form.create()(ShowModal)


