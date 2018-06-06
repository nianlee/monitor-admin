import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input,Icon, Row, Col,Button,Select } from 'antd'
import styles from "./style.less"


const FormItem = Form.Item;
const Option = Select.Option;

const ModifyUser = ({ modifyuser, dispatch, form }) => {


  //console.log(adddevice.regionList);
  // 添加设备请求
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //const otherValues =
        values = {...values,id:11}

        console.log('modifyuser of form: ', values);
        dispatch({
          type: 'modifyuser/modify',
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
          <Col span={8}>

            <FormItem
              {...formItemLayout}
              label="用户名" // eslint-disable-line
            >
              {getFieldDecorator('userName', {
                rules: [
                  { required: false, message: '' }
                ],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="真实姓名" // eslint-disable-line
            >
              {getFieldDecorator('realName', {
                rules: [
                  { required: false, message: '' }
                ],
              })(
                <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="电话号码" // eslint-disable-line
            >
              {getFieldDecorator('phone', {
                rules: [
                  { required: false, message: '' }
                ],
              })(
                <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="电子邮件"
            >
              {getFieldDecorator('email', {
                rules: [{required: false, message: '' }],
              })(
                <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="工号"
            >
              {getFieldDecorator('jobNum', {
                rules: [{required: false, message: '' }],
              })(
                <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="区域" // eslint-disable-line
            >
              {getFieldDecorator('areaId', {
                rules: [
                  { required: false, message: '请选择区域!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择区域"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">江北区</Option>
                  <Option value="2">渝北区</Option>
                  <Option value="3">渝中区</Option>
                  <Option value="4">南岸区</Option>
                  <Option value="5">北碚区</Option>
                  <Option value="6">巴南区</Option>
                  <Option value="7">沙坪坝区</Option>
                  <Option value="8">九龙坡区</Option>
                  <Option value="9">大渡口区</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="角色" // eslint-disable-line
            >
              {getFieldDecorator('roleId', {
                rules: [
                  { required: false, message: '请选择角色!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择角色"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="1">角色1</Option>
                  <Option value="2">角色2</Option>
                  <Option value="3">角色3</Option>
                  <Option value="4">角色4</Option>
                  <Option value="5">角色5</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="账号状态" // eslint-disable-line
            >
              {getFieldDecorator('state', {
                rules: [
                  { required: false, message: '请选择账号状态!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择账号状态"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="0">停用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>确定</Button>
          <Button className={styles.cancelButton}>取消</Button>
        </FormItem>

      </Form>
    </div>
  )
}



ModifyUser.propTypes = {
  modifyuser: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(ModifyUser)


export default connect(({ modifyuser }) => ({ modifyuser }))(WrappedAdd) // eslint-disable-line
