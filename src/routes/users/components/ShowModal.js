import React from 'react'
import { Modal,Form,Input,InputNumber } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

const formItemLayout = {
  labelCol : {span : 6},
  wrapperCol:{span: 14}
}

const ShowModal = ({
  item={}, // eslint-disable-line
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
        key:item.key,
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
      <Form layout="horizontal">

        <FormItem label="sn" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sn', {
            initialValue: item.nickName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="Age" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {
            initialValue: item.age,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem>

        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="E-mail" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>

      </Form>

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


