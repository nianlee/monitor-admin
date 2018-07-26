import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

import styles from '../style.less'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  },
};


const AddOrUpdate = ({ region, dispatch, form }) => {

  const handleSubmit = (e) => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (region.operateType === 'add') {

        console.log('Received values of form: ', fieldsValue)
        dispatch({ type: 'region/addArea', payload: {
          //pId: region.selectedData.id,
          parentCode:region.selectedData.pCode,
          code:region.selectedData.code,
          ...fieldsValue,
        }})
      } else {
        dispatch({ type: 'region/editAreaById', payload: {
          //id: region.selectedData.id,
          code:region.selectedData.code,
          ...fieldsValue,
        }})
      }
    });
  }

  const handleCancel = () => {
    dispatch({ type: 'region/updateState', payload: { modalVisible: false }})
  }

  const { getFieldDecorator } = form

  const initialValue = () => {
    if (region.operateType === 'edit') {
      return region.selectedData && region.selectedData.name
    }
    return ''
  }

  return (
    <Modal
      title={region.operateType === 'add' ? '新增' : '修改'}
      okText="确认"
      cancelText="取消"
      visible={region.modalVisible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form className={styles.form}>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {getFieldDecorator('name', {
            initialValue: initialValue(),
            rules: [{ required: true, message: '请输入名称' }],
          })(
            <Input placeholder="请输入名称" />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

AddOrUpdate.propTypes = {
  region: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrapperAddOrUpdate = Form.create()(AddOrUpdate)

export default WrapperAddOrUpdate
