import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input,Icon, Row, Col,Select,Cascader} from 'antd'
import styles from "./style.less"


const FormItem = Form.Item;
const Option = Select.Option;

const AddDevice = ({ adddevice, dispatch, form }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'login/loginLoad',
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

  const residences = [{
    value: '重庆市',
    label: '重庆市',
    children: [
      {
      value: '江北区',
      label: '江北区',
      children: [{
        value: '观音桥',
        label: '观音桥步行街',
      }],
    },
      {
        value: '渝北区',
        label: '渝北区',
        children: [{
          value: '照母山',
          label: '光电园',
        }],
      },
      {
        value: '北碚区',
        label: '北碚区',
        children: [{
          value: '蔡家岗镇',
          label: '金科城',
        }],
      },
    ],
  }];

  return (
    <div>
      <div className={styles.formWrapper}>

        <Form onSubmit={handleSubmit} className="login-form">

          <Row gutter={24}>
            <Col span={8}>

              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator('sn码', {
                  rules: [
                    { required: true, message: '请输入设备an码!' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="设备sn码" />
                )}
              </FormItem>
            </Col>

            <Col span={8}>

              <FormItem
                {...formItemLayout}
                label="经纬度" // eslint-disable-line
              >
                {getFieldDecorator('经纬度', {
                  rules: [
                    { required: true, message: '请输入经纬度!' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="经纬度" />
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="设备名称" // eslint-disable-line
              >
                {getFieldDecorator('设备名称', {
                  rules: [
                    { required: true, message: '请选择设备名称!' }
                  ],
                })(
                  <Select>
                    <Option value="86">设备1</Option>
                    <Option value="87">设备2</Option>
                    <Option value="86">设备3</Option>
                    <Option value="87">设备4</Option>
                    <Option value="86">设备5</Option>
                    <Option value="87">设备6</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="设备类型" // eslint-disable-line
              >
                {getFieldDecorator('设备类型', {
                  rules: [
                    { required: true, message: '请选择设备类型!' }
                  ],
                })(
                  <Select>
                    <Option value="86">设备类型1</Option>
                    <Option value="87">设备类型2</Option>
                    <Option value="86">设备类型3</Option>
                    <Option value="87">设备类型4</Option>
                    <Option value="86">设备类型5</Option>
                    <Option value="87">设备类型6</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="安装地址"
              >
                {getFieldDecorator('安装地址', {
                  rules: [{ type: 'array', required: true, message: '请选择安装地址' }],
                })(
                  <Cascader options={residences} />
                )}
              </FormItem>
            </Col>

            <Col span={8}>

              <FormItem
                {...formItemLayout}
                label="详细地址" // eslint-disable-line
              >
                {getFieldDecorator('详细地址', {
                  rules: [
                    { required: true, message: '请输入详细地址！' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="详细地址" />
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="设备厂商" // eslint-disable-line
              >
                {getFieldDecorator('设备厂商', {
                  rules: [
                    { required: true, message: '请选输入设备厂商!' }
                  ],
                })(
                  <Select>
                    <Option value="86">设备类型1</Option>
                    <Option value="87">设备类型2</Option>
                    <Option value="86">设备类型3</Option>
                    <Option value="87">设备类型4</Option>
                    <Option value="86">设备类型5</Option>
                    <Option value="87">设备类型6</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="maintainer " // eslint-disable-line
              >
                {getFieldDecorator('maintainer ', {
                  rules: [
                    { required: true, message: '请选输入maintainer !' }
                  ],
                })(
                  <Select>
                    <Option value="86">maintainer1</Option>
                    <Option value="87">maintainer2</Option>
                    <Option value="86">maintainer3</Option>
                    <Option value="87">maintainer4</Option>
                    <Option value="86">maintainer5</Option>
                    <Option value="87">maintainer6</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="运营商 " // eslint-disable-line
              >
                {getFieldDecorator('运营商 ', {
                  rules: [
                    { required: true, message: '请选择运营商 !' }
                  ],
                })(
                  <Select>
                    <Option value="86">中国移动</Option>
                    <Option value="87">中国联通</Option>
                    <Option value="86">中国电信</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="芯片编码 " // eslint-disable-line
              >
                {getFieldDecorator('芯片编码 ', {
                  rules: [
                    { required: true, message: '请选择芯片编码 !' }
                  ],
                })(
                  <Select>
                    <Option value="86">code1</Option>
                    <Option value="87">code2</Option>
                    <Option value="86">code3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>

    </div>
  )
}



AddDevice.propTypes = {
  adddevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedLogin = Form.create()(AddDevice)


export default connect(({ adddevice }) => ({ adddevice }))(WrappedLogin)
