import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Row, Col, Select, Button } from "antd";
import AddressControl from "../adddevice/components/AddressControl";
import styles from "./style.less";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;
const Option = Select.Option;

const ModifyDevice = ({ modifydevice, dispatch, form }) => {
  console.log('id',modifydevice.id)
  const deviceTypeLists = modifydevice.deviceTypeList.map(type => (
    <Option key={type.name}>{type.value}</Option>
  ));

  // 添加设备请求
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { addressObj } = values;
        const payload = {
          ...values,
          detail_addr: addressObj.address,
          longitude: addressObj.langitude,
          latitude: addressObj.latitude,

          province: addressObj.province, //省
          city: addressObj.city, //市
          district: addressObj.district, //区
          township: addressObj.township, //街道，路，镇

          adcode: addressObj.adcode, //区code
          citycode: addressObj.citycode, // 市code
          towncode: addressObj.towncode, // 道，路，镇code

          id: modifydevice.id
        };

        console.log("Received values of form: ", payload);
        delete payload.addressObj;

        dispatch({
          type: "modifydevice/modify",
          payload: { deviceBasicJsonStr: JSON.stringify(payload) }
        });
      }
    });
  };

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem {...formItemLayout} label="设备类型">
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "请选择设备类型!" }]
              })(
                <Select
                  showSearch
                  placeholder="请选择设备类型"
                  optionLabelProp="children"
                  filterOption={(input, option) => {
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase());
                  }}
                >
                  {deviceTypeLists}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label="维护人员 ">
              {getFieldDecorator("maintainer", {
                rules: [{ required: true, message: "请选输入维护人员 !" }]
              })(
                <Select
                  showSearch
                  placeholder="请选择维护人员"
                  optionLabelProp="children"
                  filterOption={(input, option) => {
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase());
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

        <Row gutter={24}>
          <Col span={8}>
            <FormItem {...formItemLayout} label="详细地址">
              {getFieldDecorator("addressObj", {
                rules: [{ required: true, message: "请输入详细地址！" }]
              })(<AddressControl />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>
            确定
          </Button>
          <Button className={styles.cancelButton} onClick={onCancel}>
            取消
          </Button>
        </FormItem>
      </Form>
    </div>
  );

  function onCancel() {
    dispatch(routerRedux.push("/devicemanage"));
  }
};
ModifyDevice.propTypes = {
  modifydevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedAdd = Form.create()(ModifyDevice);

export default connect(({ modifydevice }) => ({ modifydevice }))(WrappedAdd);