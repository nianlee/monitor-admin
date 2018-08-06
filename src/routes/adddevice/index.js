import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Input, Row, Col, Select, Button } from "antd";
//import AddressControl from "./components/AddressControl";
import styles from "./style.less";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;
const Option = Select.Option;

const AddDevice = ({ adddevice, dispatch, form }) => {
  const deviceTypeLists = adddevice.deviceTypeList.map(type => (
    <Option key={type.name}>{type.value}</Option>
  ));

  // 添加设备请求
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //const { addressObj } = values;
        const payload = {
          ...values,
          /*
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
          */

          all_area_id: "1-2-3",
          hardware_version: "V1.1.1",
          state: 0
        };

        console.log("Received values of form: ", payload);
        delete payload.addressObj;

        dispatch({
          type: "adddevice/add",
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
          <Col span={12}>
            <FormItem {...formItemLayout} label="sn码">
              {getFieldDecorator("sn", {
                rules: [
                  {
                    pattern: "([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}",
                    required: true,
                    message: "请输入设备正确的mac地址!"
                  }
                ]
              })(<Input placeholder="设备sn码" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="设备类型">
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "请选择设备类型!" }]
              })(
                <Select showSearch placeholder="请选择设备类型">
                  {deviceTypeLists}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="经度">
              {getFieldDecorator("sn", {
                rules: [
                  {
                    required: true,
                    message: "请输入设备地址经度"
                  }
                ]
              })(<Input placeholder="经度" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="维度">
              {getFieldDecorator("sn", {
                rules: [
                  {
                    required: true,
                    message: "请输入设备地址维度!"
                  }
                ]
              })(<Input placeholder="维度" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="设备编码">
              {getFieldDecorator("code", {
                rules: [{ required: true, message: "请输入设备编码" }]
              })(<Input placeholder="设备编码" />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>
            添加
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

AddDevice.propTypes = {
  adddevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedAdd = Form.create()(AddDevice);

export default connect(({ adddevice }) => ({ adddevice }))(WrappedAdd);
