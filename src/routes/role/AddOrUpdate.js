import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input, Button } from 'antd'
import { connect } from 'dva'

import MenuSelect from './components/MenuSelect'

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

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (addOrUpdateRole.type === 'add') {
        dispatch({ type: 'addOrUpdateRole/addRole', payload: { ...fieldsValue }})
      } else {
        const payload = {
          Id: addOrUpdateRole.roleInfo.id,
          ...fieldsValue,
        }
        dispatch({ type: 'addOrUpdateRole/editRoleById', payload: { payload }})
      }

      console.log('Received values of form: ', fieldsValue)
    });
  }

  
  const { getFieldDecorator } = form

  const roleInfo = addOrUpdateRole.roleInfo || {}

  const initMenuIds = () => {
    let menuIds = []
    if (roleInfo.allId) {
      menuIds = roleInfo.allId.split('_')
    }
    console.log('------', menuIds)
    return menuIds
  }

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
              {addOrUpdateRole.roleSelectData.map(item => {
                return <SelectOption key={item.id} value={item.id}>{item.name}</SelectOption>
              })}
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
            initialValue: initMenuIds(),
            rules: [{ required: true, message: '请输入角色描述' }]}  
          )(
            <MenuSelect dataSource={addOrUpdateRole.allMenus}/>
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
