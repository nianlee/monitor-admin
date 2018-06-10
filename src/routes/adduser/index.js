import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input,Icon, Row, Col,Button,Select } from 'antd'
import { routerRedux } from 'dva/router'
import styles from "./style.less"
import ShowAddUserModal from "./components/ShowAddUserModal";


const FormItem = Form.Item;
const Option = Select.Option;

const AddUser = ({ adduser, dispatch, form }) => {


  const regionLists = adduser.regionList.map(region => <Option key={region.id}>{region.name}</Option>)
  const roleLists = adduser.roleList.map(role => <Option key={role.id}>{role.roleName}</Option>)

  const { modalVisible } =  adduser
  //modal 属性
  const modalProps ={ //eslint-disable-line
    visible:modalVisible,
    msg:adduser.modalMsg,
    maskClosable:false,
    title:'添加消息',
    wrapperClassName:"vertical-center-modal",
    width:720,
    onOk:handleModalClick,
    onCancel:handleModalClick
  }

  function handleModalClick() {

    console.log('handleModalClick')

    dispatch({
      type: 'adduser/updateHideModal',
    })
  }

  // 添加用户请求
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {

        console.log('adduser of form: ', values);
        dispatch({
          type: 'adduser/add',
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

  function onCancel() {
    dispatch(routerRedux.push('/usermanage'));
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
                  { required: true, message: '' }
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
                  { required: true, message: '' }
                ],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="用户密码" // eslint-disable-line
            >
              {getFieldDecorator('userPw', {
                rules: [
                  { required: true, message: '' }
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
                  { required: true, message: '' }
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
                rules: [{required: true, message: '' }],
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
                rules: [{required: true, message: '' }],
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
                  { required: true, message: '请选择区域!' }
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
                  {regionLists}
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
                  { required: true, message: '请选择角色!' }
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
                  {roleLists}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="用户类型" // eslint-disable-line
            >
              {getFieldDecorator('accType', {
                rules: [
                  { required: true, message: '请选择用户类型!' }
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择用户类型"
                  optionLabelProp="children"
                  filterOption={(input,option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase())
                  }}
                >
                  <Option value="0">管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>确定</Button>
          <Button className={styles.cancelButton} onClick={onCancel}>取消</Button>
        </FormItem>

      </Form>
      <ShowAddUserModal {...modalProps}/>
    </div>
  )
}



AddUser.propTypes = {
  adduser: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(AddUser)


export default connect(({ adduser }) => ({ adduser }))(WrappedAdd) // eslint-disable-line
