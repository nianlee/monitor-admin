import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input,Icon, Row, Col,Select,Button } from 'antd'
import styles from "./style.less"


const FormItem = Form.Item;
const Option = Select.Option;

const ModifyUser = ({ modifyUser, dispatch, form }) => {


  //console.log(adddevice.regionList);
  const regionLists = modifyUser.regionList.map(region => <Option key={region.id}>region.name</Option>)
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


  const residences = [{ // eslint-disable-line
    value: '重庆市',
    label: '重庆市',
    children: [
      {
      value: '1',
      label: '江北区',
        /*
      children: [{
        value: '观音桥',
        label: '观音桥步行街',
      }],*/
    },
      {
        value: '2',
        label: '渝北区',
        /*
        children: [{
          value: '照母山',
          label: '光电园',
        }],*/
      },
      {
        value: '3',
        label: '北碚区',
        /*
        children: [{
          value: '蔡家岗镇',
          label: '金科城',
        }],*/
      },
    ],
  }];

  const uploadprops = { // eslint-disable-line
    name:'file',//发到后台的文件参数名
    action: '10.0.90.0',// 文件上传地址
    headers:{
      authorization:'authorization-text'
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
                <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="设备sn码" />
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
                <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="设备名称" />
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

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="安装区域"
            >
              {getFieldDecorator('install_addr', {
                rules: [{ type: 'array', required: true, message: '请选择安装区域' }],
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
              {getFieldDecorator('detail_addr', {
                rules: [
                  { required: true, message: '请输入详细地址！' }
                ],
              })(
                <Input prefix={<Icon type="address" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="详细地址" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="维护人员 " // eslint-disable-line
            >
              {getFieldDecorator('maintainer ', {
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



ModifyUser.propTypes = {
  modifyUser: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(ModifyUser)


export default connect(({ modifyUser }) => ({ modifyUser }))(WrappedAdd) // eslint-disable-line
