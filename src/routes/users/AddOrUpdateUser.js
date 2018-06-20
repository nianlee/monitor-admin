import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Button, Select } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from "./style.less"

const FormItem = Form.Item;
const Option = Select.Option;

const AddOrUpdateUser = ({ form, dispatch, addOrUpdateUser }) => {
  
  // 添加用户请求
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'addOrUpdateUser/add', values })
      }
    });
  }

  const onCancel = () => {
    dispatch(routerRedux.push('/usermanage'));
  }

  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol:{
      span: 8
    },
    wrapperCol:{
      span: 16
    }
  }

  const { userInfo } = addOrUpdateUser

  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('userName', {
                initialValue: userInfo.userName,
                rules: [
                  { required: true, message: '请输入用户名' }
                ],
              })(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="真实姓名"
            >
              {getFieldDecorator('realName', {
                initialValue: userInfo.realName,
                rules: [
                  { required: true, message: '请输入真实姓名' }
                ],
              })(
                <Input placeholder="请输入真实姓名" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="用户密码"
            >
              {getFieldDecorator('userPw', {
                initialValue: userInfo.userPw,
                rules: [
                  { required: true, message: '请输入密码' }
                ],
              })(
                <Input type="password" placeholder="请输入密码" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="电话号码"
            >
              {getFieldDecorator('phone', {
                initialValue: userInfo.phone,
                rules: [
                  { required: true, message: '请输入电话号码' }
                ],
              })(
                <Input placeholder="请输入电话号码" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="电子邮件"
            >
              {getFieldDecorator('email', {
                initialValue: userInfo.email,
                rules: [{required: true, message: '请输入电子邮件' }],
              })(
                <Input  placeholder="请输入电子邮件" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="工号"
            >
              {getFieldDecorator('jobNum', {
                initialValue: userInfo.jobNum,
                rules: [{required: true, message: '请输入工号' }],
              })(
                <Input placeholder="请输入工号" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="区域"
            >
              {getFieldDecorator('areaId', {
                initialValue: userInfo.areaId,
                rules: [
                  { required: true, message: '请选择区域!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择区域"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  {addOrUpdateUser.regionList && addOrUpdateUser.regionList.map(region => (<Option key={region.id} value={region.id}>{region.name}</Option>))}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="角色"
            >
              {getFieldDecorator('roleId', {
                initialValue: userInfo.roleId,
                rules: [
                  { required: true, message: '请选择角色!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择角色"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  {addOrUpdateUser.roleList && addOrUpdateUser.roleList.map(role => (<Option key={role.id} value={role.id}>{role.name}</Option>))}

                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>确定</Button>
          <Button className={styles.cancelButton} onClick={onCancel}>取消</Button>
        </FormItem>

      </Form>
    </div>
  )
}

AddOrUpdateUser.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  addOrUpdateUser: PropTypes.object,
}

const WrappedAddOrUpdateUser = Form.create()(AddOrUpdateUser)


export default connect(({ addOrUpdateUser }) => ({ addOrUpdateUser }))(WrappedAddOrUpdateUser)
