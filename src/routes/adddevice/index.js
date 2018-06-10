import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Row, Col, Select, Button } from 'antd'
import AddressControl from './components/AddressControl'
import styles from './style.less'

const FormItem = Form.Item;
const Option = Select.Option;

const AddDevice = ({ adddevice, dispatch, form }) => {

  const regionLists = adddevice.regionList.map(region => <Option key={region.id}>{region.name}</Option>)
  // 添加设备请求
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { addressObj } = values
        const payload = {
          ...values,
          detail_addr: addressObj.address,
          langitude: addressObj.langitude,
          latitude: addressObj.latitude,
          all_area_id: '1-2-3',
          hardware_version: 'V1.1.1',
          state: 0,
        }
        delete payload.addressObj

        dispatch({
          type: 'adddevice/add',
          payload: { deviceBasicJsonStr: JSON.stringify(payload) }
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


  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="sn码" // eslint-disable-line
            >
              {getFieldDecorator('sn', {
                rules: [
                  { required: true, message: '请输入设备an码!' }
                ],
              })(
                <Input placeholder="设备sn码" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="设备名称" // eslint-disable-line
            >
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请选择设备名称!' }
                ],
              })(
                <Input placeholder="设备名称" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="设备类型" // eslint-disable-line
            >
              {getFieldDecorator('type', {
                rules: [
                  { required: true, message: '请选择设备类型!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择设备类型"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">设备类型1</Option>
                  <Option value="2">设备类型2</Option>
                  <Option value="3">设备类型3</Option>
                  <Option value="4">设备类型4</Option>
                  <Option value="5">设备类型5</Option>
                  <Option value="6">设备类型6</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="安装区域"
            >
              {getFieldDecorator('install_addr', {
                rules: [{ required: true, message: '请选择安装区域' }],
              })(
                <Select
                  showSearch
                  placeholder="请选择安装区域"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  {regionLists}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="详细地址" // eslint-disable-line
            >
              {getFieldDecorator('addressObj', {
                rules: [
                  { required: true, message: '请输入详细地址！' }
                ],
              })(
                <AddressControl />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="维护人员 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer', {
                rules: [
                  { required: true, message: '请选输入维护人员 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择维护人员"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">张三</Option>
                  <Option value="2">李四</Option>
                  <Option value="3">王五</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>添加</Button>
          <Button className={styles.cancelButton}>取消</Button>
        </FormItem>

      </Form>
    </div>
  )
}

AddDevice.propTypes = {
  adddevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(AddDevice)


export default connect(({ adddevice }) => ({ adddevice }))(WrappedAdd)
