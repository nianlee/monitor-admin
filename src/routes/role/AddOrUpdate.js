import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input, Button } from 'antd'
import { connect } from 'dva'

import styles from './style.less'

const FormItem = Form.Item;
const SelectOption = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  },
};


const AddOrUpdate = ({ addOrUpdateRole, dispatch, form }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    if (addOrUpdateRole.type === 'add') {
      dispatch({ type: 'addOrUpdateRole/', payload:{} })
    }

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', fieldsValue);
    });
  }

  
  const { getFieldDecorator } = form

  const roleInfo = addOrUpdateRole.roleInfo || {}

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="上级角色"
        >
          {getFieldDecorator('parentId', { 
            initialValue: roleInfo.parentId,
            rules: [{ required: true, message: '请选择上级角色' }]}
          )(
            <Select>
              <SelectOption key="" value="">请选择</SelectOption>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色名称"
        >
          {getFieldDecorator('roleName', { 
            initialValue: roleInfo.roleName,
            rules: [{ required: true, message: '请输入角色名称' }]}
          )(
            <Input placeholder="请输入角色名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色描述"
        >
          {getFieldDecorator('roleDes', { 
            initialValue: roleInfo.roleDes,
            rules: [{ required: true, message: '请输入角色描述' }]}
          )(
            <Input placeholder="请输入角色描述" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色菜单"
        >
          {getFieldDecorator('menuIds', {
            initialValue: roleInfo.allId,
            rules: [{ required: true, message: '请输入角色描述' }]}  
          )(
            <span>角色菜单</span>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">{addOrUpdateRole.type == 'add' ? '新增' : '更新'}</Button>
        </FormItem>
      </Form>
    </div>
  )
}

AddOrUpdate.propTypes = {
  addOrUpdateRole: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrapperAddOrUpdate = Form.create()(AddOrUpdate)

export default connect(({ addOrUpdateRole }) => ({ addOrUpdateRole }))(WrapperAddOrUpdate)
