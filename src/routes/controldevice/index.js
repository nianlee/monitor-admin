import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Row, Col,Select,Button } from 'antd'
import styles from "./style.less"


const FormItem = Form.Item;
const Option = Select.Option;

const ControlDevice = ({ controldevice, dispatch, form }) => {

  // 添加设备请求
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //const otherValues =
        //values = [...values]
        console.log('Received values of form: ', values);
        dispatch({
          type: 'adddevice/add',
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


  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">

        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="风          扇1" // eslint-disable-line
            >
              {getFieldDecorator('type', {
                rules: [
                  { required: true, message: '请选择状态!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="风          扇2" // eslint-disable-line
            >
              {getFieldDecorator('type', {
                rules: [
                  { required: true, message: '请选择状态!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="3">开</Option>
                  <Option value="4">关</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第一路交流控制" // eslint-disable-line
            >
              {getFieldDecorator('type', {
                rules: [
                  { required: true, message: '请选择状态!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第二路交流控制"
            >
              {getFieldDecorator('install_addr', {
                rules: [{ type: 'array', required: true, message: '请选择状态' }],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第三路交流控制 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
                rules: [
                  { required: true, message: '请选择状态 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第四路交流控制 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
                rules: [
                  { required: true, message: '请选择状态 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第五路交流控制 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
                rules: [
                  { required: true, message: '请选择状态 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第六路交流控制 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
                rules: [
                  { required: true, message: '请选择状态 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第七路交流控制 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
                rules: [
                  { required: true, message: '请选择状态 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设第八路交流控制 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
                rules: [
                  { required: true, message: '请选择状态 !' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">开</Option>
                  <Option value="2">关</Option>
                  <Option value="3">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button className={styles.cancelButton}>取消</Button>
          <Button type="primary" htmlType="submit" className={styles.addButton}>确认</Button>
        </FormItem>
      </Form>
    </div>
  )
}



ControlDevice.propTypes = {
  controldevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(ControlDevice)

export default connect(({ controldevice }) => ({ controldevice }))(WrappedAdd)
