import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Button, Icon } from 'antd'
import styles from './style.less'

const FormItem = Form.Item

const Login = ({ login, dispatch, form }) => {
  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'login/loginLoad',
          payload: { ...values }
        })
      }
    });
  }

  const { getFieldDecorator } = form

  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userPw', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <a className={styles.loginFormForgot} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            登录
          </Button>
          <a href="">现在注册!</a>
        </FormItem>
      </Form>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedLogin = Form.create()(Login)


export default connect(({ login }) => ({ login }))(WrappedLogin)