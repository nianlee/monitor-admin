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
        console.log('Received values of form: ', values);
        dispatch({
          type: 'controldevice/control',
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
              label="第一路交流控制" // eslint-disable-line
            >
              {getFieldDecorator('ACCtrl1', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第二路交流控制"
            >
              {getFieldDecorator('ACCtrl2', {
                rules: [{ required: true, message: '请选择状态' }],
              })(
                <Select
                  showSearch
                  placeholder="请选择状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第三路交流控制" // eslint-disable-line
            >
              {getFieldDecorator('ACCtrl3', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第一路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl1', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第二路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl2', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第三路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl3', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第四路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl4', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第五路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl5', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第六路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl6', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="第七路直流控制" // eslint-disable-line
          >
            {getFieldDecorator('DCCtrl7', {
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
                <Option value="0">开</Option>
                <Option value="1">关</Option>
                <Option value="2">重启</Option>
              </Select>
            )}
          </FormItem>
        </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第八路直流控制 " // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl8', {
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
                  <Option value="0">开</Option>
                  <Option value="1">关</Option>
                  <Option value="2">重启</Option>
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
