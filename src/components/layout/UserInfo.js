import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import './style.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol:{
    span: 4
  },
  wrapperCol:{
   span: 20
  }
}

const UserInfo = ({ app, dispatch, form }) => {
  const { getFieldDecorator } = form
  const { user } = app
  const handleSubmit = () => {
    form.validateFieldsAndScroll((errs, values)=> {
      console.log(values)
      if (!errs) {
        dispatch({ type: 'app/modifyUserInfo', payload: values })
      }
    })
  }

  const handleCancel = () => {
    dispatch({ type: 'app/updateState', payload: { userInfoModalVisible: false }})
  }

  return (
    <Modal 
      className="user-info"
      title="用户信息"
      visible={app.userInfoModalVisible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form>
        <FormItem label="用户名" {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: user.userName,
            // rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input placeholder="请输入用户名" disabled/>
          )}
        </FormItem>
        <FormItem label="真实姓名:"  {...formItemLayout}>
          {getFieldDecorator('realName', {
            initialValue: user.realName,
            rules: [{ required: true, message: '请输入真实姓名!' }],
          })(
            <Input placeholder="真实姓名" />
          )}
        </FormItem>
        <FormItem label="电话"  {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [{ required: true, message: '请输入电话!' }],
          })(
            <Input placeholder="电话号码" />
          )}
        </FormItem>
        <FormItem label="邮箱"  {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [{ required: true, message: '请输入邮箱!' }],
          })(
            <Input placeholder="邮箱" />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

UserInfo.propTypes = {
  app: PropTypes.object,
  form: PropTypes.object,
  dispatch: PropTypes.func,
}

const UserInfoWrapper = Form.create()(UserInfo)

export default UserInfoWrapper
