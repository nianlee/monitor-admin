import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Input, Row, Col, Select, Button, Card, Cascader } from "antd";
import styles from "./style.less";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;
const Option = Select.Option;

const AddOrUpdateDevice = ({ addOrUpdateDevice, dispatch, form }) => {
  const deviceTypeLists = addOrUpdateDevice.deviceTypeList.map(type => (
    <Option key={type.name}>{type.value}</Option>
  ));

  // 添加设备请求
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { addressCasc } = values;
        const payload = {
          ...values,
          installAddr: addressCasc[addressCasc.length - 1]
        };

        console.log("Received values of form: ", payload);
        delete payload.addressCasc;

        dispatch({
          type: "addOrUpdateDevice/add",
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

  const areaLoadData = selectedOptions => {
    dispatch({
      type: "addOrUpdateDevice/queryAreaByParentCode",
      payload: selectedOptions
    });
  };

  return (
    <Card
      title={addOrUpdateDevice.type == "edit" ? "修改设备信息" : "新增设备"}
    >
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
                <Select placeholder="请选择设备类型">{deviceTypeLists}</Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="经度">
              {getFieldDecorator("longitude", {
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
            <FormItem {...formItemLayout} label="纬度">
              {getFieldDecorator("latitude", {
                rules: [
                  {
                    required: true,
                    message: "请输入设备地址纬度!"
                  }
                ]
              })(<Input placeholder="纬度" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="区域">
              {getFieldDecorator("addressCasc", {
                rules: [{ required: true, message: "请选择区域!" }]
              })(
                <Cascader
                  placeholder="请选择"
                  options={addOrUpdateDevice.regionList}
                  loadData={areaLoadData}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="详细地址">
              {getFieldDecorator("detail_addr", {
                rules: [{ required: true, message: "请输入详细地址!" }]
              })(<Input placeholder="详细地址" />)}
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
            {addOrUpdateDevice.type === "edit" ? "修改" : "添加"}
          </Button>
          <Button className={styles.cancelButton} onClick={onCancel}>
            取消
          </Button>
        </FormItem>
      </Form>
    </Card>
  );

  function onCancel() {
    dispatch(routerRedux.push("/devicemanage"));
  }
};

AddOrUpdateDevice.propTypes = {
  addOrUpdateDevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const formOptions = {
  onFieldsChange(props, changedFields) {
    console.log(changedFields);
    props.dispatch({
      type: "addOrUpdateDevice/updateFormParams",
      payload: { ...changedFields }
    });
  },
  mapPropsToFields(props) {
    const { formParams } = props.addOrUpdateDevice;

    return {
      sn: Form.createFormField({
        ...formParams.sn,
        value: formParams.sn.value
      }),
      type: Form.createFormField({
        ...formParams.type,
        value: formParams.type.value
      }),
      longitude: Form.createFormField({
        ...formParams.longitude,
        value: formParams.longitude.value
      }),
      latitude: Form.createFormField({
        ...formParams.latitude,
        value: formParams.latitude.value
      }),
      detail_addr: Form.createFormField({
        ...formParams.detail_addr,
        value: formParams.detail_addr.value
      }),
      code: Form.createFormField({
        ...formParams.code,
        value: formParams.code.value
      }),
      addressCasc: Form.createFormField({
        ...formParams.addressCasc,
        value: formParams.addressCasc.value
      })
    };
  }
};

const WrappedAdd = Form.create(formOptions)(AddOrUpdateDevice);

export default connect(({ addOrUpdateDevice }) => ({ addOrUpdateDevice }))(
  WrappedAdd
);
