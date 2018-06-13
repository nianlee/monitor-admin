import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { connect } from 'dva'

import MenuSelect from './components/MenuSelect'

import styles from './style.less'

const FormItem = Form.Item;

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
          Id: addOrUpdateRole.id,
          ...fieldsValue,
        }
        dispatch({ type: 'addOrUpdateRole/editRoleById', payload: { payload }})
      }

      console.log('Received values of form: ', fieldsValue)
    });
  }


  const { getFieldDecorator } = form

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="角色名称"
        >
          {getFieldDecorator('roleName', {
            // initialValue: roleInfo.roleName,
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
            // initialValue: roleInfo.roleDes,
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
            // initialValue: initMenuIds(),
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

const formOptions = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
    // console.log('---changedFields----', changedFields)
    props.dispatch({ type: 'addOrUpdateRole/updateFormParams', payload: { ...changedFields }})
  },
  mapPropsToFields(props) {
    // console.log(props)
    const { formParams } = props.addOrUpdateRole

    return {
      parentId: Form.createFormField({
        ...formParams.parentId,
        value: formParams.parentId.value,
      }),
      roleName: Form.createFormField({
        ...formParams.roleName,
        value: formParams.roleName.value,
      }),
      roleDes: Form.createFormField({
        ...formParams.roleDes,
        value: formParams.roleDes.value,
      }),
      menuIds: Form.createFormField({
        ...formParams.menuIds,
        value: formParams.menuIds.value,
      }),
    };
  }
}

const WrapperAddOrUpdate = Form.create(formOptions)(AddOrUpdate)

export default connect(({ addOrUpdateRole }) => ({ addOrUpdateRole }))(WrapperAddOrUpdate)
