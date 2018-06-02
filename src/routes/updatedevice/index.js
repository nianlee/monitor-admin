import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Row, Col,Button,Input,Modal } from 'antd'
import styles from "./style.less"
import { routerRedux } from 'dva/router'

const FormItem = Form.Item;

const UpdateDevice = ({ updatedevice, dispatch, form }) => {

  console.log('updatedevice',updatedevice.sn)

  // 添加设备请求
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'updatedevice/updateFirmwareVersion',
          payload: { ...values }
        })
      }
    });
  }

  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol:{
      xs:{span:24},
      sm:{span:8},
    },
    wrapperCol:{
      xs:{span:24},
      sm:{span:16},
    }
  }

  function handleOk() {
    dispatch(routerRedux.push('/devicemanage'))
  }

  function handleCancel() {
    dispatch({type:'updatedevice/hideModal'})
  }






  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">
        <Row gutter={24}>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="sn码" // eslint-disable-line
            >
              {getFieldDecorator('sn', {
                initialValue:updatedevice.sn.sn,
              })(
                <Input disabled={true} />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="固件版本" // eslint-disable-line
            >
              {getFieldDecorator('firmwareVersion', {
                initialValue:updatedevice.firmwareVersion,
              })(
                <Input disabled={true} />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button className={styles.cancelButton} onClick={handleOk}>取消</Button>
          <Button type="primary" htmlType="submit" className={styles.addButton}>升级</Button>
        </FormItem>
      </Form>

      <Modal
        title="升级消息"
        visible={updatedevice.modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{updatedevice.updateMessage}</p>

      </Modal>
    </div>
  )
}



UpdateDevice.propTypes = {
  updatedevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(UpdateDevice)

export default connect(({ updatedevice }) => ({ updatedevice }))(WrappedAdd)
