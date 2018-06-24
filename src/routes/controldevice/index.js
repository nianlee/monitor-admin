import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Row, Col,Select,Button,Input,Modal } from 'antd'
import styles from "./style.less"
import { routerRedux } from 'dva/router'


const FormItem = Form.Item;
const Option = Select.Option;

const ControlDevice = ({ controldevice, dispatch, form }) => {

  console.log('controldevice: ', controldevice.messages);
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

  function handle () {
    dispatch(routerRedux.push('/devicemanage'))
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
                initialValue:controldevice.sn.sn,
              })(
                <Input disabled={true} />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第1路交流控制" // eslint-disable-line
            >
              {getFieldDecorator('ACCtrl1', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第2路交流控制" // eslint-disable-line
            >
              {getFieldDecorator('ACCtrl2', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第3路交流控制" // eslint-disable-line
            >
              {getFieldDecorator('ACCtrl3', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第1路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl1', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第2路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl2', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第3路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl3', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第4路直流控制" // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl4', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="第5路直流控制" // eslint-disable-line
          >
            {getFieldDecorator('DCCtrl5', {
              rules: [
                { required: false, message: '请选择状态 !' }
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
                <Option value="0">关</Option>
                <Option value="1">开</Option>
                <Option value="2">重启</Option>
              </Select>
            )}
          </FormItem>
        </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第6路直流控制 " // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl6', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第7路直流控制 " // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl7', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="第8路直流控制 " // eslint-disable-line
            >
              {getFieldDecorator('DCCtrl8', {
                rules: [
                  { required: false, message: '请选择状态 !' }
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
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button className={styles.cancelButton} onClick={handle}>取消</Button>
          <Button type="primary" htmlType="submit" className={styles.addButton}>确认</Button>
        </FormItem>
      </Form>

      <Modal
        title="消息"
        visible={controldevice.modalVisible}
        onOk={handle}
        onCancel={handle}
      >
        <p>{controldevice.messages}</p>

      </Modal>
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
